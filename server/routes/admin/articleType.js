module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块

	router.get("/", async (req, res) => {
		const sql = `select * from types where is_delete = 0 ORDER BY id desc`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				let arr = [];
				data.forEach((item) => {
					arr.push(item.type);
				});
				return res.send(arr);
			}
		});
	});

	router.post("/", async (req, res) => {
		const sql = "insert into types (type) VALUES (?)";
		const { type } = req.body;
		await db.query(sql, [`${type}`], (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send(data);
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
					message: "数据库查询错误",
				});
			} else {
				return res.send(data);
			}
		});
	});

	router.delete("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `delete from types WHERE id = '${id}' `;
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
		const sql = `select * from types WHERE is_delete = 0 ORDER BY id DESC limit ${start},${end}`;
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
		const { type } = req.body;
		const sql = `select * from types where  type like '%${type}%' and is_delete = 0 ORDER BY id DESC`;
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

	app.use("/admin/api/types", router);
};
