/**
 * @description 首页controller
 * @author rq
 */

 const xss = require('xss');
 const { createBlog, getFollowersBlogList } = require('../services/blog');
 const { SuccessModel, ErrorModel } = require('../model/ResModel');
 const { createBlogFailInfo } = require('../model/ErrorInfo')
 const { PAGE_SIZE } = require('../config/constant');
 /**
  * 创建微博
  * @param {Object} param0  创建微博所需的数据
  */
 async function create({userId, content, image}) {
    try {
        // 创建微博 
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })
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