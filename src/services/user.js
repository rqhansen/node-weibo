/**
 * @description user services
 * @author rq
 */

 const { User } = require('../db/model/index');
 const { formatUser } = require('./_format');

 /**
  * 
  * @param {string} userName 用户名
  * @param {string} password 密码
  */
 async function getUserInfo(userName, password) {
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password });
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id','userName','nickName','picture','city'],
        where: whereOpt
    })

    if (result == null) {
        // 未找到
        return result;
    }

    // 格式化处理
    const formatRes = formatUser(result.dataValues);
    return formatRes;
 }

 /**
  * 创建用户
  * @param {string} userName  用户名
  * @param {string} password  密码
  * @param {string} gender 性别
  * @param {string} nickName 昵称
  */

 async function createUser({userName, password, gender = 3, nickName}) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName || userName,
        gender
    });
    return result.dataValues;
 }

 /**
  * 
  * @param {string} userName 用户名
  */
 async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    return result > 0;
 }

 /**
  * 更细用户信息
  * @param {Object} param0 要修改的内容 
  * @param {Object} param1 查询条件
  */
 async function updateUser(
     { newPassword, newNickName, newPicture,newCity },
     { userName, password }
 ) {
    // 拼接修改内容
    const updateData = {};
    if (newPassword) {
        updateData.password = newPassword;
    }
    if (newNickName) {
        updateData.nickName = newNickName;
    }
    if (newPicture) {
        updateData.picture = newPicture;
    }
    if (newCity) {
        updateData.city = newCity;
    }

    const whereData = {
        userName
    }

    if (password) {
        whereData.password = password;
    }

    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    });
    return result[0] > 0;
 }

 module.exports = {
     getUserInfo,
     createUser,
     deleteUser,
     updateUser
 }