module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块
	const validateInformation = require("../../plugins/information");

	router.get("/", async (req, res) => {
		const sql = `select * from informations ORDER BY id desc`;
		await db.query(sql, (err, data) => {
			if (err) {
				res.send({
					message: err,
				});
			} else {
				res.send({ success: true, data: data });
			}
		});
	});

	router.put("/:id", async (req, res) => {
		const { errors, isValid } = validateInformation(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(200).send({
				message: errors,
			});
		}
		const id = req.params.id;
		const sql = `UPDATE informations SET avatar=?,profile=?,qq=?,wechat=?,github=?,csdn=?,description=?,qqQrCode=?,wechatQrCode=? WHERE id = '${id}'`;
		const {
			avatar,
			profile,
			qq,
			wechat,
			github,
			csdn,
			description,
			qqQrCode,
			wechatQrCode,
		} = req.body;
		await db.query(
			sql,
			[
				`${avatar}`,
				`${profile}`,
				`${qq}`,
				`${wechat}`,
				`${github}`,
				`${csdn}`,
				`${description}`,
				`${qqQrCode}`,
				`${wechatQrCode}`,
			],
			(err, data) => {
				if (err) {
					res.send({
						message: err,
					});
				} else {
					res.send({ success: true, data: data });
				}
			}
		);
	});

	app.use("/admin/api/informations", router);
};
