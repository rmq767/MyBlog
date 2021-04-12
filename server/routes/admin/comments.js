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
		const { name, email, comment, article_id, is_check } = req.body;
		const createTime = moment().format("YYYY-MM-DD HH:mm:ss");
		const { errors, isValid } = validateComment(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}

		// 查询游客表是否重复游客
		const isRepeatSql = `select * from visitor where email='${email}' and is_delete=0;`;
		await db.query(isRepeatSql, async (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				if (data[0] && data[0].name === name) {
					// 相同游客，插入评论
					const sql =
						"insert into comments (name,comment,createTime,article_id,email,is_check) VALUES (?,?,?,?,?,?)";
					await db.query(
						sql,
						[
							`${name}`,
							`${comment}`,
							`${createTime}`,
							`${article_id}`,
							`${email}`,
							`${is_check}`,
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
				} else if (data[0] && data[0].name != name) {
					// 相同游客、名字不同，返回错误
					return res.send({
						message: "昵称有误，请输入正确昵称",
					});
				} else {
					// 无游客，插入游客
					const visitorInfoSql = `insert into visitor (email,name,createTime) VALUES (?,?,?)`;
					console.log(visitorInfoSql);
					await db.query(
						visitorInfoSql,
						[`${email}`, `${name}`, `${createTime}`],
						async (err, data2) => {
							if (err) {
								return res.send({
									message: err,
								});
							}
						}
					);
				}
			}
		});
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
		const sql = `UPDATE comments SET name=?,comment=?,article_id=?,email=?,is_check=? WHERE id = '${id}'`;
		const { name, comment, article_id, email, is_check } = req.body;
		await db.query(
			sql,
			[
				`${name}`,
				`${comment}`,
				`${article_id}`,
				`${email}`,
				`${is_check}`,
			],
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
			is_check,
			startTime,
			endTime,
		} = req.query;
		// 审核条件
		let isCheck = "";
		switch (Number(is_check)) {
			case 1:
				isCheck = "AND is_check=1";
				break;
			case 0:
				isCheck = "AND is_check=0";
				break;
			default:
				break;
		}
		// 文章条件
		let articleId1 = "";
		let articleId2 = "";
		if (article_id) {
			articleId1 = `AND a.article_id=${article_id} AND b.id=${article_id}`;
			articleId2 = `AND article_id=${article_id}`;
		} else {
			articleId1 = "AND a.article_id=b.id";
			articleId2 = "";
		}
		// 时间条件
		let time1 = "";
		let time2 = "";
		if (startTime && endTime) {
			time1 = `AND (a.createTime>='${startTime}' AND a.createTime < DATE_ADD('${endTime}',INTERVAL 1 DAY))`;
			time2 = `AND (createTime>='${startTime}' AND createTime < DATE_ADD('${endTime}',INTERVAL 1 DAY))`;
		}
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);

		let sql = `
        SELECT a.*,b.title FROM comments a,articles b WHERE a.name LIKE '%${nickname}%' AND a.comment LIKE '%${comment}%' ${articleId1} ${time1} ${isCheck} AND a.is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
        SELECT COUNT(*) AS total FROM comments WHERE name LIKE '%${nickname}%' AND comment LIKE '%${comment}%' ${articleId2} ${time2} ${isCheck} AND is_delete = 0;
        `;
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

	router.put("/put/status", async (req, res) => {
		const { is_check, id } = req.body;
		const sql = `UPDATE comments SET is_check = ${is_check} WHERE id = ${id} AND is_delete = 0;`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send({ success: true });
			}
		});
	});

	app.use("/admin/api/comments", router);
};
