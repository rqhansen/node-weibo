/**
 * @description 用户数据模型
 * @author rq
 */

 const seq = require('../seq');
 const  { STRING, DECIMAL} = require('../types');

 const User = seq.define('user', {
     // 其中id 会被自动创建，且表名会变为 users
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        comment: '性别[1 男,2 女性,3 保密]'
    },
    picture: {
        type: STRING,
        comment: '头像，存图片地址'
    },
    city: {
        type: STRING,
        comment: '城市'
    }
 })

 module.exports = User;