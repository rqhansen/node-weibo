/**
 * @description user controller
 * @author rq
 */

 const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user');
 const  { ErrorModel, SuccessModel } = require('../model/ResModel');
 const { 
        registerUserNameNotExistInfo,
        registerUserNameExistInfo,
        registerFailInfo,
        loginFailInfo,
        deleteUserFailInfo,
        changeInfoFailInfo,
        changePasswordFailInfo
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
        // console.log(error.message,error.stack);
        return new ErrorModel(registerFailInfo)
    }
 }

 /**
  * 
  * @param {Objex} ctx koa2 ctx 
  * @param {string} userName 用户名
  * @param {string} password 密码
  */
 async function login(ctx, userName,password) {
    // 登录成功 ctx.session.userInfo = xxx;

    const userInfo = await getUserInfo(userName,doCrypto(password));
    if(!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo);
    }

    // 登录成功
    if(ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo;
    }
    return new SuccessModel();
 }

 /**
  * 删除当前用户
  * @param {string} userName 用户名
  */

  async function deleteCurUser(userName) {
      const result = await deleteUser(userName);
      if(result) {
        return new SuccessModel()
      }
      return new ErrorModel(deleteUserFailInfo);
  }

  /**
   * 更新用户信息
   * @param {Object} ctx ctx 
   * @param {string} nickName 昵称 
   * @param {string} city 城市
   * @param {string} picture 头像 
   */
  async function changeInfo(ctx,{ city, nickName, picture}) {
    const { userName } = ctx.session.userInfo;
    if (!nickName) {
        nickName = userName;
    }
    // service
    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture,
            newPassword: ''
        },
        { userName }
    )
    if (result) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        return new SuccessModel();
    }
    return new ErrorModel(changeInfoFailInfo);
}

/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {密码} password 密码 
 * @param {新密码} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
    const result = await updateUser(
        { newPassword: doCrypto(newPassword) },
        { 
            userName, 
            password:doCrypto(password)
        }
    )
    if (result) {
        return new SuccessModel();
    }
    return new ErrorModel(changePasswordFailInfo);
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout (ctx) {
    delete ctx.session.userInfo;
    return new SuccessModel();
}

 module.exports = {
     isExist,
     register,
     login,
     deleteCurUser,
     changeInfo,
     changePassword,
     logout
 }