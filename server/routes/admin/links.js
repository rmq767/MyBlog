module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块
	const moment = require("moment");
	const validateLink = require("../../plugins/link");

	router.get("/", async (req, res) => {
		const sql = `select * from links where is_delete = 0 ORDER BY id desc`;
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

	router.get("/get/type", async (req, res) => {
		const sql = `SELECT DISTINCT(type) FROM links WHERE is_delete=0;`;
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
		const sql = `select * from links where id='${req.params.id}'`;
		await db.query(sql, (err, data) => {
			if (err) {
				res.send({
					message: err,
				});
			} else {
				res.send({ success: true, data: data[0] });
			}
		});
	});

	router.post("/", async (req, res) => {
		const { errors, isValid } = validateLink(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(200).send({
				message: errors,
			});
		}
		const sql =
			"insert into links (title,description,link,image,type,createTime,updateTime) VALUES (?,?,?,?,?,?,?)";
		const { title, description, link, image, type } = req.body;
		const createTime = moment().format("YYYY-MM-DD HH:mm:ss");
		await db.query(
			sql,
			[
				`${title}`,
				`${description}`,
				`${link}`,
				`${image}`,
				`${type}`,
				`${createTime}`,
				`${createTime}`,
			],
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
		const { errors, isValid } = validateLink(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(200).send({
				message: errors,
			});
		}
		const id = req.params.id;
		const updateTime = moment().format("YYYY-MM-DD HH:mm:ss");
		const sql = `UPDATE links SET title=?,description=?,link=?,image=?,type=?,updateTime=? WHERE id = '${id}'`;
		const { title, description, link, image, type } = req.body;
		await db.query(
			sql,
			[
				`${title}`,
				`${description}`,
				`${link}`,
				`${image}`,
				`${type}`,
				`${updateTime}`,
			],
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
		const sql = `UPDATE links SET is_delete = 1 WHERE id = '${id}' `;
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
		const { pageSize, currentPage, title, type } = req.query;
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		const sql = `
        SELECT * FROM links WHERE title LIKE '%${title}%' AND type LIKE '%${type}%' AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
        SELECT COUNT(*) AS total FROM links WHERE title LIKE '%${title}%' AND type LIKE '%${type}%' AND is_delete = 0;
        `;
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

	app.use("/admin/api/links", router);
};
