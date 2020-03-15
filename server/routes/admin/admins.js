module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const db = require("../../database/db.config"); //引入数据库封装模块
  const bcrypt = require('bcryptjs');
  const validatAdmin = require('../../plugins/admin')

  router.get("/", async (req, res) => {
    const sql = `select * from admins where is_delete = 0`;
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
    const sql = `select username,email,is_super from admins where id='${req.params.id}'`;
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
    } = validatAdmin(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql = `
    SELECT email FROM admins;
    insert into admins ( username,email,password,is_super) VALUES (?,?,?,?);`;
    const {
      username,
      email,
      password,
      is_super
    } = req.body;
    const pwd = bcrypt.hashSync(password, 8);
    await db.query(sql, [`${username}`, `${email}`, `${pwd}`, `${is_super? '1':'0'}`], (err, data) => {
      if (err) {
        return res.send({
          message: err
        });
      } else {
        const hasEmail = data[0].some(v => (v.email === email))
        if (hasEmail) {
          return res.status(500).send({
            message: '邮箱已存在'
          })
        }
        return res.send(hasEmail);
      }
    });
  });

  router.put("/:id", async (req, res) => {
    const {
      errors,
      isValid
    } = validatAdmin(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const id = req.params.id;
    const sql = `update admins SET username=?,email=?,password=?,is_super=? WHERE id = '${id}'`;
    const {
      username,
      email,
      password,
      is_super
    } = req.body;
    const pwd = bcrypt.hashSync(password, 8);
    await db.query(sql, [`${username}`, `${email}`, `${pwd}`, `${is_super? '1':'0'}`], (err, data) => {
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
    const sql = `update admins SET is_delete = 1 WHERE id = '${id}' `;
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
    const sql = `select * from admins limit ${start},${end}`;
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
    const sql = `select * from admins where (binary username like '%${search}%' or email like '%${search}%') and is_delete = 0`;
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

  app.use("/admin/api/admins", router);
};