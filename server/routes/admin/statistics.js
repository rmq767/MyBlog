module.exports = (app) => {
	const express = require("express");
	const router = express.Router({
		mergeParams: true, //合并参数
	});
	const db = require("../../database/db.config"); //引入数据库封装模块

	router.get("/", async (req, res) => {
		const sql = `
        SELECT SUM(clicks) AS readCount FROM articles WHERE is_delete = 0;
        SELECT COUNT(*) AS messageCount FROM messages WHERE is_delete = 0;
        SELECT SUM(count) AS pv FROM datas;
        `;
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

	router.get("/read", async (req, res) => {
		const sql = `
        select * from articles where is_delete = 0 order by clicks desc limit 10;
        `;
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

	router.get("/pv", async (req, res) => {
		const sql = `
        select count(*) as count,substr(t.date,1,10) as date  from datas t group by substr(t.date,1,10) ORDER BY substr(t.date,1,10) ASC LIMIT 10
        `;
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

	app.use("/admin/api/statistics", router);
};
