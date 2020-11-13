module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块

	router.get("/", async (req, res) => {
		const sql = `select commentreply.id,i_name,r_name,c_reply,commentreply.date
    from commentreply,comments 
    where commentreply.comment_id = comments.id and commentreply.is_delete = 0 ORDER BY commentreply.id desc`;
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

	router.delete("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `delete from commentreply WHERE id = '${id}'`;
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

	router.get("/get/page", async (req, res) => {
		const { pageSize, currentPage } = req.query;

		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		const sql = `
    select commentreply.id,i_name,r_name,c_reply,commentreply.date
    from commentreply,comments 
    where commentreply.comment_id = comments.id and commentreply.is_delete = 0 ORDER BY commentreply.id desc limit ${start},${end}`;
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

	router.post("/get/search", async (req, res) => {
		const { search } = req.body;
		const sql = `select * from commentreply where (binary i_name like '%${search}%' or r_name like '%${search}%') and is_delete = 0`;
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

	app.use("/admin/api/commentreply", router);
};
