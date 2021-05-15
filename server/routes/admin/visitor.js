module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块

	router.put("/put/status", async (req, res) => {
		const { status, id } = req.body;
		const sql = `UPDATE visitor SET is_delete = '${status}' WHERE id = ${id} ;`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send({ success: true });
			}
		});
	});

	router.get("/get/page", async (req, res) => {
		const {
			pageSize,
			currentPage,
			name,
			email,
			startTime,
			endTime,
			status,
		} = req.query;
		// 审核条件
		let isDelete = "";
		switch (Number(status)) {
			case 1:
				isDelete = "AND is_delete=1";
				break;
			case 0:
				isDelete = "AND is_delete=0";
				break;
			default:
				break;
		}
		// 时间条件
		let time = "";
		if (startTime && endTime) {
			time = `AND (createTime>='${startTime}' AND createTime < DATE_ADD('${endTime}',INTERVAL 1 DAY))`;
		}
		// 分页
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);

		const sql = `
        SELECT * FROM visitor WHERE name LIKE '%${name}%' AND email LIKE '%${email}%' ${isDelete} ${time} ORDER BY id DESC LIMIT ${start},${end};
        SELECT COUNT(*) AS total FROM visitor WHERE name LIKE '%${name}%' AND email LIKE '%${email}%' ${isDelete} ${time};
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

	app.use("/admin/api/visitor", router);
};
