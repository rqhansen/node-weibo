/**
 * @description 用户关系的controller
 * @author rq
 */


const { getUsersByFollower, addFollower, deleteFollower, getFollowersByUser } = require('../services/user-relation');
const { SuccessModel,ErrorModel } = require('../model/ResModel');
const { deleteFollowerFailInfo } = require('../model/ErrorInfo');

 /**
  * 根据userId获取粉丝列表
  * @param {number} userId 用户id
  */
 async function getFans(userId) {
    const { count, userList} = await getUsersByFollower(userId)

    // 返回
    return new SuccessModel({
        count,
        fansList: userList
    })
}

/**
 * 获取关注人列表
 * @param {number} userId userId
 */
async function getFollowers(userId) {
    const { count, userList } = await getFollowersByUser(userId)
    return new SuccessModel({
        count,followersList: userList
    })
}

/**
 * 
 * @param {number} myUserId 当前登录用户的id
 * @param {number} curUserId 要被关注的用户id
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (error) {
        console.log(error);
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 
 * @param {number} myUserId 当前登录用户的id
 * @param {number} curUserId 要被关注的用户id
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}