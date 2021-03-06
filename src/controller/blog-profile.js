/**
 * @description 个人主页controller
 * @author rq
 */

 const { getBlogListByUser }  = require('../services/blog');
 const { PAGE_SIZE } = require('../config/constant');
 const { SuccessModel } = require('../model/ResModel');

/**
 * 
 * @param {string} useName 用户名
 * @param {number} pageIndex 当前页面
 */
 async function getProfileBlogList(userName, pageIndex = 0) {
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const blogList = result.blogList

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
 }

 module.exports = {
    getProfileBlogList
 }