module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const db = require("../../database/db.config"); //引入数据库封装模块

  router.get("/", async (req, res) => {
    const sql = `select * from informations where is_delete = 0 ORDER BY id desc limit 1`;
    await db.query(sql, (err, data) => {
      if (err) {
        res.send({
          message: "数据库查询错误"
        });
      } else {
        res.send(data[0]);
      }
    });
  });

  app.use("/web/api/informations", router);
};