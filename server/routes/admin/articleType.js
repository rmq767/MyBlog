module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块

	router.get("/", async (req, res) => {
		const sql = `select * from types where is_delete = 0 ORDER BY id desc`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				let arr = [];
				data.forEach((item) => {
					arr.push(item.type);
				});
				return res.send({ success: true, data: arr });
			}
		});
	});

	router.post("/", async (req, res) => {
		let typeArr = [];
		const sql1 = `select * from types where is_delete = 0 ORDER BY id desc`;
		await db.query(sql1, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				typeArr = data.map((v) => v.type);
				const sql2 = "insert into types (type) VALUES (?)";
				const { type } = req.body;
				// 获取数据库中没有的值
				let arr = [];
				type.forEach((item) => {
					if (!typeArr.includes(item)) {
						arr.push(item);
					}
				});
				// 如果有，存数据库
				if (arr.length) {
					arr.forEach(async (item) => {
						await db.query(sql2, [`${item}`], (err, data) => {
							if (err) {
								return res.send({
									message: err,
								});
							} else {
								return res.send({ success: true, data: data });
							}
						});
					});
				} else {
					return res.send({ message: "已有分类" });
				}
			}
		});
	});

	router.put("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `UPDATE types SET type=? WHERE id = '${id}'`;
		const { type } = req.body;
		await db.query(sql, [`${type}`], (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send({ success: true, data: data });
			}
		});
	});

	router.delete("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `UPDATE types SET is_delete = 1 WHERE id = '${id}'`;
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
		const { pageSize, currentPage, type } = req.query;
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		const sql = `
        SELECT * FROM types WHERE type LIKE '%${type}%' AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
        SELECT COUNT(*) AS total FROM types WHERE type LIKE '%${type}%' AND is_delete = 0;
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

	app.use("/admin/api/types", router);
};
