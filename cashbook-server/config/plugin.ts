import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // 鉴权插件
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  // 跨域插件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

export default plugin;
