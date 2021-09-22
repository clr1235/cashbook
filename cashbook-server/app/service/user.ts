import { Service } from 'egg';

/**
 * user Service
 */
export default class User extends Service {

  /**
   * 根据username获取用户信息
   * @param username
   */
  public async getUserByName(username: string) {
    const { app } = this;
    try {
      const res = await app.mysql.get('user', { username });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  /**
   * 注册
   * @param params
   */
  public async register(params) {
    const { app } = this;
    try {
      const res = await app.mysql.insert('user', params);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}
