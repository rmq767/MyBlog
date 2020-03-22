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
    const sql = `select * from comments where is_delete = 0 and article_id=${article_id} ORDER BY id desc;
    `;
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: "数据库查询错误"
        });
      } else {
        // console.log(data[0]);
        // console.log(data[1]);
        // for (let comment in data[0]) {
        //   for (let count in data[1]) {
        //     if (comment.id == count.comment_id) {
        //       comment.reply_count = count.comment_count
        //     }
        //   }
        //   console.log(data[0]);
        // }
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
    const sql = `select * from comments WHERE is_delete = 0 AND article_id =${article_id} ORDER BY id desc limit ${start},${end};
    SELECT id comment_id,COUNT(*) comment_count FROM 
    (SELECT commentreply.comment_id,comments.id FROM comments RIGHT JOIN commentreply ON commentreply.comment_id = comments.id) t 
    GROUP BY comment_id HAVING COUNT(comment_id)>=1;
    `;
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: "数据库查询错误"
        });
      } else {
        for (let m in data[0]) {
          for (let n in data[1]) {
            if (data[0][m].id == data[1][n].comment_id) {
              data[0][m].reply_count = data[1][n].comment_count
            }
          }
        }
        return res.send(data[0]);
      }
    });
  });



  app.use("/web/api/comments", router);
};