module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true //合并参数
  });
  const db = require("../../database/db.config"); //引入数据库封装模块

  router.get("/", async (req, res) => {
    const sql = "select * from articles where is_delete = 0 ORDER BY id desc";
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: "数据库查询错误"
        });
      } else {
        return res.send(data);
      }
    });
  });

  router.get("/:id", async (req, res) => {
    const sql = `
    UPDATE articles SET clicks=(SELECT clicks FROM (SELECT * FROM articles WHERE id = ${req.params.id}) a1)+1 WHERE id = '${req.params.id}';
    select * from articles where id='${req.params.id};
    '`;
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: "数据库查询错误"
        });
      } else {
        return res.send(data[1][0]);
      }
    });
  });

  router.get("/get/page", async (req, res) => {
    const {
      pageSize,
      currentPage
    } = req.query;
    const start = (Number(currentPage) - 1) * Number(pageSize);
    const end = Number(pageSize);
    const sql = `select * from articles WHERE is_delete = 0 ORDER BY id desc limit ${start},${end} `;
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: "数据库查询错误"
        });
      } else {
        return res.send(data);
      }
    });
  });

  router.get('/get/pre', async (req, res) => {
    const {
      id
    } = req.query;
    const sql = `SELECT id,title FROM articles WHERE  is_delete = 0 AND id>${id} ORDER BY id LIMIT 1 ;`
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: "数据库查询错误"
        });
      } else {
        return res.send(data[0]);
      }
    });
  })

  router.get('/get/next', async (req, res) => {
    const {
      id
    } = req.query;
    const sql = `SELECT id,title FROM articles WHERE  is_delete = 0 AND id<${id} ORDER BY id DESC LIMIT 1 ;`
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: "数据库查询错误"
        });
      } else {
        return res.send(data[0]);
      }
    });
  })


  app.use("/web/api/articles", router);
};