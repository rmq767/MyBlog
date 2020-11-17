module.exports = (app) => {
	const express = require("express");
	const router = express.Router({
		mergeParams: true, //合并参数
	});
	const db = require("../../database/db.config"); //引入数据库封装模块

	router.get("/", async (req, res) => {
		const sql = `select * from notices where is_delete = 0 ORDER BY id desc limit 3 `;
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

	app.use("/web/api/notices", router);
};
