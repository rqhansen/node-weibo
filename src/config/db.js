/**
 * @description 存储配置
 * @author rq
 */

 const { isProd } = require('../utils/env');

 let REDIS_CONF = {
     port: 6379,
     host: '127.0.0.1'
 }

 let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'node-weibo_db'
 }

 // 判断线上线下环境 
 if(isProd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }

    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'node-weibo_db'
    }
 }

 module.exports = {
     REDIS_CONF,
     MYSQL_CONF
 }