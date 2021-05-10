module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const db = require("../../database/db.config"); //引入数据库封装模块
	const validateCommentReply = require("../../plugins/commentReply");
	const moment = require("moment");

	router.get("/", async (req, res) => {
		const sql = `select commentreply.id,i_name,r_name,c_reply,commentreply.createTime
    from commentreply,comments 
    where commentreply.comment_id = comments.id and commentreply.is_delete = 0 ORDER BY commentreply.id desc`;
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
		const sql = `select * from commentreply where id='${req.params.id}'`;
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

	router.put("/:id", async (req, res) => {
		const { errors, isValid } = validateCommentReply(req.body);
		// 判断是否验证通过
		if (!isValid) {
			return res.status(200).send({
				message: errors,
			});
		}
		const id = req.params.id;
		const sql = `UPDATE commentreply SET i_name=?,r_name=?,c_reply=?,comment_id=?,article_id=?,i_email=?,r_email=?,is_check=? WHERE id = '${id}'`;
		const {
			i_name,
			i_email,
			r_name,
			r_email,
			c_reply,
			comment_id,
			article_id,
			is_check,
		} = req.body;
		await db.query(
			sql,
			[
				`${i_name}`,
				`${r_name}`,
				`${c_reply}`,
				`${comment_id}`,
				`${article_id}`,
				`${i_email}`,
				`${r_email}`,
				`${is_check}`,
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

	router.delete("/:id", async (req, res) => {
		const id = req.params.id;
		const sql = `UPDATE commentreply SET is_delete = 1 WHERE id = '${id}'`;
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

	router.get("/get/page", async (req, res) => {
		const {
			pageSize,
			currentPage,
			i_name,
			i_email,
			r_name,
			r_email,
			c_reply,
			article_id,
			startTime,
			endTime,
			is_check,
		} = req.query;
		// 审核条件
		let isCheck = "";
		switch (Number(is_check)) {
			case 1:
				isCheck = "AND is_check=1";
				break;
			case 0:
				isCheck = "AND is_check=0";
				break;
			default:
				break;
		}
		// 文章条件
		let articleId1 = "";
		let articleId2 = "";
		if (article_id) {
			articleId1 = `AND a.article_id=${article_id} AND b.id=${article_id}`;
			articleId2 = `AND article_id=${article_id}`;
		} else {
			articleId1 = "AND a.article_id=b.id";
			articleId2 = "";
		}
		// 时间条件
		let time1 = "";
		let time2 = "";
		if (startTime && endTime) {
			time1 = `AND (a.createTime>='${startTime}' AND a.createTime < DATE_ADD('${endTime}',INTERVAL 1 DAY))`;
			time2 = `AND (createTime>='${startTime}' AND createTime < DATE_ADD('${endTime}',INTERVAL 1 DAY))`;
		}
		const start = (Number(currentPage) - 1) * Number(pageSize);
		const end = Number(pageSize);
		let sql = `
        SELECT a.*,b.title FROM commentreply a,articles b WHERE a.i_name LIKE '%${i_name}%' AND a.r_name LIKE '%${r_name}%' AND a.i_email LIKE '%${i_email}%' AND a.r_email LIKE '%${r_email}%' AND a.c_reply LIKE '%${c_reply}%' ${articleId1} ${time1} ${isCheck} AND a.is_delete = 0 ORDER BY id DESC LIMIT ${start},${end};
        SELECT COUNT(*) AS total FROM commentreply WHERE i_name LIKE '%${i_name}%' AND r_name LIKE '%${r_name}%' AND i_email LIKE '%${i_email}%' AND r_email LIKE '%${r_email}%' AND c_reply LIKE '%${c_reply}%' ${articleId2} ${time2} ${isCheck} AND is_delete = 0;
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

	router.put("/put/status", async (req, res) => {
		const { is_check, id } = req.body;
		const sql = `UPDATE commentreply SET is_check = ${is_check} WHERE id = ${id} AND is_delete = 0;`;
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

	app.use("/admin/api/commentreply", router);
};
