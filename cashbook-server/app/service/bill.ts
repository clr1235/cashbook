import { Service } from 'egg';
import dayjs from 'dayjs';
import uuid from 'uuid';
export default class Bill extends Service {
  // 新建账单
  public async add(params) {
    const { app } = this;
    try {
      // 往数据库的bill表中插入一条账单数据
      const result = await app.mysql.insert('bill', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 获取指定的user_id下的账单列表
  public async list(params) {
    const { app } = this;
    try {
      const res = await app.mysql.select('bill', { // 搜索bill表
        where: { user_id: params.user_id, is_delete: 0 }, // where条件
        columns: [ 'id' ], // 要查询的表字段
      });
      const result1 = JSON.parse(JSON.stringify(res));
      // const result = await app.mysql.select('bill', { // 搜索bill表
      //   where: { user_id: params.user_id, is_delete: 0 }, // where条件
      //   columns: [ 'id', 'pay_type', 'amount', 'date', 'type_id', 'type_name', 'remark' ], // 要查询的表字段
      //   orders: [[ 'date', 'desc' ]], // 排序方式
      //   limit: +params.page_size, // 返回数据量
      //   offset: params.page - 1, // 数据偏移量
      // });
      console.log(params, 'params-=-=-AAAAA');
      let sql = `select * from bill where user_id = ${params.user_id} and is_delete = 0`;
      if (params.date) {
        const start = dayjs(params.date).format('YYYY-MM-DD');
        const end = dayjs(params.date).add(1, 'month').format('YYYY-MM-DD');
        console.log(start, '--=->>>', end);
        sql += ` and date>='${start}' and date<'${end}'`;
      }
      const result = await app.mysql.query(`${sql} ORDER BY date DESC limit ${+params.page_size} offset ${params.page - 1};`);
      // 处理成前端需要的数据结构
      const detail = {};
      result.forEach((item: any) => {
        const dateTmp = dayjs(item.date).format('YYYY-MM-DD HH:mm:ss');
        const date = dateTmp?.split(' ')[0];
        const obj = {
          id: item.id,
          amount: item.amount,
          date,
          time: dateTmp?.split(' ')[1],
          pay_type: item.pay_type,
          remark: item.remark,
          type_id: item.type_id,
          type_name: item.type_name,
        };
        if (!detail[date]) {
          detail[date] = {
            id: uuid(),
            income: 0,
            pay: 0,
            date,
            children: [],
          };
        }
        detail[date].children.push(obj);
        detail[date].income = detail[date].children.reduce((prev, cur) => {
          if (cur.pay_type === 1) {
            // eslint-disable-next-line no-return-assign
            return prev += cur.amount;
          }
          return prev;
        }, 0);
        detail[date].pay = detail[date].children.reduce((prev, cur) => {
          if (cur.pay_type === 2) {
            // eslint-disable-next-line no-return-assign
            return prev += cur.amount;
          }
          return prev;
        }, 0);
      });
      return {
        total: result1.length,
        list: Object.values(detail) as any,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 获取指定user_id下的账单详情
  public async detail(id, user_id) {
    const { app } = this;
    try {
      const res = await app.mysql.get('bill', { id, user_id });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 编辑账单
  public async update(params) {
    const { app } = this;
    try {
      const res = await app.mysql.update('bill', params);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 删除账单
  public async delete(params) {
    const { app } = this;
    try {
      const res = await app.mysql.update('bill', {
        is_delete: 1,
      }, {
        where: {
          id: params.id,
          user_id: params.user_id,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
