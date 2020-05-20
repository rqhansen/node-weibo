/**
 * @description 环境变量
 * @author rq
 */

 const ENV = process.env.NODE_ENV; // 获取package.json中script的配置

 module.exports = {
     isDev: ENV === 'dev',
     notDev: ENV !== 'dev',
     isProd: ENV === 'production',
     notProd: ENV === 'production'
 }
