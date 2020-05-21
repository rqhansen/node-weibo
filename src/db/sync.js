/**
 * @description sequelize 同步数据库
 * @author rq
 */

const seq = require('./seq');
require('./model/index');

// 测试链接

seq.authenticate().then(() => {
    console.log('auth ok');
}).catch(() =>{
    console.log('auth error');
})

// 执行同步

// force： true表示会覆盖存在的表
seq.sync({force: true}).then(() =>{
    console.log('sync ok');
    process.exit();
});
