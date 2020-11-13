import http from "../../http";

export default {
	/**
	 * @description 获取留言列表
	 */
	getMessageList() {
		return http.get("/messages");
	},
	/**
	 * @description 删除留言
	 */
	deleteMessage(id) {
		return http.delete(`/messages/${id}`);
	},
	/**
	 * @description 留言分页
	 */
	searchMessage(params) {
		return http.get(
			`/messages/get/page?pageSize=${params.pageSize}&currentPage=${params.currentPage}&nickname=${params.nickname}&message=${params.message}&startTime=${params.startTime}&endTime=${params.endTime}`
		);
	},
	// /**
	//  * @description 留言搜索
	//  */
	// searchMessage(params) {
	// 	return http.post("/messages/get/search", params);
	// },
	/**
	 * @description 添加留言
	 */
	addMessage(params) {
		return http.post("/messages", params);
	},
	/**
	 * @description 修改留言
	 */
	editMessage(id, params) {
		return http.put(`/messages/${id}`, params);
	},
	/**
	 * @description 留言详情
	 */
	messageInfo(id) {
		return http.get(`/messages/${id}`);
	},
};
