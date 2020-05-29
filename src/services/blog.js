/**
 * @description 微博 server
 * @author rq
 */

 const { Blog, User } = require('../db/model/index');
 const { formatUser,formatBlog } = require('./_format');

  /**
  * 创建微博
  * @param {Object} param0  创建微博所需的数据
  */

 async function createBlog({ userId, content, image}) {
    const result  = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
 }

 /**
  * 
  * @param {Object} param0 查询参数 
  */

 async function getBlogListByUser({
     userName, pageIndex = 0, pageSize = 10
 }) {
    // 拼接查询条件
    const userWhereOpts = {};
    if (userName) {
        userWhereOpts.userName = userName
    }

    // 执行连表查询
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [ // 先显示最先发布的
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    // result.count 是总数，跟分页无关
    // result.rows 是查询结果，数组
    let blogList = result.rows.map(row => row.dataValues);
    blogList = formatBlog(blogList);
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user);
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
 }

 module.exports = {
     createBlog,
     getBlogListByUser
 }