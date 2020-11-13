import http from "../../http";

export default {
	/**
	 * @description 获取公告列表
	 */
	getNoticeList() {
		return http.get("/notices");
	},
	/**
	 * @description 删除公告
	 */
	deleteNotice(id) {
		return http.delete(`/notices/${id}`);
	},
	/**
	 * @description 公告分页
	 */
	searchNotice(params) {
		return http.get(
			`/notices/get/page?pageSize=${params.pageSize}&currentPage=${params.currentPage}&title=${params.title}&content=${params.content}&startTime=${params.startTime}&endTime=${params.endTime}`
		);
	},
	// /**
	//  * @description 公告搜索
	//  */
	// searchNotice(params) {
	// 	return http.post("/notices/get/search", params);
	// },
	/**
	 * @description 添加公告
	 */
	addNotice(params) {
		return http.post("/notices", params);
	},
	/**
	 * @description 修改公告
	 */
	editNotice(id, params) {
		return http.put(`/notices/${id}`, params);
	},
	/**
	 * @description 公告详情
	 */
	noticeInfo(id) {
		return http.get(`/notices/${id}`);
	},
};
