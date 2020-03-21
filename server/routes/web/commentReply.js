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
      comment_id,
    } = req.query
    const sql = `select * from commentreply where is_delete = 0 and comment_id=${comment_id} ORDER BY id desc`;
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
    } = validateCommentReply(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql =
      "insert into commentreply (name,c_reply,date,comment_id) VALUES (?,?,?,?)";
    const {
      name,
      c_reply,
      comment_id
    } = req.body;
    await db.query(
      sql,
      [`${name}`, `${c_reply}`, `${date}`, `${comment_id}`],
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