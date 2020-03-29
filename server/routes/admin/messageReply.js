module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const db = require("../../database/db.config"); //引入数据库封装模块

  router.get("/", async (req, res) => {
    const sql = `select messagereply.id,i_name,r_name,m_reply,messagereply.date
    from messagereply,messages 
    where messagereply.message_id = messages.id and messagereply.is_delete = 0 ORDER BY messagereply.id desc`;
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

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE messagereply SET is_delete = 1 WHERE id = '${id}' `;
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

  router.get("/get/page", async (req, res) => {
    const {
      pageSize,
      currentPage
    } = req.query;

    const start = (Number(currentPage) - 1) * Number(pageSize);
    const end = Number(pageSize);
    const sql = `
    select messagereply.id,i_name,r_name,m_reply,messagereply.date
    from messagereply,messages 
    where messagereply.message_id = messages.id and messagereply.is_delete = 0 ORDER BY messagereply.id desc limit ${start},${end}`;
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

  router.post("/get/search", async (req, res) => {
    const {
      search
    } = req.body;
    const sql = `select * from messagereply where (binary i_name like '%${search}%' or r_name like '%${search}%') and is_delete = 0`;
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

  app.use("/admin/api/messagereply", router);
};