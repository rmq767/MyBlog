import http from "../../http";

export default {
	/**
	 * @description 获取评论回复列表
	 */
	getCommentReplyList() {
		return http.get("/commentreply");
	},
	/**
	 * @description 删除评论回复
	 */
	deleteCommentReply(id) {
		return http.delete(`/commentreply/${id}`);
	},
	/**
	 * @description 评论回复分页
	 */
	pagination(size, page) {
		return http.get(
			`/commentreply/get/page?pageSize=${size}&currentPage=${page}`
		);
	},
	/**
	 * @description 评论回复搜索
	 */
	searchCommentReply(params) {
		return http.post("/commentreply/get/search", params);
	},
	// /**
	//  * @description 添加评论回复
	//  */
	// addCommentReply(params) {
	// 	return http.post("/commentreply", params);
	// },
	// /**
	//  * @description 修改评论回复
	//  */
	// editCommentReply(id, params) {
	// 	return http.put(`/commentreply/${id}`, params);
	// },
	// /**
	//  * @description 评论回复详情
	//  */
	// commentReplyInfo(id) {
	// 	return http.get(`/commentreply/${id}`);
	// },
};
