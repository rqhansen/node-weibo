/**
 * @description user controller
 * @author rq
 */

 const { getUserInfo } = require('../services/user');
 const  { ErrorModel, SuccessModel } = require('../model/ResModel');
 const { registerUserNameNotExistInfo } = require('../model/ErrorInfo');

 /**
  * 用户名是否存在
  * @param {string} userName 用户名 
  */
 async function isExist(userName) {
    // 调用services层获取数据
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        return new SuccessModel(userInfo);
    } else {
        return new ErrorModel(registerUserNameNotExistInfo);
    }
 } 

 module.exports = {
     isExist
 }