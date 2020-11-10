module.exports = (app) => {
	const express = require("express");
	const router = express.Router({
		mergeParams: true, //合并参数
	});
	const db = require("../../database/db.config"); //引入数据库封装模块
	const moment = require("moment");
	const validateCommentReply = require("../../plugins/commentReply");

	router.get("/", async (req, res) => {
		const { comment_id } = req.query;
		const sql = `SELECT * FROM commentreply WHERE comment_id = ${comment_id}`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send(data);
			}
		});
	});

	router.post("/", async (req, res) => {
		const { i_name, r_name, c_reply, comment_id } = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		const { errors, isValid } = validateCommentReply(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		// 验证名称唯一
		const namesql = "select i_name from commentreply where is_delete = 0";
		await db.query(namesql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				for (const key in data) {
					if (data[key] === i_name) {
						return res.send({
							message: "名称已存在",
						});
					}
				}
			}
		});
		const sql =
			"insert into commentreply (i_name,r_name,c_reply,date,comment_id) VALUES (?,?,?,?,?)";
		await db.query(
			sql,
			[
				`${i_name}`,
				`${r_name}`,
				`${c_reply}`,
				`${date}`,
				`${comment_id}`,
			],
			(err, data) => {
				if (err) {
					return res.send({
						message: err,
					});
				} else {
					return res.send(data);
				}
			}
		);
	});

	app.use("/web/api/commentreply", router);
};
