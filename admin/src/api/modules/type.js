import http from "../../http";

export default {
	/**
	 * @description 获取主题列表
	 */
	getTypeList() {
		return http.get("/types");
	},
	/**
	 * @description 删除主题
	 */
	deleteType(id) {
		return http.delete(`/types/${id}`);
	},
	/**
	 * @description 主题分页
	 */
	pagination(size, page) {
		return http.get(`/types/get/page?pageSize=${size}&currentPage=${page}`);
	},
	/**
	 * @description 主题搜索
	 */
	searchType(params) {
		return http.post("/types/get/search", params);
	},
};
