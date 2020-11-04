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
					message: "数据库查询错误",
				});
			} else {
				return res.send(data);
			}
		});
	});

	router.get("/:id", async (req, res) => {
		const sql = `select * from messages where id='${req.params.id}'`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send(data[0]);
			}
		});
	});

	router.post("/", async (req, res) => {
		const { errors, isValid } = validateMessage(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		const sql =
			"insert into messages (name,message,background,posTop,posLeft,date) VALUES (?,?,?,?,?,?)";
		const { name, message, background, top, left } = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		await db.query(
			sql,
			[
				`${name}`,
				`${message}`,
				`${background}`,
				`${top}`,
				`${left}`,
				`${date}`,
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
		const { name, message, background, top, left } = req.body;
		await db.query(
			sql,
			[
				`${name}`,
				`${message}`,
				`${background}`,
				`${top}`,
				`${left}`,
				`${date}`,
			],
			(err, data) => {
				if (err) {
					return res.send({
						message: "数据库查询错误",
					});
				} else {
					return res.send(data);
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
					message: "数据库查询错误",
				});
			} else {
				return res.send(data);
			}
		});
	});

	router.get("/get/page", async (req, res) => {
		const { pageSize, currentPage } = req.query;

		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		const sql = `select * from messages WHERE is_delete = 0 ORDER BY id DESC limit ${start},${end}`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send(data);
			}
		});
	});

	router.post("/get/search", async (req, res) => {
		const { nickname, message } = req.body;
		const sql = `select * from messages where name like '%${nickname}%' and message like '%${message}%') and is_delete = 0 ORDER BY id DESC`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send(data);
			}
		});
	});

	app.use("/admin/api/messages", router);
};
