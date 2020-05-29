/**
 * @description 微博数据相关的工具方法
 * @author rq
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取blog.list.ejs 的文件内容
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 
 * @param {Array} bloglist 微博列表
 * @param {boolean} canReply 是否能回复
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL,{
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}