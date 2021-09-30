import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  // 抛出接口，给前端调用
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/getUserInfo', _jwt, controller.user.getUserInfo);
  router.get('/api/user/editUserInfo', _jwt, controller.user.editUserInfo);
  // 上传接口
  router.post('/api/upload', controller.upload.upload);
  // 账单相关接口
  router.post('/api/bill/add', _jwt, controller.bill.add);
  router.post('/api/bill/list', _jwt, controller.bill.list);
  // 测试接口
  router.get('/api/user/test', _jwt, controller.user.test);
};
