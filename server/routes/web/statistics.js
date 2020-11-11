module.exports = (app) => {
	const express = require("express");
	const router = express.Router({
		mergeParams: true, //合并参数
	});
	const db = require("../../database/db.config"); //引入数据库封装模块
	const moment = require("moment");

	router.get("/", async (req, res) => {
		const count = 1;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		const sql = `
        select sum(count) from datas;
        insert into datas (count,date) VALUES (${count},${date})
        `;
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

	// router.get("/addpv", async (req, res) => {
	// 	const count = 1;
	// 	const date = moment().format("YYYY-MM-DD HH:mm:ss");
	// 	const sql = "insert into datas (count,date) VALUES (?,?)";
	// 	await db.query(sql, [`${count}`, `${date}`], (err, data) => {
	// 		if (err) {
	// 			return res.send({
	// 				message: err,
	// 			});
	// 		} else {
	// 			return res.send(data);
	// 		}
	// 	});
	// });

	app.use("/web/api/statistics", router);
};
