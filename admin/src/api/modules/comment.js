import http from "../../http";

export default {
	/**
	 * @description 获取评论列表
	 */
	getCommentList() {
		return http.get("/comments");
	},
	/**
	 * @description 删除评论
	 */
	deleteComment(id) {
		return http.delete(`/comments/${id}`);
	},
	/**
	 * @description 评论分页
	 */
	pagination(params) {
		return http.get(
			`/comments/get/page?pageSize=${params.pageSize}&currentPage=${
				params.currentPage
			}&nickname=${params.nickname}&comment=${
				params.comment
			}&article_id=${params.article_id || ""}`
		);
	},
	// /**
	//  * @description 评论搜索
	//  */
	// searchComment(params) {
	// 	return http.post("/comments/get/search", params);
	// },
	/**
	 * @description 添加评论
	 */
	addComment(params) {
		return http.post("/comments", params);
	},
	/**
	 * @description 修改评论
	 */
	editComment(id, params) {
		return http.put(`/comments/${id}`, params);
	},
	/**
	 * @description 评论详情
	 */
	commentInfo(id) {
		return http.get(`/comments/${id}`);
	},
};
