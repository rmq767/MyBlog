module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const db = require("../../database/db.config"); //引入数据库封装模块
  const moment = require("moment");
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const validateMessage = require('../../plugins/message')

  router.get("/", async (req, res) => {
    const sql = `select * from messages where is_delete = 0`;
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
    const sql = `select * from messages where id='${req.params.id}'`;
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: "数据库查询错误"
        });
      } else {
        return res.send(data[0]);
      }
    });
  });

  router.post("/", async (req, res) => {
    const {
      errors,
      isValid
    } = validateMessage(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql =
      "insert into messages (avatar, name,message,date) VALUES (?,?,?,?)";
    const {
      avatar,
      name,
      message
    } = req.body;
    await db.query(
      sql,
      [`${avatar}`, `${name}`, `${message}`, `${date}`],
      (err, data) => {
        if (err) {
          return res.send({
            message: err
          });
        } else {
          return res.send(data);
        }
      }
    );
  });

  router.put("/:id", async (req, res) => {
    const {
      errors,
      isValid
    } = validateMessage(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const id = req.params.id;
    const sql = `UPDATE messages SET avatar = ?,name=?,message=?,date=? WHERE id = '${id}'`;
    const {
      avatar,
      name,
      message
    } = req.body;
    await db.query(
      sql,
      [`${avatar}`, `${name}`, `${message}`, `${date}`],
      (err, data) => {
        if (err) {
          return res.send({
            message: "数据库查询错误"
          });
        } else {
          return res.send(data);
        }
      }
    );
  });

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE messages SET is_delete = 1 WHERE id = '${id}' `;
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
    const sql = `select * from messages limit ${start},${end}`;
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
    const sql = `select * from messages where (binary name like '%${search}%' or message like '%${search}%') and is_delete = 0`;
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

  app.use("/admin/api/messages", router);
};