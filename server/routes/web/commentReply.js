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
		const createTime = moment().format("YYYY-MM-DD HH:mm:ss");
		const { errors, isValid } = validateCommentReply(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}

		// 查询游客表是否重复游客
		const isRepeatSql = `select * from visitor where email='${i_email}' and is_delete=0;`;
		await db.query(isRepeatSql, async (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				if (data[0] && data[0].name === i_name) {
					// 相同游客，插入评论
					const sql =
						"insert into commentreply (i_name,r_name,c_reply,createTime,comment_id,article_id,i_email,r_email) VALUES (?,?,?,?,?,?,?,?)";
					await db.query(
						sql,
						[
							`${i_name}`,
							`${r_name}`,
							`${c_reply}`,
							`${createTime}`,
							`${comment_id}`,
							`${article_id}`,
							`${i_email}`,
							`${r_email}`,
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
				} else if (data[0] && data[0].name != i_name) {
					// 相同游客、名字不同，返回错误
					return res.send({
						message: "昵称有误，请输入正确昵称",
					});
				} else {
					// 无游客，插入游客
					const visitorInfoSql = `insert into visitor (email,name,createTime) VALUES (?,?,?)`;
					await db.query(
						visitorInfoSql,
						[`${i_email}`, `${i_name}`, `${createTime}`],
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

	app.use("/web/api/commentreply", router);
};
