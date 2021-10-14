import { Service } from 'egg';

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
      const result = await app.mysql.select('bill', { // 搜索bill表
        where: { user_id: params.user_id, is_delete: 0 }, // where条件
        columns: [ 'id', 'pay_type', 'amount', 'date', 'type_id', 'type_name', 'remark' ], // 要查询的表字段
        orders: [[ 'date', 'desc' ]], // 排序方式
        limit: +params.page_size, // 返回数据量
        offset: params.page - 1, // 数据偏移量
      });
      return {
        total: result1.length,
        list: result,
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
