module.exports = (app) => {
	const express = require("express");
	const router = express.Router({
		mergeParams: true, //合并参数
	});
	const db = require("../../database/db.config"); //引入数据库封装模块
	const moment = require("moment");

	router.get("/", async (req, res) => {
		const count = 1;
		const createTime = moment().format("YYYY-MM-DD HH:mm:ss");
		const sql = `
        select sum(count) as pv from datas;
        insert into datas (count,createTime) VALUES (${count},'${createTime}')
        `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send({ success: true, data: data[0] });
			}
		});
	});

	app.use("/web/api/statistics", router);
};
