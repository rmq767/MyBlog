import http from "../../http";

export default {
	/**
	 * @description 获取分类列表
	 */
	getTypeList() {
		return http.get("/types");
	},
	/**
	 * @description 新增分类
	 */
	addType(params) {
		return http.post("/types", params);
	},
	/**
	 * @description 删除分类
	 */
	deleteType(id) {
		return http.delete(`/types/${id}`);
	},
	/**
	 * @description 分类分页
	 */
	pagination(size, page) {
		return http.get(`/types/get/page?pageSize=${size}&currentPage=${page}`);
	},
	/**
	 * @description 分类搜索
	 */
	searchType(params) {
		return http.post("/types/get/search", params);
	},
};
