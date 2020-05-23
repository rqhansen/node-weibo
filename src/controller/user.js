/**
 * @description user controller
 * @author rq
 */

 const { getUserInfo, createUser } = require('../services/user');
 const  { ErrorModel, SuccessModel } = require('../model/ResModel');
 const { 
        registerUserNameNotExistInfo,
        registerUserNameExistInfo,
        registerFailInfo 
    } = require('../model/ErrorInfo');
const { doCrypto } = require('../utils/cryp');
 /**
  * 用户名是否存在
  * @param {string} userName 用户名 
  */
 async function isExist(userName) {
    // 调用services层获取数据
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        return new SuccessModel(userInfo);
    } 
    // else {
        return new ErrorModel(registerUserNameNotExistInfo);
    // }
 } 

 /**
  * 
  * @param {string} userName 用户名
  * @param {string} password 密码
  * @param {string} gender 性别 1 男，2 女，3 保密
  */

 async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName,password);
    if (userInfo) {
        // 用户名已存在
        return ErrorModel(registerUserNameExistInfo);
    } 
    
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel();
    } catch (error) {
        console.log(error.message,error.stack);
        return new ErrorModel(registerFailInfo)
    }
 }

 module.exports = {
     isExist,
     register
 }