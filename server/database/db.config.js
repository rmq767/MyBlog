const mysql = require("mysql");

const conection = mysql.createConnection({ //创键数据库连接
  host: "localhost",
  user: "root",
  port: 3306,
  password: "19980327",
  database: "myblog",
  multipleStatements: true,
  dateStrings : true //解决时间格式
});
conection.connect(); //检测连接

module.exports = conection