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
				return res.send({ success: true, data: data });
			}
		});
	});

	router.post("/", async (req, res) => {
		const {
			i_name,
			r_name,
			c_reply,
			comment_id,
			article_id,
			i_email,
			r_email,
		} = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		const { errors, isValid } = validateCommentReply(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		// 验证名称唯一
		const namesql = `select b.i_name from comments a,commentreply b where (a.name = b.i_name AND b.i_name = '${i_name}') AND (b.i_email='${i_email}' AND b.i_email = a.email) AND b.is_delete = 0`;
		await db.query(namesql, async (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				if (data.length && data[0].i_name === i_name) {
					const sql =
						"insert into commentreply (i_name,r_name,c_reply,date,comment_id,article_id,i_email,r_email) VALUES (?,?,?,?,?,?,?,?)";
					await db.query(
						sql,
						[
							`${i_name}`,
							`${r_name}`,
							`${c_reply}`,
							`${date}`,
							`${comment_id}`,
							`${article_id}`,
							`${i_email}`,
							`${r_email}`,
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
				} else {
					return res.send({
						success: false,
						message: "昵称不正确",
					});
				}
			}
		});
	});

	app.use("/web/api/commentreply", router);
};
