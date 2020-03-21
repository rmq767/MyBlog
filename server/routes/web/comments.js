module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true //合并参数
  });
  const db = require("../../database/db.config"); //引入数据库封装模块
  const moment = require("moment");
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const validateComment = require('../../plugins/comment')

  router.get("/", async (req, res) => {
    const {
      article_id
    } = req.query
    const sql = `select * from comments where is_delete = 0 and article_id=${article_id} ORDER BY id desc`;
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

  // router.get("/:id", async (req, res) => {
  //   const sql = `
  //   UPDATE articles SET clicks=(SELECT clicks FROM (SELECT * FROM articles WHERE id = ${req.params.id}) a1)+1 WHERE id = '${req.params.id}';
  //   select * from articles where id='${req.params.id};
  //   '`;
  //   await db.query(sql, (err, data) => {
  //     if (err) {
  //       return res.send({
  //         message: "数据库查询错误"
  //       });
  //     } else {
  //       return res.send(data[1][0]);
  //     }
  //   });
  // });

  router.get("/get/page", async (req, res) => {
    const {
      pageSize,
      currentPage,
      article_id
    } = req.query;
    const start = (Number(currentPage) - 1) * Number(pageSize);
    const end = Number(pageSize);
    const sql = `select * from comments WHERE is_delete = 0 AND article_id =${article_id} ORDER BY id desc limit ${start},${end} `;
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



  app.use("/web/api/comments", router);
};