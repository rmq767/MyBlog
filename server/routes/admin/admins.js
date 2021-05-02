module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块
	const bcrypt = require("bcryptjs");
	const validatAdmin = require("../../plugins/admin");

	router.get("/", async (req, res) => {
		const sql = `select * from admins where is_delete = 0`;
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

	router.put("/:id", async (req, res) => {
		const { errors, isValid } = validatAdmin(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(200).send({
				message: errors,
			});
		}
		const id = req.params.id;
		const sql = `update admins SET username=?,email=?,password=? WHERE id = '${id}'`;
		const { username, email, password } = req.body;
		const pwd = bcrypt.hashSync(password, 8);
		await db.query(
			sql,
			[`${username}`, `${email}`, `${pwd}`],
			(err, data) => {
				if (err) {
					return res.send({
						message: err,
					});
				} else {
					return res.send({ success: true, data: data });
				}
			}
		);
	});

	app.use("/admin/api/admins", router);
};
