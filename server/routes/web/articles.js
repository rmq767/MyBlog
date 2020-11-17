module.exports = (app) => {
	const express = require("express");
	const router = express.Router({
		mergeParams: true, //合并参数
	});
	const db = require("../../database/db.config"); //引入数据库封装模块

	/**
	 * @description 获取文章
	 */
	router.get("/", async (req, res) => {
		const sql = `select * from articles where is_delete = 0 ORDER BY id desc;`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				data.map(
					(v) =>
						(v.content_html = v.content_html.replace(
							/<[^<>]+>/g,
							""
						))
				);
				return res.send({ success: true, data: data });
			}
		});
	});

	/**
	 * @description 获取热门文章
	 */
	router.get("/get/hot", async (req, res) => {
		const sql = `select id,title,clicks from articles where is_delete = 0 ORDER BY clicks desc limit 5;
    `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send({ success: true, data: data });
			}
		});
	});

	/**
	 * @description 获取同主题文章
	 */
	router.get("/get/sametheme", async (req, res) => {
		const { theme } = req.query;
		const sql = `select id,title from articles where theme='${theme}' and is_delete = 0 ORDER BY clicks desc limit 3;
    `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send({ success: true, data: data });
			}
		});
	});

	/**
	 * @description 获取同分类文章
	 */
	router.get("/get/sametype", async (req, res) => {
		const { type } = req.query;
		const type1 = type.split(",")[0];
		const sql = `select id,title from articles where type like '%${type1}%' and is_delete = 0 ORDER BY clicks desc limit 3;
    `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send({ success: true, data: data });
			}
		});
	});

	router.get("/:id", async (req, res) => {
		const sql = `
    UPDATE articles SET clicks=(SELECT clicks FROM (SELECT * FROM articles WHERE id = ${req.params.id}) a1)+1 WHERE id = '${req.params.id}';
    select * from articles where id='${req.params.id}';
    SELECT e.id AS article_id,COUNT(*) as comment_count from articles e LEFT OUTER JOIN comments d on e.id = d.article_id GROUP BY e.id HAVING COUNT(article_id)>=1;
    SELECT e.id AS article_id,COUNT(*) as commentreply_count from articles e LEFT OUTER JOIN commentreply d on e.id = d.article_id GROUP BY e.id HAVING COUNT(article_id)>=1;
    `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				for (let m in data[1]) {
					for (let n in data[2]) {
						for (let y in data[3]) {
							if (
								data[1][m].id === data[2][n].article_id &&
								data[0][m].id != data[3][y].article_id
							) {
								data[1][m].comment_count =
									data[2][n].comment_count;
							} else if (
								data[1][m].id === data[2][n].article_id &&
								data[1][m].id === data[3][y].article_id
							) {
								data[1][m].comment_count =
									data[2][n].comment_count +
									data[3][y].commentreply_count;
							}
						}
					}
				}
				return res.send({ success: true, data: data[1][0] });
			}
		});
	});

	router.get("/get/page", async (req, res) => {
		const { size, page, titleContent, theme, type } = req.query;
		const start = (Number(page) - 1) * Number(size);
		const end = Number(size);
		const sql = `
        SELECT * FROM articles WHERE title LIKE '%${titleContent}%' AND content_md LIKE '%${titleContent}%' AND theme LIKE '%${theme}%' AND type LIKE '%${type}%' AND is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
        SELECT e.id AS article_id,COUNT(*) as comment_count from articles e LEFT OUTER JOIN comments d on e.id = d.article_id GROUP BY e.id HAVING COUNT(article_id)>=1;
        SELECT e.id AS article_id,COUNT(*) as commentreply_count from articles e LEFT OUTER JOIN commentreply d on e.id = d.article_id GROUP BY e.id HAVING COUNT(article_id)>=1;
        SELECT COUNT(*) AS article_count FROM articles WHERE title LIKE '%${titleContent}%' AND content_md LIKE '%${titleContent}%' AND theme LIKE '%${theme}%' AND type LIKE '%${type}%' AND is_delete = 0;
     `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				for (let m in data[0]) {
					for (let n in data[1]) {
						for (let y in data[2]) {
							if (
								data[0][m].id === data[1][n].article_id &&
								data[0][m].id != data[2][y].article_id
							) {
								data[0][m].comment_count =
									data[1][n].comment_count;
							} else if (
								data[0][m].id === data[1][n].article_id &&
								data[0][m].id === data[2][y].article_id
							) {
								data[0][m].comment_count =
									data[1][n].comment_count +
									data[2][y].commentreply_count;
							}
						}
					}
				}
				data[0].map(
					(v) =>
						(v.content_html = v.content_html.replace(
							/<[^<>]+>/g,
							""
						))
				);
				return res.send({
					success: true,
					data: data[0],
					count: data[3],
				});
			}
		});
	});

	router.get("/get/nextpre", async (req, res) => {
		const { id } = req.query;
		const sql = `
        select * from articles where id in
        (select
        case 
        when SIGN(id-${id})>0 THEN MIN(id)
        when SIGN(id-${id})<0 THEN MAX(id)
        ELSE id
        end 
        from articles
        where id !=${id}
        AND is_delete = 0
        GROUP BY SIGN(id-${id})
        ORDER BY SIGN(id-${id})
        )
        ORDER BY id
        `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send({ success: true, data: data });
			}
		});
	});

	// router.get("/get/pre", async (req, res) => {
	// 	const { id } = req.query;
	// 	const sql = `SELECT id,title FROM articles WHERE  is_delete = 0 AND id>${id} ORDER BY id LIMIT 1 ;`;
	// 	await db.query(sql, (err, data) => {
	// 		if (err) {
	// 			return res.send({
	// 				message: "数据库查询错误",
	// 			});
	// 		} else {
	// 			return res.send(data[0]);
	// 		}
	// 	});
	// });

	// router.get("/get/next", async (req, res) => {
	// 	const { id } = req.query;
	// 	const sql = `SELECT id,title FROM articles WHERE  is_delete = 0 AND id<${id} ORDER BY id DESC LIMIT 1 ;`;
	// 	await db.query(sql, (err, data) => {
	// 		if (err) {
	// 			return res.send({
	// 				message: "数据库查询错误",
	// 			});
	// 		} else {
	// 			return res.send(data[0]);
	// 		}
	// 	});
	// });

	// router.post("/get/search", async (req, res) => {
	// 	const { search } = req.body;
	// 	const sql = `select * from articles where (binary title like '%${search}%' or content_html like '%${search}%') and is_delete = 0 ORDER BY id DESC`;
	// 	await db.query(sql, (err, data) => {
	// 		if (err) {
	// 			return res.send({
	// 				message: "数据库查询错误",
	// 			});
	// 		} else {
	// 			data.map(
	// 				(v) =>
	// 					(v.content_html = v.content_html.replace(
	// 						/<[^<>]+>/g,
	// 						""
	// 					))
	// 			);
	// 			return res.send({success:true,data});
	// 		}
	// 	});
	// });

	// router.get("/search/theme", async (req, res) => {
	// 	const { theme } = req.query;
	// 	const sql = `SELECT * FROM articles WHERE theme LIKE '%${theme}%'`;
	// 	await db.query(sql, (err, data) => {
	// 		if (err) {
	// 			return res.send({
	// 				message: "数据库查询错误",
	// 			});
	// 		} else {
	// 			data.map(
	// 				(v) =>
	// 					(v.content_html = v.content_html.replace(
	// 						/<[^<>]+>/g,
	// 						""
	// 					))
	// 			);
	// 			return res.send({success:true,data});
	// 		}
	// 	});
	// });

	// router.get("/search/type", async (req, res) => {
	// 	const { type } = req.query;
	// 	const sql = `SELECT * FROM articles WHERE type LIKE '%${type}%'`;
	// 	await db.query(sql, (err, data) => {
	// 		if (err) {
	// 			return res.send({
	// 				message: "数据库查询错误",
	// 			});
	// 		} else {
	// 			data.map(
	// 				(v) =>
	// 					(v.content_html = v.content_html.replace(
	// 						/<[^<>]+>/g,
	// 						""
	// 					))
	// 			);
	// 			return res.send({success:true,data});
	// 		}
	// 	});
	// });

	app.use("/web/api/articles", router);
};
