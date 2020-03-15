module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const db = require("../../database/db.config"); //引入数据库封装模块
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken')


  router.post('/', async (req, res) => {
    const {
      email,
      password
    } = req.body;
    const sql = `select id,username,email,password from admins where email='${email}'`;
    await db.query(sql, (err, data) => {
      if (err) {
        return res.send({
          message: err
        });
      } else {
        if (data.length === 0) {
          return res.status(422).send({
            message: '用户不存在'
          })
        } else {
          const isValid = bcrypt.compareSync(password, data[0].password)
          if (!isValid) {
            return res.status(422).send({
              message: '密码错误'
            })
          } else {
            const token = jwt.sign({
              id: data[0].email
            }, app.get('secret'), {
              expiresIn: 60 * 60 * 1000 * 72 * 24
            })
            return res.send({
              token,
              username: data[0].username,
              id: data[0].id
            })
          }
        }
      }
    });
  })

  app.use('/login', router)
}