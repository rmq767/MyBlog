module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true //合并参数
  });
  const db = require("../../database/db.config"); //引入数据库封装模块
  const moment = require("moment");
  const validateComment = require("../../plugins/comment");

  router.get("/", async (req, res) => {
    const {
      article_id
    } = req.query;
    const sql = `select * from comments where is_delete = 0 and article_id=${article_id} ORDER BY id desc;
    `;
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
    } = validateComment(req.body);
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      });
    }
    const sql =
      "insert into comments (name,comment,date,article_id) VALUES (?,?,?,?)";
    const {
      name,
      comment,
      article_id
    } = req.body;
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
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

  router.get("/get", async (req, res) => {
    const {
      article_id,
      limit
    } = req.query;
    let count = 10;
    if (limit) {
      count += limit;
    }
    const sql = `SELECT * FROM comments WHERE is_delete = 0 AND article_id =${article_id} ORDER BY id DESC LIMIT ${count};
    SELECT id comment_id,COUNT(*) comment_count FROM 
    (SELECT commentreply.comment_id,comments.id FROM comments RIGHT JOIN commentreply ON commentreply.comment_id = comments.id) t 
    GROUP BY comment_id HAVING COUNT(comment_id)>=1;`;
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: "数据库查询错误"
        });
      } else {
        for (let m in data[0]) {
          for (let n in data[1]) {
            if (data[0][m].id == data[1][n].comment_id) {
              data[0][m].reply_count = data[1][n].comment_count;
            }
          }
        }
        return res.send(data[0]);
      }
    });
  });

  app.use("/web/api/comments", router);
};