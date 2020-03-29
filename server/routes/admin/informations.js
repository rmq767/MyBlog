module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const db = require("../../database/db.config"); //引入数据库封装模块
  const moment = require("moment");
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const validateInformation = require('../../plugins/information')

  router.get("/", async (req, res) => {
    const sql = `select * from informations where is_delete = 0 ORDER BY id desc`;
    await db.query(sql, (err, data) => {
      if (err) {
        res.send({
          message: "数据库查询错误"
        });
      } else {
        res.send(data);
      }
    });
  });

  router.get("/:id", async (req, res) => {
    const sql = `select * from informations where id='${req.params.id}'`;
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

  router.post("/", async (req, res) => {
    const {
      errors,
      isValid
    } = validateInformation(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql = "insert into informations ( my_message,my_info,my_hope,date) VALUES (?,?,?,?)";
    const {
      my_message,
      my_info,
      my_hope,
    } = req.body;
    await db.query(sql, [`${my_message}`, `${my_info}`, `${my_hope}`, `${date}`], (err, data) => {
      if (err) {
        res.send({
          message: err
        });
      } else {
        res.send(data);
      }
    });
  });

  router.put("/:id", async (req, res) => {
    const {
      errors,
      isValid
    } = validateInformation(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const id = req.params.id;
    const sql = `UPDATE informations SET my_message=?,my_info=?,my_hope=?,date=? WHERE id = '${id}'`;
    const {
      my_message,
      my_info,
      my_hope,
    } = req.body;
    await db.query(sql, [`${my_message}`, `${my_info}`, `${my_hope}`, `${date}`], (err, data) => {
      if (err) {
        res.send({
          message: "数据库查询错误"
        });
      } else {
        res.send(data);
      }
    });
  });

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE informations SET is_delete = 1 WHERE id = '${id}' `;
    await db.query(sql, (err, data) => {
      if (err) {
        res.send({
          message: "数据库查询错误"
        });
      } else {
        res.send(data);
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
    const sql = `select * from informations WHERE is_delete = 0 ORDER BY id DESC limit ${start},${end}`;
    await db.query(sql, (err, data) => {
      if (err) {
        res.send({
          message: "数据库查询错误"
        });
      } else {
        res.send(data);
      }
    });
  });

  router.post("/get/search", async (req, res) => {
    const {
      search
    } = req.body;
    const sql = `select * from informations where (binary my_message like '%${search}%' or my_info like '%${search}%') and is_delete = 0`;
    await db.query(sql, (err, data) => {
      if (err) {
        res.send({
          message: "数据库查询错误"
        });
      } else {
        res.send(data);
      }
    });
  });

  app.use("/admin/api/informations", router);
};