module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const db = require("../../database/db.config"); //引入数据库封装模块
  const moment = require("moment");
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const validateComment = require('../../plugins/comment')

  router.get("/", async (req, res) => {
    const sql = `select comments.id,name,comment,title 
    from comments,articles 
    where comments.article_id = articles.id and comments.is_delete = 0 ORDER BY comments.id desc`;
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
    const sql = `select * from comments where id='${req.params.id}'`;
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
    } = validateComment(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql =
      "insert into comments (name,comment,date,article_id) VALUES (?,?,?,?)";
    const {
      name,
      comment,
      article_id
    } = req.body;
    await db.query(
      sql,
      [`${name}`, `${comment}`, `${date}`, `${article_id}`],
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
    } = validateComment(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const id = req.params.id;
    const sql = `UPDATE comments SET name=?,comment=?,date=?,article_id=? WHERE id = '${id}'`;
    const {
      name,
      comment,
      article_id
    } = req.body;
    await db.query(
      sql,
      [`${name}`, `${comment}`, `${date}`, `${article_id}`],
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
    const sql = `delete from comments WHERE id = '${id}' `;
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
    select comments.id,name,comment,title 
    from comments,articles 
    where comments.article_id = articles.id and comments.is_delete = 0 ORDER BY comments.id desc limit ${start},${end}`;
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
    const sql = `select * from comments where (binary name like '%${search}%' or comment like '%${search}%') and is_delete = 0`;
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

  app.use("/admin/api/comments", router);
};