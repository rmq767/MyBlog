import http from "../../http";

export default {
	/**
	 * @description 获取主题列表
	 */
	getThemeList() {
		return http.get("/themes");
	},
	/**
	 * @description 删除主题
	 */
	deleteTheme(id) {
		return http.delete(`/themes/${id}`);
	},
	/**
	 * @description 主题分页
	 */
	pagination(size, page) {
		return http.get(
			`/themes/get/page?pageSize=${size}&currentPage=${page}`
		);
	},
	/**
	 * @description 主题搜索
	 */
	searchTheme(params) {
		return http.post("/themes/get/search", params);
	},
};
