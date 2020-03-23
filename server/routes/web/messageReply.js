module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true //合并参数
  });
  const db = require("../../database/db.config"); //引入数据库封装模块
  const moment = require("moment");
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const validateMessageReply = require('../../plugins/messageReply')

  router.get("/", async (req, res) => {
    const {
      message_id,
    } = req.query
    const sql = `select * from messageReply where is_delete = 0 and message_id=${message_id} ORDER BY id desc`;
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
    } = validateMessageReply(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql =
      "insert into messageReply (name,m_reply,date,message_id) VALUES (?,?,?,?)";
    const {
      name,
      m_reply,
      message_id
    } = req.body;
    await db.query(
      sql,
      [`${name}`, `${m_reply}`, `${date}`, `${message_id}`],
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




  app.use("/web/api/messageReply", router);
};