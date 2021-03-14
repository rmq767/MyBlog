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
	pagination(params) {
		return http.get(
			`/commentreply/get/page?pageSize=${params.pageSize}&currentPage=${
				params.currentPage
			}&i_name=${params.i_name}&r_name=${params.r_name}&i_email=${
				params.i_email
			}&r_email=${params.r_email}&c_reply=${
				params.c_reply
			}&article_id=${params.article_id || ""}&is_check=${
				params.is_check
			}&startTime=${params.startTime}&endTime=${params.endTime}`
		);
	},
	/**
	 * @description 修改评论回复
	 */
	editCommentReply(id, params) {
		return http.put(`/commentreply/${id}`, params);
	},
	/**
	 * @description 评论回复详情
	 */
	commentReplyInfo(id) {
		return http.get(`/commentreply/${id}`);
	},
	/**
	 * @description 审核状态
	 */ commentReplyStatus(params) {
		return http.put(`/commentreply/put/status`, params);
	},
};
