/**
 * @description 微博缓存层
 * @author rq
 */

const { set, get } = require('./_redis');
const { getBlogListByUser } = require('../services/blog');

// redis key 前缀
const KEY_PREFIX = 'weibo:square:';

/**
 * 获取广场缓存
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;
    // 获取缓存
    const cahceResult = await get(key);
    if (cahceResult != null) {
        // 获取缓存成功
        return cahceResult
    }
    // 没有缓存，则读取数据库
    const result = await getBlogListByUser({
        pageIndex,
        pageSize
    })
    // 设置缓存，过期时间1分钟
    set(key, result, 60)
    return result

}

module.exports = {
    getSquareCacheList
}