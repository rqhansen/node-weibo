/**
 * @description 数据格式化
 * @author rq
 */

 const { DEFAULT_PICTURE } = require('../config/constant');

 /**
  * 
  * @param {Object} obj 用户对象 
  */
 function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = 'DEFAULT_PICTURE';
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

 module.exports = {
     formatUser
 }