/**
 * @description sequelize 实例
 * @author rq
 */

const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../config/db');
const { isProd, isTest } = require('../utils/env');

const { host, user, password, database } = MYSQL_CONF;
const conf = {
    host,
    dialect: 'mysql'
}

if(isProd) {
    conf.pool = {
        max: 5,
        min: 0,
        idle: 10000 
    }
}

if (isTest) { // 测试不打印
    conf.logging = () => {}
}

// new Sequelize(数据库名,mysql用户名，mysql密码);
const seq = new Sequelize(database,user,password,conf);

// 测试链接

// seq.authenticate().then(() => {
//     console.log('ok');
// }).catch(() =>{
//     console.log('error');
// })

module.exports = seq;