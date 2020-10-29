module.exports = app => {
    const express = require("express");
    const router = express.Router({
        mergeParams: true //合并参数
    });
    const db = require("../../database/db.config"); //引入数据库封装模块
    const moment = require("moment");
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const validateArticle = require('../../plugins/article') //验证请求体
// 获取全部文章
    router.get("/", async (req, res) => {
        const sql = "select * from articles where is_delete = 0 ORDER BY id desc";
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
// 获取单个文章
    router.get("/:id", async (req, res) => {
        const sql = `
    select * from articles where id='${req.params.id};
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
// 新增文章
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
        const sql = "insert into articles (title, content_html,content_md,date,type,theme) VALUES (?,?,?,?,?,?)";
        const {
            title,
            content_html,
            content_md,
            type,
            theme
        } = req.body;
        await db.query(sql, [`${title}`, `${content_html}`, `${content_md}`, `${date}`,`${type}`,`${theme}`], (err, data) => {
            if (err) {
                return res.send({
                    message: err
                });
            } else {
                return res.send(data);
            }
        });
    });
// 编辑修改文章
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
        const sql = `UPDATE articles SET title = ?,content_html=?,content_md=?,date=?,type=?,theme=? WHERE id = '${id}'`;
        const {
            title,
            content_html,
            content_md,
            type,
            theme
        } = req.body;
        await db.query(sql, [`${title}`, `${content_html}`, `${content_md}`, `${date}`,`${type}`,`${theme}`], (err, data) => {
            if (err) {
                return res.send({
                    message: "数据库查询错误"
                });
            } else {
                return res.send(data);
            }
        });
    });
// 删除文章
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
// 文章分页
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
// 文章搜索
    router.post("/get/search", async (req, res) => {
        const {
            title,
            content,
            theme,
            type
        } = req.body;
        const sql = `select * from articles where title like "%${title}%" and content_md like "%${content}%" and theme like "%${theme }%" and type like "%${type}%" and is_delete = 0 ORDER BY id DESC`;
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
// 获取文章主题
    router.get("/get/theme", async (req, res) => {
        const sql = "select theme from articles where is_delete = 0 ORDER BY id desc";
        await db.query(sql, (err, data) => {
            if (err) {
                return res.send({
                    message: "数据库查询错误"
                });
            } else {
                let response = []
                data.forEach((item)=>{
                    if (item.theme) {
                        response.push(item.theme)
                    }
                })
                response =  response.toString()
                response =  response.split(',')
                return res.send(response);
            }
        });
    });
// 获取文章分类
    router.get("/get/type", async (req, res) => {
        const sql = "select type from articles where is_delete = 0 ORDER BY id desc";
        await db.query(sql, (err, data) => {
            if (err) {
                return res.send({
                    message: "数据库查询错误"
                });
            } else {
                let response = []
                data.forEach((item)=>{
                    if (item.type) {
                        response.push(item.type)
                    }
                })
                response =  response.toString()
                response =  response.split(',')
                return res.send(response);
            }
        });
    });

    app.use("/admin/api/articles", router);
};