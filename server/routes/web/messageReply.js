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
      message_id
    } = req.query
    const sql =
      `SELECT * FROM messagereply WHERE message_id = ${message_id}`
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
    } = validateMessageReply(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql =
      "insert into messageReply (i_name,r_name,m_reply,date,message_id) VALUES (?,?,?,?,?)";
    const {
      i_name,
      r_name,
      m_reply,
      message_id
    } = req.body;
    await db.query(
      sql,
      [`${i_name}`, `${r_name}`, `${m_reply}`, `${date}`, `${message_id}`],
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




  app.use("/web/api/messagereply", router);
};