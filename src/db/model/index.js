/**
 * @description 数据模型入口文件
 * @author rq
 */

 const User = require('./user');
 const Blog = require('./blog');

 // 创外键 (查出微博带出用户)
 Blog.belongsTo(User, {
    foreignKey: 'userId',
 })

 // 查询用户带出微博
//  User.hasMany(Blog)
 module.exports = {
     User,
     Blog
 }