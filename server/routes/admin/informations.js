module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块

	router.get("/", async (req, res) => {
		const sql = `select * from informations where is_delete = 0 ORDER BY id desc`;
		await db.query(sql, (err, data) => {
			if (err) {
				res.send({
					message: "数据库查询错误",
				});
			} else {
				res.send({ success: true, data: data });
			}
		});
	});

	router.put("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `UPDATE informations SET avatar=?,profile=?,qq=?,wechat=?,github=?,csdn=?,desc=? WHERE id = ${id}`;
		const { avatar, profile, qq, wechat, github, csdn, desc } = req.body;
		await db.query(
			sql,
			[
				`${avatar}`,
				`${profile}`,
				`${qq}`,
				`${wechat}`,
				`${github}`,
				`${csdn}`,
				`${desc}`,
			],
			(err, data) => {
				if (err) {
					res.send({
						message: "数据库查询错误",
					});
				} else {
					res.send({ success: true, data: data });
				}
			}
		);
	});

	app.use("/admin/api/informations", router);
};
