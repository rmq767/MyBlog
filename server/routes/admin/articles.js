module.exports = app => {
    const express = require("express");
    const router = express.Router({
        mergeParams: true //合并参数
    });
    const db = require("../../database/db.config"); //引入数据库封装模块
    const moment = require("moment");
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const validateArticle = require('../../plugins/article') //验证请求体

    router.get("/", async (req, res) => {
        const sql = "select id,title,content_md,date,clicks from articles where is_delete = 0 ORDER BY id desc";
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
        const sql = `
    select title,content_md from articles where id='${req.params.id};
    '`;
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
        } = validateArticle(req.body)
        // 判断是否验证通过
        if (!isValid) {
            return res.status(500).send({
                message: errors
            })
        }
        const sql = "insert into articles (title, content_html,content_md,date) VALUES (?,?,?,?)";
        const {
            title,
            content_html,
            content_md
        } = req.body;
        await db.query(sql, [`${title}`, `${content_html}`, `${content_md}`, `${date}`], (err, data) => {
            if (err) {
                return res.send({
                    message: err
                });
            } else {
                return res.send(data);
            }
        });
    });

    router.put("/:id", async (req, res) => {
        const {
            errors,
            isValid
        } = validateArticle(req.body)
        // 判断是否验证通过
        if (!isValid) {
            return res.status(500).send({
                message: errors
            })
        }
        const id = req.params.id;
        const sql = `UPDATE articles SET title = ?,content_html=?,content_md=?,date=? WHERE id = '${id}'`;
        const {
            title,
            content_html,
            content_md
        } = req.body;
        await db.query(sql, [`${title}`, `${content_html}`, `${content_md}`, `${date}`], (err, data) => {
            if (err) {
                return res.send({
                    message: "数据库查询错误"
                });
            } else {
                return res.send(data);
            }
        });
    });

    router.delete("/:id", async (req, res) => {
        const id = req.params.id;
        const sql = `UPDATE articles SET is_delete = 1 WHERE id = '${id}' `;
        await db.query(sql, [], (err, data) => {
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
        const sql = `select * from articles WHERE is_delete = 0 ORDER BY id DESC limit ${start},${end}`;
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
        const sql = `select * from articles where (binary title like '%${search}%' or content_html like '%${search}%') and is_delete = 0`;
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

    app.use("/admin/api/articles", router);
};