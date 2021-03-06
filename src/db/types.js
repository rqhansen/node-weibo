/**
 * @description 封装sequelize 数据类型
 * @autor rq
 */


 const Sequelize = require('sequelize');

 module.exports = {
     STRING: Sequelize.STRING,
     DECIMAL: Sequelize.DECIMAL,
     TEXT: Sequelize.TEXT,
     INTEGER: Sequelize.INTEGER,
     BOOLEAN: Sequelize.BOOLEAN
 }

