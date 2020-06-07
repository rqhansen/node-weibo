/**
 * @description 微博 @用户的关系 数据模型
 * @author
 */

const seq = require('../seq');
const { INTEGER, BOOLEAN } = require('../types');

const AtRelation = seq.define('atRelation', {
    userId: { // 被 @ 人的id
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否已读'
    }
})

module.exports = AtRelation