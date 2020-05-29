/**
 * @description 数据格式化
 * @author rq
 */

 const { DEFAULT_PICTURE } = require('../config/constant');
const { timeFormat } = require('../utils/dt');
 /**
  * 
  * @param {Object} obj 用户对象 
  */
 function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE;
    }
    return obj;
 }

 /**
  * 
  * @param {Array|Object} list 用户列表或者单个用户对象
  */

 function formatUser(list) {
    if (list == null) {
        return list;
    }

    if (list instanceof Array){
        // 数组用户列表
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(list);
 }

 /**
  * 格式化数据的时间
  * @param {Object} obj 数据 
  */
 function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updateedAtFormat = timeFormat(obj.updatedAt)
    return obj
 }

 /**
  * 格式化微博信息
  * @param {Array|Object} list 微博列表或者单个微博对象 
  */
function formatBlog(list) {
    if(list == null) {
        return list
    }

    if(list instanceof Array) {
        return list.map(_formatDBTime)
    }
    return _formatDBTime(list)
}

 module.exports = {
     formatUser,
     formatBlog
 }