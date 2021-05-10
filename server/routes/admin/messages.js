module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块
	const moment = require("moment");
	const validateMessage = require("../../plugins/message");

	router.get("/", async (req, res) => {
		const sql = `select * from messages where is_delete = 0 ORDER BY id desc`;
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

	router.put("/status", async (req, res) => {
		const { is_check, id } = req.body;
		const sql = `UPDATE messages SET is_check = ${is_check} WHERE id = ${id} AND is_delete = 0;`;
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

	router.get("/:id", async (req, res) => {
		const sql = `select * from messages where id='${req.params.id}'`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send({ data: data[0] });
			}
		});
	});

	router.post("/", async (req, res) => {
		const {
			name,
			message,
			background,
			posTop,
			posLeft,
			is_check,
		} = req.body;
		const { errors, isValid } = validateMessage(req.body);
		const createTime = moment().format("YYYY-MM-DD HH:mm:ss");
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
						"insert into messages (name,message,background,posTop,posLeft,is_check,createTime) VALUES (?,?,?,?,?,?,?)";
					await db.query(
						sql,
						[
							`${name}`,
							`${message}`,
							`${background}`,
							`${posTop}`,
							`${posLeft}`,
							`${is_check}`,
							`${createTime}`,
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
				}
			}
		});
	});

	router.put("/:id", async (req, res) => {
		const { errors, isValid } = validateMessage(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(200).send({
				message: errors,
			});
		}
		const id = req.params.id;
		const sql = `UPDATE messages SET name=?,message=?,background=?,posTop=?,posLeft=? WHERE id = '${id}'`;
		const { name, message, background, posTop, posLeft } = req.body;
		await db.query(
			sql,
			[
				`${name}`,
				`${message}`,
				`${background}`,
				`${posTop}`,
				`${posLeft}`,
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
		const sql = `UPDATE messages SET is_delete = 1 WHERE id = '${id}'`;
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
			message,
			is_check,
			startTime,
			endTime,
		} = req.query;
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
		// 时间条件
		let time = "";
		if (startTime && endTime) {
			time = `AND (createTime>='${startTime}' AND createTime < DATE_ADD('${endTime}',INTERVAL 1 DAY))`;
		}
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);

		let sql = `
        SELECT * FROM messages WHERE name LIKE '%${nickname}%' AND message LIKE '%${message}%' ${time} ${isCheck} AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
        SELECT COUNT(*) AS total FROM messages WHERE name LIKE '%${nickname}%' AND message LIKE '%${message}%'  ${time} ${isCheck} AND is_delete = 0;
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
	app.use("/admin/api/messages", router);
};
