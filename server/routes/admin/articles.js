module.exports = (app) => {
	const express = require("express");
	const router = express.Router({
		mergeParams: true, //合并参数
	});
	const db = require("../../database/db.config"); //引入数据库封装模块
	const moment = require("moment");
	const validateArticle = require("../../plugins/article"); //验证请求体
	// 获取全部文章
	router.get("/", async (req, res) => {
		const sql =
			"select * from articles where is_delete = 0 ORDER BY id desc";
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
	// 获取单个文章
	router.get("/:id", async (req, res) => {
		const sql = `
    select * from articles where id='${req.params.id};
    '`;
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
	// 新增文章
	router.post("/", async (req, res) => {
		const { title, content_html, content_md, type, theme } = req.body;
		const { errors, isValid } = validateArticle(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		// 查所有主题
		let themeArr = [];
		const themeSql = `SELECT theme FROM themes WHERE is_delete=0;`;
		await db.query(themeSql, async (err, data) => {
			if (err) {
				res.send({
					message: err,
				});
			} else {
				themeArr = data.map((v) => v.theme);
				if (!themeArr.includes(theme)) {
					let sql1 = "insert into themes (theme) VALUES (?)";
					await db.query(sql1, [`${theme}`], (err, data) => {
						if (err) {
							res.send({
								message: err,
							});
						} else {
							// res.send({ success: true, data: data });
						}
					});
				} else {
					// res.send({ message: "已有主题" });
				}
			}
		});
		// 查所有分类
		let typeArr = [];
		const typeSql = `SELECT type FROM types WHERE is_delete=0;`;
		await db.query(typeSql, (err, data) => {
			if (err) {
				res.send({
					message: err,
				});
			} else {
				typeArr = data.map((v) => v.type);
				let arr = [];
				type.forEach((item) => {
					if (!typeArr.includes(item)) {
						arr.push(item);
					}
				});
				// 如果有，存数据库
				if (arr.length) {
					arr.forEach(async (item) => {
						let sql2 = "insert into types (type) VALUES (?)";
						await db.query(sql2, [`${item}`], (err, data) => {
							if (err) {
								res.send({
									message: err,
								});
							} else {
								// res.send({ success: true, data: data });
							}
						});
					});
				} else {
					// res.send({ message: "已有分类" });
				}
			}
		});

		const sql =
			"insert into articles (title, content_html,content_md,date,type,theme) VALUES (?,?,?,?,?,?)";
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		await db.query(
			sql,
			[
				`${title}`,
				`${content_html}`,
				`${content_md}`,
				`${date}`,
				`${type}`,
				`${theme}`,
			],
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
	// 编辑修改文章
	router.put("/:id", async (req, res) => {
		const { errors, isValid } = validateArticle(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(500).send({
				message: errors,
			});
		}
		const id = req.params.id;
		const sql = `UPDATE articles SET title = ?,content_html=?,content_md=?,date=?,type=?,theme=? WHERE id = '${id}'`;
		const { title, content_html, content_md, type, theme } = req.body;
		const date = moment().format("YYYY-MM-DD HH:mm:ss");
		await db.query(
			sql,
			[
				`${title}`,
				`${content_html}`,
				`${content_md}`,
				`${date}`,
				`${type}`,
				`${theme}`,
			],
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
	// 删除文章
	router.delete("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `UPDATE articles SET is_delete = 1 WHERE id = '${id}' `;
		await db.query(sql, [], (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				return res.send({ success: true, data: data });
			}
		});
	});
	// 文章分页
	router.get("/get/page", async (req, res) => {
		const {
			pageSize,
			currentPage,
			title,
			content,
			theme,
			type,
			startTime,
			endTime,
		} = req.query;
		let sql;
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		if (startTime && endTime) {
			sql = `
            SELECT * FROM articles WHERE title LIKE '%${title}%' AND content_md LIKE '%${content}%' AND theme LIKE '%${theme}%' AND type LIKE '%${type}%' AND (date>='${startTime}' AND date<DATE_ADD('${endTime}',INTERVAL 1 DAY)) AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
            SELECT COUNT(*) AS total FROM articles WHERE title LIKE '%${title}%' AND content_md LIKE '%${content}%' AND theme LIKE '%${theme}%' AND type LIKE '%${type}%' AND (date>='${startTime}' AND date<DATE_ADD('${endTime}',INTERVAL 1 DAY)) AND is_delete = 0;
            `;
		} else {
			sql = `
            SELECT * FROM articles WHERE title LIKE '%${title}%' AND content_md LIKE '%${content}%' AND theme LIKE '%${theme}%' AND type LIKE '%${type}%' AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
            SELECT COUNT(*) AS total FROM articles WHERE title LIKE '%${title}%' AND content_md LIKE '%${content}%' AND theme LIKE '%${theme}%' AND type LIKE '%${type}%' AND is_delete = 0;
            `;
		}
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
	// 文章搜索
	// router.post("/get/search", async (req, res) => {
	// 	const { title, content, theme, type, currentPage, pageSize } = req.body;
	// 	const start = (Number(currentPage) - 1) * Number(pageSize);
	// 	const end = Number(pageSize);
	// 	const sql1 = `select count(*) as total from articles where title like "%${title}%" and content_md like "%${content}%" and theme like "%${theme}%" and type like "%${type}%" and is_delete = 0`;
	// 	const sql2 = `select * from articles where title like "%${title}%" and content_md like "%${content}%" and theme like "%${theme}%" and type like "%${type}%" and is_delete = 0 ORDER BY id DESC limit ${start},${end}`;
	// 	let total;
	// 	await db.query(sql1, (err, data) => {
	// 		if (err) {
	// 			return res.send({
	// 				message: err,
	// 			});
	// 		} else {
	// 			total = data.total;
	// 		}
	// 	});

	// 	await db.query(sql2, (err, data) => {
	// 		if (err) {
	// 			return res.send({
	// 				message: err,
	// 			});
	// 		} else {
	// 			data["total"] = total;
	// 			return res.send({ success: true, data: data });
	// 		}
	// 	});
	// });
	// 获取文章主题
	router.get("/get/theme", async (req, res) => {
		const sql =
			"select theme from articles where is_delete = 0 ORDER BY id desc";
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				let response = [];
				data.forEach((item) => {
					if (item.theme) {
						response.push(item.theme);
					}
				});
				response = response.toString();
				response = response.split(",");
				return res.send(response);
			}
		});
	});
	// 获取文章分类
	router.get("/get/type", async (req, res) => {
		const sql =
			"select type from articles where is_delete = 0 ORDER BY id desc";
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				let response = [];
				data.forEach((item) => {
					if (item.type) {
						response.push(item.type);
					}
				});
				response = response.toString();
				response = response.split(",");
				return res.send(response);
			}
		});
	});

	app.use("/admin/api/articles", router);
};
