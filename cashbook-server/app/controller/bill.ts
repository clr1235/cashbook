import dayjs from 'dayjs';
import { Controller } from 'egg';

export default class BillController extends Controller {
  // 新增账单使用post方法，其请求参数放置在请求体中
  public async add() {
    const { ctx, app } = this;
    // 获取请求体的数据
    const { amount, type_id, type_name, pay_type, remark, date } = ctx.request.body;
    // 校验参数
    if (!amount || !type_id || !type_name || !pay_type || !remark || !date) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
    }

    try {
      // 获取token
      const token = ctx.request.header.authorization as string;
      // 从token中解析用户信息
      const decode = await app.jwt.verify(token, app.config.jwt.secret) as any;
      if (!decode) {
        return;
      }
      const user_id = decode.id;
      await ctx.service.bill.add({
        amount,
        type_id,
        type_name,
        date,
        pay_type,
        remark,
        user_id,
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null,
      };

    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }

  }

  // 获取账单列表 使用post方法
  public async list() {
    const { ctx, app } = this;
    const { date, page = 1, page_size = 5, type_id = 0 } = ctx.request.body;
    try {
      const token = ctx.request.header.authorization as string;
      const decode = await app.jwt.verify(token, app.config.jwt.secret) as any;
      if (!decode) {
        return;
      }
      const user_id = decode.id;
      // 从数据库拿到当前用户的账单列表, 使用数据库进行分页
      const params = {
        user_id,
        page,
        page_size,
        date,
        type_id,
      };
      const { list, total } = await ctx.service.bill.list(params) as any;
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          list: list.map(item => {
            return {
              ...item,
              date: dayjs(item.date).format('YYYY-MM-DD HH:mm:ss'),
            };
          }),
          total,
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }
}
