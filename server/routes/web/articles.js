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
		const sql = `select * from articles where is_delete = 0 ORDER BY isTop DESC,createTime DESC;`;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
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
					message: err,
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
		const { theme, id } = req.query;
		const sql = `select id,title from articles where theme='${theme}' and id != '${id}' and is_delete = 0 ORDER BY clicks desc limit 3;`;
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

	/**
	 * @description 获取同分类文章
	 */
	router.get("/get/sametype", async (req, res) => {
		const { type, id } = req.query;
		const type1 = type.split(",")[0];
		const sql = `select id,title from articles where type like '%${type1}%' and id != '${id}' and is_delete = 0 ORDER BY clicks desc limit 3;
    `;
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

	router.get("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `
    UPDATE articles SET clicks=(SELECT clicks FROM (SELECT * FROM articles WHERE id = ${id}) a1)+1 WHERE id = '${id}';
    select * from articles where id='${id}';
    SELECT e.id AS article_id,COUNT(*) as comment_count from articles e LEFT OUTER JOIN comments d on e.id = d.article_id WHERE d.is_delete = 0 AND d.is_check = 1 AND d.article_id=${id} GROUP BY e.id HAVING COUNT(article_id)>=1;
    SELECT e.id AS article_id,COUNT(*) as commentreply_count from articles e LEFT OUTER JOIN commentreply d on e.id = d.article_id WHERE d.is_delete = 0 AND d.is_check = 1 AND d.article_id=${id} GROUP BY e.id HAVING COUNT(article_id)>=1;
    `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				for (let m in data[1]) {
					for (let n in data[2]) {
						for (let y in data[3]) {
							if (
								data[2][n].comment_count &&
								!data[3][y].commentreply_count
							) {
								data[1][m].comment_count =
									data[2][n].comment_count;
							}
							if (
								data[2][n].comment_count &&
								data[3][y].commentreply_count
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
        SELECT * FROM articles WHERE ((title LIKE '%${titleContent}%' OR content_md LIKE '%${titleContent}%') AND theme LIKE '%${theme}%' AND type LIKE '%${type}%' AND is_delete = 0) ORDER BY isTop DESC,createTime DESC LIMIT ${start},${end};
        SELECT e.id AS article_id,COUNT(*) as comment_count from articles e LEFT OUTER JOIN comments d on e.id = d.article_id WHERE d.is_delete = 0 AND d.is_check = 1 GROUP BY e.id HAVING COUNT(article_id)>=1;
        SELECT e.id AS article_id,COUNT(*) as commentreply_count from articles e LEFT OUTER JOIN commentreply d on e.id = d.article_id WHERE d.is_delete = 0 AND d.is_check = 1 GROUP BY e.id HAVING COUNT(article_id)>=1;
        SELECT COUNT(*) AS article_count FROM articles WHERE ((title LIKE '%${titleContent}%' OR content_md LIKE '%${titleContent}%') AND theme LIKE '%${theme}%' AND type LIKE '%${type}%' AND is_delete = 0);
     `;
		await db.query(sql, (err, data) => {
			if (err) {
				return res.send({
					message: err,
				});
			} else {
				for (let m in data[0]) {
					for (let n in data[1]) {
						for (let y in data[2]) {
							// if (
							// 	data[0][m].id === data[1][n].article_id &&
							// 	data[1][n].article_id != data[2][y].article_id
							// ) {
							// 	data[0][m].comment_count =
							// 		data[1][n].comment_count;
							// }
							if (data[0][m].id === data[1][n].article_id) {
								data[0][m].comment_count1 =
									data[1][n].comment_count;
							}
							if (
								data[0][m].id === data[1][n].article_id &&
								data[0][m].id === data[2][y].article_id &&
								data[1][n].article_id === data[2][y].article_id
							) {
								data[0][m].comment_count2 =
									data[1][n].comment_count +
									data[2][y].commentreply_count;
							}
						}
					}
				}
				data[0].map((v) => {
					v.content_html = v.content_html
						.replace(/<[^<>]+>/g, "")
						.substring(0, 700);
					v.content_md = v.content_md.substring(0, 200);
				});
				return res.send({
					success: true,
					data: data[0],
					count: data[3],
				});
			}
		});
	});

	app.use("/web/api/articles", router);
};
