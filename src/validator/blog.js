/**
 * @description user 数据格式校验
 * @author rq
 */

const validate = require('./_validate');

const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {    
            type: 'string',
            maxLength: 255
        }
    }
}

/**
* 校验微博数据格式
* @param {Object} data 用户数据 
*/

function blogValidate(data = {}) {
   return validate(SCHEMA,data);
}

module.exports = blogValidate;
