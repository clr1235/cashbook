import { Controller } from 'egg';

export default class UserController extends Controller {
  // 注册
  public async register() {
    const { ctx } = this;
    // 获取注册需要的参数
    const { username, password } = ctx.request.body;
    // 判断数据库是否已经有该账号
    const userInfo = await ctx.service.user.getUserByName(username);

    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空',
        data: null,
      };
      return;
    }
    // 账号已存在
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '用户名已被注册，请重新输入',
        data: null,
      };
      return;
    }

    // 注册账号
    const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';
    const res = await ctx.service.user.register({
      username,
      password,
      signature: 'peace && love',
      avatar: defaultAvatar,
      is_delete: 0,
    });
    if (res) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
      };
    }
  }
  // 登录
  public async login() {
    const { ctx, app } = this;
    // 获取注册需要的参数
    const { username, password } = ctx.request.body;
    // 判断数据库是否已经有该账号
    const userInfo = await ctx.service.user.getUserByName(username);

    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null,
      };
      return;
    }
    if (userInfo && password !== userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '账号密码错误',
        data: null,
      };
      return;
    }
    // 生成token
    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);

    ctx.body = {
      code: 200,
      msg: '登录成功',
      data: {
        token,
      },
    };
  }
  // test
  public async test() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization as string;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: {
        ...decode as any,
      },
    };
  }
  // 获取用户信息
  public async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization as string;
    // 解析出token中包含的信息
    const decode = await app.jwt.verify(token, app.config.jwt.secret) as any;
    // 根据username去数据库取数据
    const userInfo = await ctx.service.user.getUserByName(decode.username);
    // 将从数据库拿到的信息处理之后返回
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar,
      },
    };

  }
  // 修改用户信息
  public async editUserInfo() {
    const { ctx, app } = this;
    const { signature = '' } = ctx.request.body;
    try {
      const token = ctx.request.header.authorization as string;
      // 解析出token中包含的信息
      const decode = await app.jwt.verify(token, app.config.jwt.secret) as any;
      const userInfo = await ctx.service.user.getUserByName(decode.username);
      await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          ...userInfo,
          signature,
        },
      };
    } catch (error) {
      console.log(error, '修改用户信息抛错');
    }

  }
}
