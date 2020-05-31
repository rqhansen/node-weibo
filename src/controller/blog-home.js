/**
 * @description 首页controller
 * @author rq
 */

 const xss = require('xss');
 const { createBlog, getFollowersBlogList } = require('../services/blog');
 const { SuccessModel, ErrorModel } = require('../model/ResModel');
 const { createBlogFailInfo } = require('../model/ErrorInfo')
 const { PAGE_SIZE,REG_FOR_AT_WHO } = require('../config/constant');
 const { getUserInfo } = require('../services/user');
 const { createAtRelation } = require('../services/at-relation');
 
 /**
  * 创建微博
  * @param {Object} param0  创建微博所需的数据
  */
 async function create({userId, content, image}) {

    // 收集并分析 content 中的@用户
    // content 格式如 '@李四 - lisi 你好'
    const atUserNameList = [];
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            // 目的不是replace，而是获取 userName
            atUserNameList.push(userName);
            return matchStr // 替换不生效
        }
    )

    // 根据@用户名查询用户信息
    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )

    // 根据用户信息获取用户id
    const atUserIdList = atUserList.map(user => user.id)

    try {
        // 创建微博 
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })
        
        // 创建 @关系
        // blog.id
        await Promise.all(atUserIdList.map(
            userId => createAtRelation(blog.id, userId)
        ))

        return new SuccessModel(blog)
    } catch (error) {
        console.log(error.message, error.stack);
        return new ErrorModel(createBlogFailInfo);
    }
 }

 /**
  * 
  * @param {number} userId 
  * @param {number} pageIndex 
  */
 async function getHomeBlogList({userId, pageIndex = 0}) {
    // server
    const result = await getFollowersBlogList({userId, pageIndex,pageSize: PAGE_SIZE })
    const { count, blogList } = result
    console.log(result);
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
 }

 module.exports = {
     create,
     getHomeBlogList,
     getFollowersBlogList
 }