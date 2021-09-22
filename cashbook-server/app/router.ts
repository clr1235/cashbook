import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // 抛出接口，给前端调用
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
};
