module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const db = require("../../database/db.config"); //引入数据库封装模块
  const moment = require("moment");
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const validateLink = require('../../plugins/link')

  router.get("/", async (req, res) => {
    const sql = `select * from links where is_delete = 0`;
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
    const sql = `select * from links where id='${req.params.id}'`;
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
    } = validateLink(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql =
      "insert into links (title,description,link,image,date) VALUES (?,?,?,?,?)";
    const {
      title,
      description,
      link,
      image
    } = req.body;
    await db.query(
      sql,
      [`${title}`, `${description}`, `${link}`, `${image}`, `${date}`],
      (err, data) => {
        if (err) {
          res.send({
            message: err
          });
        } else {
          res.send(data);
        }
      }
    );
  });

  router.put("/:id", async (req, res) => {
    const {
      errors,
      isValid
    } = validateLink(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const id = req.params.id;
    const sql = `UPDATE links SET title=?,description=?,link=?,image=?,date=? WHERE id = '${id}'`;
    const {
      title,
      description,
      link,
      image
    } = req.body;
    await db.query(
      sql,
      [`${title}`, `${description}`, `${link}`, `${image}`, `${date}`],
      (err, data) => {
        if (err) {
          res.send({
            message: "数据库查询错误"
          });
        } else {
          res.send(data);
        }
      }
    );
  });

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE links SET is_delete = 1 WHERE id = '${id}' `;
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
    const sql = `select * from links limit ${start},${end}`;
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
    const sql = `select * from links where (binary title like '%${search}%' or link like '%${search}%') and is_delete = 0`;
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

  app.use("/admin/api/links", router);
};