module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块
	const moment = require("moment");
	const validateComment = require("../../plugins/comment");

	router.get("/", async (req, res) => {
		const sql = `select comments.id,name,comment,title 
    from comments,articles 
    where comments.article_id = articles.id and comments.is_delete = 0 ORDER BY comments.id desc`;
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

	router.get("/:id", async (req, res) => {
		const sql = `select * from comments where id='${req.params.id}'`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send({ success: true, data: data[0] });
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

	router.put("/:id", async (req, res) => {
		const { errors, isValid } = validateComment(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		const id = req.params.id;
		const sql = `UPDATE comments SET name=?,comment=?,date=?,article_id=? WHERE id = '${id}'`;
		const { name, comment, article_id } = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
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

	router.delete("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `delete from comments WHERE id = '${id}' `;
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

	router.get("/get/page", async (req, res) => {
		const {
			pageSize,
			currentPage,
			nickname,
			article_id,
			comment,
		} = req.query;

		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		let sql;
		if (article_id) {
			sql = `
            SELECT a.*,b.title FROM comments a,articles b WHERE a.name LIKE '%${nickname}%' AND a.comment LIKE '%${comment}%' AND a.article_id=${article_id} AND b.id=${article_id} AND a.is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
            SELECT COUNT(*) AS total FROM comments WHERE name LIKE '%${nickname}%' AND comment LIKE '%${comment}%' AND article_id=${article_id} AND is_delete = 0;
        `;
		} else {
			sql = `
            SELECT a.*,b.title FROM comments a,articles b WHERE a.name LIKE '%${nickname}%' AND a.comment LIKE '%${comment}%' AND a.article_id=b.id AND a.is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
            SELECT COUNT(*) AS total FROM comments WHERE name LIKE '%${nickname}%' AND comment LIKE '%${comment}%' AND is_delete = 0;
        `;
		}
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send({
					success: true,
					data: data[0],
					total: data[1],
				});
			}
		});
	});

	// router.post("/get/search", async (req, res) => {
	// 	const { nickname, comment, article_id } = req.body;
	// 	const sql = `select * from comments where name like '%${nickname}%' and comment like '%${comment}%'and article_id = ${article_id} and is_delete = 0 ORDER BY id DESC`;
	// 	await db.query(sql, (err, data) => {
	// 		if (err) {
	// 			return res.send({
	// 				message: err,
	// 			});
	// 		} else {
	// 			return res.send({ success: true, data: data });
	// 		}
	// 	});
	// });

	app.use("/admin/api/comments", router);
};
