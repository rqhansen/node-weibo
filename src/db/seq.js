const Sequelize = require('sequelize');

// new Sequelize(数据库名,mysql用户名，mysql密码);
const seq = new Sequelize('node-weibo_db','root','root',{
    host: 'localhost',
    dialect: 'mysql'
});

// 测试链接

// seq.authenticate().then(() => {
//     console.log('ok');
// }).catch(() =>{
//     console.log('error');
// })

module.exports = seq;