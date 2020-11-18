import http from "../../http";

export default {
	/**
	 * @description 获取主题列表
	 */
	getThemeList() {
		return http.get("/themes");
	},
	/**
	 * @description 新增主题
	 */
	addTheme(params) {
		return http.post("/themes", params);
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
	pagination(params) {
		return http.get(
			`/themes/get/page?pageSize=${params.pageSize}&currentPage=${params.currentPage}&theme=${params.theme}`
		);
	},
	/**
	 * @description 修改主题
	 */
	editTheme(id, params) {
		return http.put(`/themes/${id}`, params);
	},
	/**
	 * @description 主题详情
	 */
	themeInfo(id) {
		return http.get(`/themes/${id}`);
	},
	// /**
	//  * @description 主题搜索
	//  */
	// searchTheme(params) {
	// 	return http.post("/themes/get/search", params);
	// },
};
