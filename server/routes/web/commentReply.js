module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true //合并参数
  });
  const db = require("../../database/db.config"); //引入数据库封装模块
  const moment = require("moment");
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const validateCommentReply = require('../../plugins/commentReply')

  router.get("/", async (req, res) => {
    const {
      comment_id
    } = req.query
    const sql =
      `SELECT * FROM commentreply WHERE comment_id = ${comment_id}`
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: err
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
    } = validateCommentReply(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql =
      "insert into commentreply (i_name,r_name,c_reply,date,comment_id) VALUES (?,?,?,?,?)";
    const {
      i_name,
      r_name,
      c_reply,
      comment_id
    } = req.body;
    await db.query(
      sql,
      [`${i_name}`, `${r_name}`, `${c_reply}`, `${date}`, `${comment_id}`],
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




  app.use("/web/api/commentreply", router);
};