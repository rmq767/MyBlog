module.exports = (app) => {
	const express = require("express");
	const router = express.Router({
		mergeParams: true, //合并参数
	});
	const db = require("../../database/db.config"); //引入数据库封装模块
	const moment = require("moment");
	const validateMessage = require("../../plugins/message");

	router.get("/", async (req, res) => {
		const sql = `select * from messages where is_check = 1 AND is_delete = 0 ORDER BY id desc limit 20`;
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
		const { name, message, background, top, left } = req.body;
		const createTime = moment().format("YYYY-MM-DD HH:mm:ss");
		const { errors, isValid } = validateMessage(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(200).send({
				message: errors,
			});
		}
		// 验证名称唯一
		const namesql = "select name from messages where is_delete = 0";
		await db.query(namesql, async (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				let sameName = data.some((item) => item.name === name);
				if (sameName) {
					return res.send({ message: "已有相同昵称" });
				} else {
					const sql =
						"insert into messages (name,message,background,posTop,posLeft,createTime,updateTime) VALUES (?,?,?,?,?,?,?)";
					await db.query(
						sql,
						[
							`${name}`,
							`${message}`,
							`${background}`,
							`${top}`,
							`${left}`,
							`${createTime}`,
							`${createTime}`,
						],
						(err, data) => {
							if (err) {
								return res.send({
									message: err,
								});
							} else {
								return res.send({ success: true, data });
							}
						}
					);
				}
			}
		});
	});

	app.use("/web/api/messages", router);
};
