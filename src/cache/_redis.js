/**
 * @description 连接 redis 的方法 get set
 * @author rq
 */

 const redis = require('redis');
 const { REDIS_CONF } = require('../config/db'); 

 // 创建客户端

 const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host);

 redisClient.on('error',err => {
     console.log('redis error',error);
 })

 /**
  * redis set
  * @param {string} key  key 
  * @param {string} val  val
  * @param {number} timeout 过期时间，单位 s
  */

 function set(key,val,timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key,val);
    redisClient.expire(key,timeout);
 }

 /**
  * redis get
  * @param {string} key 键
  */

 function get(key) { // io操作
    const promise = new Promise((resolve,reject) =>{
        redisClient.get(key,(err,val) => {
            if (err) {
                reject(err);
                return;
            }
            if (val == null) {
                resolve(null);
                return
            }

            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (error) {
                resolve(val);
            }
        });
    })
    return promise;
 }

 module.exports = {
     set,
     get
 }