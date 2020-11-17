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
		const { name, comment, article_id } = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		const { errors, isValid } = validateComment(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		// // 验证名称唯一
		// const namesql = "select name from comments where is_delete = 0";
		// await db.query(namesql, (err, data) => {
		// 	if (err) {
		// 		return res.send({
		// 			message: err,
		// 		});
		// 	} else {
		// 		let sameName = data.some((item) => item.name === name);
		// 		if (sameName) {
		// 			return res.send({ message: "已有相同昵称" });
		// 		}
		// 	}
		// });

		const sql =
			"insert into comments (name,comment,date,article_id) VALUES (?,?,?,?)";
		await db.query(
			sql,
			[`${name}`, `${comment}`, `${date}`, `${article_id}`],
			(err, data) => {
				if (err) {
					return res.send({
						message: err,
					});
				} else {
					return res.send({ success: true, data: data });
				}
			}
		);
	});

	router.get("/get", async (req, res) => {
		const { article_id, limit } = req.query;
		let count = 10;
		if (limit) {
			count += limit;
		}
		const sql = `
        SELECT * FROM comments WHERE is_delete = 0 AND article_id=${article_id} ORDER BY id DESC LIMIT ${count};
        SELECT * FROM commentreply WHERE article_id=${article_id} and  is_delete = 0;
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
