/**
 * @description 首页controller
 * @author rq
 */

 const { createBlog } = require('../services/blog');
 const { SuccessModel, ErrorModel } = require('../model/ResModel');
 const { createBlogFailInfo } = require('../model/ErrorInfo')
 /**
  * 创建微博
  * @param {Object} param0  创建微博所需的数据
  */
 async function create({userId, content, image}) {
    try {
        // 创建微博 
        const blog = await createBlog({
            userId,
            content,
            image
        })
        return new SuccessModel(blog)
    } catch (error) {
        console.log(error.message, error.stack);
        return new ErrorModel(createBlogFailInfo);
    }
 }

 module.exports = {
     create
 }