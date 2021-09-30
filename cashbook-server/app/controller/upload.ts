import dayjs from 'dayjs';
const fs = require('fs');
const path = require('path');
import { Controller } from 'egg';

export default class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    let uploadDir = '' as string;
    // ctx.request.files[0] 表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
    const file = ctx.request.files[0];
    try {
      const f = fs.readFileSync(file.filepath);
      // 获取当前时间
      const now = dayjs(new Date()).format('YYYYMMDD') as string;
      // 创建图片保存路径
      const dir = path.join(this.config.uploadDir, now);
      const date = Date.now();
      await fs.mkdir(dir, { recursive: true }, error => {
        console.log(error, '上传目录报错');
      });
      // 返回图片保存的路径
      uploadDir = path.join(dir, date + path.extname(file.filename));
      // 写入文件夹
      fs.writeFileSync(uploadDir, f);
    } finally {
      // 清除临时文件
      ctx.cleanupRequestFiles();
    }
    ctx.body = {
      code: 200,
      msg: '上传成功',
      data: uploadDir.replace(/app/g, ''),
    };
  }
}
