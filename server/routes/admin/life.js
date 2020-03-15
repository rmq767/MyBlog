module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const db = require("../../database/db.config"); //引入数据库封装模块
  const moment = require("moment");
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const validateLife = require('../../plugins/life')

  router.get("/", async (req, res) => {
    const sql = `select * from life where is_delete = 0`;
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
    const sql = `select * from life where id='${req.params.id}'`;
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
    } = validateLife(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql =
      "insert into life (image,description,date) VALUES (?,?,?)";
    const {
      image,
      description
    } = req.body;
    await db.query(
      sql,
      [`${image}`, `${description}`, `${date}`],
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
    } = validateLife(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const id = req.params.id;
    const sql = `UPDATE life SET image = ?,description=?,date=? WHERE id = '${id}'`;
    const {
      image,
      description
    } = req.body;
    await db.query(
      sql,
      [`${image}`, `${description}`, `${date}`],
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
    const sql = `UPDATE life SET is_delete = 1 WHERE id = '${id}' `;
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
    const sql = `select * from life limit ${start},${end}`;
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
    const sql = `select * from life where (binary description like '%${search}%' or date like '%${search}%') and is_delete = 0`;
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

  app.use("/admin/api/life", router);
};