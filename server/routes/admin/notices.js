module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块
	const moment = require("moment");
	const validateNotice = require("../../plugins/notice");

	router.get("/", async (req, res) => {
		const sql = `select * from notices where is_delete = 0 ORDER BY id desc`;
		await db.query(sql, (err, data) => {
			if (err) {
				res.send({
					message: err,
				});
			} else {
				res.send({ success: true, data: data });
			}
		});
	});

	router.get("/:id", async (req, res) => {
		const sql = `select * from notices where id='${req.params.id}'`;
		await db.query(sql, (err, data) => {
			if (err) {
				res.send({
					message: err,
				});
			} else {
				res.send({ data: data[0] });
			}
		});
	});

	router.post("/", async (req, res) => {
		const { errors, isValid } = validateNotice(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		const sql = "insert into notices ( title,notice,date) VALUES (?,?,?)";
		const { title, notice } = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		await db.query(
			sql,
			[`${title}`, `${notice}`, `${date}`],
			(err, data) => {
				if (err) {
					res.send({
						message: err,
					});
				} else {
					res.send({ success: true, data: data });
				}
			}
		);
	});

	router.put("/:id", async (req, res) => {
		const { errors, isValid } = validateNotice(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		const id = req.params.id;
		const sql = `UPDATE notices SET title=?,notice=?,date=? WHERE id = '${id}'`;
		const { title, notice } = req.body;
		await db.query(
			sql,
			[`${title}`, `${notice}`, `${date}`],
			(err, data) => {
				if (err) {
					res.send({
						message: err,
					});
				} else {
					res.send({ success: true, data: data });
				}
			}
		);
	});

	router.delete("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `UPDATE notices SET is_delete = 1 WHERE id = '${id}' `;
		await db.query(sql, (err, data) => {
			if (err) {
				res.send({
					message: err,
				});
			} else {
				res.send({ success: true, data: data });
			}
		});
	});

	router.get("/get/page", async (req, res) => {
		const {
			pageSize,
			currentPage,
			title,
			notice,
			startTime,
			endTime,
		} = req.query;
		let sql;
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		if (startTime && endTime) {
			sql = `
            SELECT * FROM notices WHERE title LIKE '%${title}%' AND notice LIKE '%${notice}%' AND (date>='${startTime}' AND date < DATE_ADD('${endTime}',INTERVAL 1 DAY)) AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
            SELECT COUNT(*) AS total FROM notices WHERE title LIKE '%${title}%' AND notice LIKE '%${notice}%' AND (date>='${startTime}' AND date < DATE_ADD('${endTime}',INTERVAL 1 DAY)) AND is_delete = 0;
            `;
		} else {
			sql = `
            SELECT * FROM notices WHERE title LIKE '%${title}%' AND notice LIKE '%${notice}%' AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
            SELECT COUNT(*) AS total FROM notices WHERE title LIKE '%${title}%' AND notice LIKE '%${notice}%' AND is_delete = 0;
            `;
		}
		await db.query(sql, (err, data) => {
			if (err) {
				res.send({
					message: err,
				});
			} else {
				res.send({ success: true, data: data[0], total: data[1] });
			}
		});
	});

	// router.post("/get/search", async (req, res) => {
	// 	const { title, notice } = req.body;
	// 	const sql = `select * from notices where title like '%${title}%' and notice like '%${notice}%' and is_delete = 0 ORDER BY id DESC`;
	// 	await db.query(sql, (err, data) => {
	// 		if (err) {
	// 			res.send({
	// 				message: err,
	// 			});
	// 		} else {
	// 			res.send({ success: true, data: data });
	// 		}
	// 	});
	// });

	app.use("/admin/api/notices", router);
};
