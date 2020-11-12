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
				return res.send(data);
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
				return res.send(data);
			}
		});
	});

	/**
	 * @description 获取同主题文章
	 */
	router.get("/get/sametheme", async (req, res) => {
		const { theme } = req.query;
		const sql = `select id,title from articles where theme=${theme} is_delete = 0 ORDER BY clicks desc limit 5;
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

	/**
	 * @description 获取同分类文章
	 */
	router.get("/get/sametype", async (req, res) => {
		const { type } = req.query;
		const sql = `select id,title from articles where type like '%${type}%' is_delete = 0 ORDER BY clicks desc limit 5;
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

	//   router.get("/get/theme", async (req, res) => {
	//     const sql = `SELECT theme FROM articles WHERE theme !=' '`;
	//     await db.query(sql, (err, data) => {
	//       if (err) {
	//         return res.send({
	//           message: "数据库查询错误",
	//         });
	//       } else {
	//           let arr = []
	//           data.forEach((item)=>{
	//             arr.push(item.theme)
	//           })
	//           arr = arr.join(',').split(',')
	//           arr = [...new Set(arr)]
	//         return res.send(arr);
	//       }
	//     });
	//   });

	//   router.get("/get/type", async (req, res) => {
	//     const sql = `SELECT type FROM articles WHERE type !=' '`;
	//     await db.query(sql, (err, data) => {
	//       if (err) {
	//         return res.send({
	//           message: "数据库查询错误",
	//         });
	//       } else {
	//         let arr = []
	//         data.forEach((item)=>{
	//           arr.push(item.type)
	//         })
	//         arr = arr.join(',').split(',')
	//         arr = [...new Set(arr)]
	//       return res.send(arr);
	//       }
	//     });
	//   });

	router.get("/:id", async (req, res) => {
		const sql = `
    UPDATE articles SET clicks=(SELECT clicks FROM (SELECT * FROM articles WHERE id = ${req.params.id}) a1)+1 WHERE id = '${req.params.id}';
    select * from articles where id='${req.params.id}';
    SELECT id article_id,COUNT(*) comment_count FROM 
    (SELECT articles.id,comments.article_id FROM articles RIGHT JOIN comments ON comments.article_id = articles.id) t 
    GROUP BY article_id HAVING COUNT(article_id)>=1;
    `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				for (let m in data[1]) {
					for (let n in data[2]) {
						if (data[1][m].id == data[2][n].article_id) {
							data[1][m].comment_count = data[2][n].comment_count;
						}
					}
				}
				return res.send(data[1][0]);
			}
		});
	});

	router.get("/get/page", async (req, res) => {
		const { pageSize, currentPage } = req.query;
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		const sql = `select id,title,content_html,date,clicks from articles WHERE is_delete = 0 ORDER BY id desc limit ${start},${end};
    SELECT id article_id,COUNT(*) comment_count FROM 
    (SELECT articles.id,comments.article_id FROM articles RIGHT JOIN comments ON comments.article_id = articles.id) t 
    GROUP BY article_id HAVING COUNT(article_id)>=1;
     `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				for (let m in data[0]) {
					for (let n in data[1]) {
						if (data[0][m].id == data[1][n].article_id) {
							data[0][m].comment_count = data[1][n].comment_count;
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
				return res.send(data[0]);
			}
		});
	});

	router.get("/get/pre", async (req, res) => {
		const { id } = req.query;
		const sql = `SELECT id,title FROM articles WHERE  is_delete = 0 AND id>${id} ORDER BY id LIMIT 1 ;`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send(data[0]);
			}
		});
	});

	router.get("/get/next", async (req, res) => {
		const { id } = req.query;
		const sql = `SELECT id,title FROM articles WHERE  is_delete = 0 AND id<${id} ORDER BY id DESC LIMIT 1 ;`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: "数据库查询错误",
				});
			} else {
				return res.send(data[0]);
			}
		});
	});

	router.post("/get/search", async (req, res) => {
		const { search } = req.body;
		const sql = `select * from articles where (binary title like '%${search}%' or content_html like '%${search}%') and is_delete = 0 ORDER BY id DESC`;
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
				return res.send(data);
			}
		});
	});

	router.get("/search/theme", async (req, res) => {
		const { theme } = req.query;
		const sql = `SELECT * FROM articles WHERE theme LIKE '%${theme}%'`;
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
				return res.send(data);
			}
		});
	});

	router.get("/search/type", async (req, res) => {
		const { type } = req.query;
		const sql = `SELECT * FROM articles WHERE type LIKE '%${type}%'`;
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
				return res.send(data);
			}
		});
	});

	app.use("/web/api/articles", router);
};
