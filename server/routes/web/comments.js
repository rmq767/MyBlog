module.exports = (app) => {
	const express = require("express");
	const router = express.Router({
		mergeParams: true, //合并参数
	});
	const db = require("../../database/db.config"); //引入数据库封装模块
	const moment = require("moment");
	const validateComment = require("../../plugins/comment");

	router.get("/", async (req, res) => {
		const { article_id } = req.query;
		const sql = `select * from comments where is_delete = 0 and article_id=${article_id} ORDER BY id desc;
    `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send({ success: true, data: data });
			}
		});
	});

	router.post("/", async (req, res) => {
		const { name, comment, article_id, email } = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		const { errors, isValid } = validateComment(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		// 验证名称唯一
		const namesql = `select name from comments where email='${email}' and is_delete = 0`;
		await db.query(namesql, async (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				console.log(data);
				if (data.length && data[0].name === name) {
					const sql =
						"insert into comments (name,comment,date,article_id,email) VALUES (?,?,?,?,?)";
					await db.query(
						sql,
						[
							`${name}`,
							`${comment}`,
							`${date}`,
							`${article_id}`,
							`${email}`,
						],
						(err, data1) => {
							if (err) {
								return res.send({
									message: err,
								});
							} else {
								return res.send({ success: true, data: data1 });
							}
						}
					);
				} else {
					return res.send({
						success: false,
						message: "昵称不正确",
					});
				}
			}
		});
	});

	router.get("/get", async (req, res) => {
		const { article_id, limit } = req.query;
		const sql = `
        SELECT * FROM comments WHERE is_delete = 0 AND article_id=${article_id} ORDER BY id DESC LIMIT 0,${limit};
        SELECT * FROM commentreply WHERE article_id=${article_id} and is_delete = 0;
        SELECT COUNT(*) AS total FROM comments WHERE article_id=${article_id};
        `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				for (let m in data[0]) {
					let arr = [];
					for (let n in data[1]) {
						if (data[0][m].id === data[1][n].comment_id) {
							arr.push(data[1][n]);
						}
					}
					data[0][m].reply = arr;
				}
				return res.send({
					success: true,
					data: data[0],
					total: data[2],
				});
			}
		});
	});

	app.use("/web/api/comments", router);
};
