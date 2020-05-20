/**
 * @description sequelize 同步数据库
 */

const seq = require('./seq');
// require('./model');

// 测试链接

seq.authenticate().then(() => {
    console.log('force ok');
}).catch(() =>{
    console.log('force error');
})

// 执行同步

// force： true表示会覆盖存在的表
seq.sync({force: true}).then(() =>{
    console.log('sync ok');
    process.exit();
});