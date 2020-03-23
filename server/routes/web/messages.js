module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true //合并参数
  });
  const db = require("../../database/db.config"); //引入数据库封装模块
  const moment = require("moment");
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const validateMessage = require('../../plugins/message')

  router.get("/", async (req, res) => {
    const sql = `select * from messages where is_delete = 0 ORDER BY id desc`;
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
    } = validateMessage(req.body)
    // 判断是否验证通过
    if (!isValid) {
      return res.status(500).send({
        message: errors
      })
    }
    const sql =
      "insert into messages (name,message,date) VALUES (?,?,?)";
    const {
      name,
      message,
    } = req.body;
    await db.query(
      sql,
      [`${name}`, `${message}`, `${date}`],
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
      currentPage
    } = req.query;
    const start = (Number(currentPage) - 1) * Number(pageSize);
    const end = Number(pageSize);
    const sql = `select * from messages WHERE is_delete = 0 ORDER BY id desc limit ${start},${end};
    SELECT id message_id,COUNT(*) message_count FROM 
    (SELECT messagereply.message_id,messages.id FROM messages RIGHT JOIN messagereply ON messagereply.message_id = messages.id) t 
    GROUP BY message_id HAVING COUNT(message_id)>=1;
    `;
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: "数据库查询错误"
        });
      } else {
        for (let m in data[0]) {
          for (let n in data[1]) {
            if (data[0][m].id == data[1][n].message_id) {
              data[0][m].reply_count = data[1][n].message_count
            }
          }
        }
        return res.send(data[0]);
      }
    });
  });



  app.use("/web/api/messages", router);
};