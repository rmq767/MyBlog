module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块

	router.get("/", async (req, res) => {
		const sql = `select * from themes where is_delete = 0 ORDER BY id desc`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				let arr = [];
				data.forEach((item) => {
					arr.push(item.theme);
				});
				return res.send({ success: true, data: arr });
			}
		});
	});

	router.post("/", async (req, res) => {
		let themeArr = [];
		const sql1 = `select * from themes where is_delete = 0 ORDER BY id desc`;
		await db.query(sql1, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				data.forEach((item) => {
					themeArr.push(item.theme);
				});
			}
		});

		const sql2 = "insert into themes (theme) VALUES (?)";
		const { theme } = req.body;
		// 获取数据库中没有的值
		let arr = [];
		theme.forEach((item) => {
			if (!themeArr.includes(item)) {
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
		}
	});

	router.put("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `UPDATE themes SET theme=? WHERE id = '${id}'`;
		const { theme } = req.body;
		await db.query(sql, [`${theme}`], (err, data) => {
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
		const sql = `delete from themes WHERE id = '${id}' `;
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
		const { pageSize, currentPage, theme } = req.query;
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		const sql = `
        SELECT * FROM themes WHERE theme LIKE '%${theme}%' AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
        SELECT COUNT(*) AS total FROM themes WHERE theme LIKE '%${theme}%' AND is_delete = 0;
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

	app.use("/admin/api/themes", router);
};
