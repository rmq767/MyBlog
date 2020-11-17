module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块
	const validateCommentReply = require("../../plugins/commentReply");
	const moment = require("moment");

	router.get("/", async (req, res) => {
		const sql = `select commentreply.id,i_name,r_name,c_reply,commentreply.date
    from commentreply,comments 
    where commentreply.comment_id = comments.id and commentreply.is_delete = 0 ORDER BY commentreply.id desc`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send({ success: true, data: data });
			}
		});
	});

	router.get("/:id", async (req, res) => {
		const sql = `select * from commentreply where id='${req.params.id}'`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send({ success: true, data: data[0] });
			}
		});
	});

	router.put("/:id", async (req, res) => {
		const { errors, isValid } = validateCommentReply(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		const id = req.params.id;
		const sql = `UPDATE commentreply SET i_name=?,r_name=?,c_reply=?,date=?,comment_id=?,article_id=? WHERE id = '${id}'`;
		const { i_name, r_name, c_reply, article_id } = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		await db.query(
			sql,
			[
				`${i_name}`,
				`${r_name}`,
				`${c_reply}`,
				`${date}`,
				`${article_id}`,
			],
			(err, data) => {
				if (err) {
					return res.send({
						message: "数据库查询错误",
					});
				} else {
					return res.send({ success: true, data: data });
				}
			}
		);
	});

	router.delete("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `delete from commentreply WHERE id = '${id}'`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
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
			i_name,
			r_name,
			c_reply,
			article_id,
		} = req.query;
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		let sql;
		if (article_id) {
			sql = `
            SELECT a.*,b.title FROM commentreply a,articles b WHERE a.i_name LIKE '%${i_name}%' AND a.r_name LIKE '%${r_name}%' AND a.c_reply LIKE '%${c_reply}%' AND a.article_id=${article_id} AND b.id=${article_id} AND a.is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
            SELECT COUNT(*) AS total FROM commentreply WHERE i_name LIKE '%${i_name}%' AND r_name LIKE '%${r_name}%' AND c_reply LIKE '%${c_reply}%' AND article_id=${article_id} AND is_delete = 0;
            `;
		} else {
			sql = `
            SELECT a.*,b.title FROM commentreply a,articles b WHERE a.i_name LIKE '%${i_name}%' AND a.r_name LIKE '%${r_name}%' AND a.c_reply LIKE '%${c_reply}%' AND a.article_id= b.id AND a.is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
            SELECT COUNT(*) AS total FROM commentreply WHERE i_name LIKE '%${i_name}%' AND r_name LIKE '%${r_name}%' AND c_reply LIKE '%${c_reply}%' AND is_delete = 0;
            `;
		}
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
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
	// 	const { search } = req.body;
	// 	const sql = `select * from commentreply where (binary i_name like '%${search}%' or r_name like '%${search}%') and is_delete = 0`;
	// 	await db.query(sql, (err, data) => {
	// 		if (err) {
	// 			return res.send({
	// 				message: "数据库查询错误",
	// 			});
	// 		} else {
	// 			return res.send({ success: true, data: data });
	// 		}
	// 	});
	// });

	app.use("/admin/api/commentreply", router);
};
