/**
 * @description 存储配置
 * @author rq
 */

 const { isProd } = require('../utils/env');

 let REDIS_CONFIG = {
     port: 6379,
     host: '127.0.0.1'
 }

 // 判断线上线下环境 
//  if() {


//  }

 module.exports = {
     REDIS_CONFIG
 }