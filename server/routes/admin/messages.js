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
		const { name, message, background, posTop, posLeft } = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		const { errors, isValid } = validateMessage(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		// 验证名称唯一
		const namesql = "select name from messages where is_delete = 0";
		await db.query(namesql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				let sameName = data.some((item) => item.name === name);
				if (sameName) {
					return res.send({ message: "已有相同昵称" });
				}
			}
		});

		const sql =
			"insert into messages (name,message,background,posTop,posLeft,date) VALUES (?,?,?,?,?,?)";
		await db.query(
			sql,
			[
				`${name}`,
				`${message}`,
				`${background}`,
				`${posTop}`,
				`${posLeft}`,
				`${date}`,
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

	router.put("/:id", async (req, res) => {
		const { errors, isValid } = validateMessage(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		const id = req.params.id;
		const sql = `UPDATE messages SET name=?,message=?,background=?,posTop=?,posLeft=?,date=? WHERE id = '${id}'`;
		const { name, message, background, posTop, posLeft } = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		await db.query(
			sql,
			[
				`${name}`,
				`${message}`,
				`${background}`,
				`${posTop}`,
				`${posLeft}`,
				`${date}`,
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
		const sql = `delete from messages WHERE id = '${id}' `;
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
			startTime,
			endTime,
		} = req.query;
		let sql;
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		if (startTime && endTime) {
			sql = `
            SELECT * FROM messages WHERE name LIKE '%${nickname}%' AND message LIKE '%${message}%' AND (date>='${startTime}' AND date < DATE_ADD('${endTime}',INTERVAL 1 DAY)) AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
            SELECT COUNT(*) AS total FROM messages WHERE name LIKE '%${nickname}%' AND message LIKE '%${message}%' AND (date>='${startTime}' AND date < DATE_ADD('${endTime}',INTERVAL 1 DAY)) AND is_delete = 0;
            `;
		} else {
			sql = `
            SELECT * FROM messages WHERE name LIKE '%${nickname}%' AND message LIKE '%${message}%' AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
            SELECT COUNT(*) AS total FROM messages WHERE name LIKE '%${nickname}%' AND message LIKE '%${message}%'  AND is_delete = 0;
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
	// 	const { nickname, message } = req.body;
	// 	const sql = `select * from messages where name like '%${nickname}%' and message like '%${message}%' and is_delete = 0 ORDER BY id DESC`;
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

	app.use("/admin/api/messages", router);
};
