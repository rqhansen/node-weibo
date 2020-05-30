/**
 * @description 数据模型入口文件
 * @author rq
 */

const User = require('./user');
const Blog = require('./blog');
const UserRelation = require('./userRelation');

 // 创外键 (查出微博带出用户)
 Blog.belongsTo(User, {
    foreignKey: 'userId',
 })

 // 一个用户关系有一个User，通过follwerId查询到
 UserRelation.belongsTo(User, {
     foreignKey: 'followerId'
 })

 // 一个用户有许多用户关系
 User.hasMany(UserRelation, {
     foreignKey: 'userId' // userId 是UserRelation表中的
 })

 Blog.belongsTo(UserRelation, { // 没建成，不影响
     foreignKey: 'userId',
     targetKey: 'followerId' // UserRelation表中的followerId(非主键使用targerKey)，
 })

 // 查询用户带出微博
//  User.hasMany(Blog)
 module.exports = {
     User,
     Blog,
     UserRelation
 }