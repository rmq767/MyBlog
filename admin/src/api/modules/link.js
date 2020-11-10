import http from "../../http";

export default {
	/**
	 * @description 获取学习链接列表
	 */
	getLinkList() {
		return http.get("/links");
	},
	/**
	 * @description 删除学习链接
	 */
	deleteLink(id) {
		return http.delete(`/links/${id}`);
	},
	/**
	 * @description 学习链接分页
	 */
	pagination(size, page) {
		return http.get(`/links/get/page?pageSize=${size}&currentPage=${page}`);
	},
	/**
	 * @description 学习链接搜索
	 */
	searchLink(params) {
		return http.post("/links/get/search", params);
	},
	/**
	 * @description 添加学习链接
	 */
	addLink(params) {
		return http.post("/links", params);
	},
	/**
	 * @description 修改学习链接
	 */
	editLink(id, params) {
		return http.put(`/links/${id}`, params);
	},
	/**
	 * @description 学习链接详情
	 */
	linkInfo(id) {
		return http.get(`/links/${id}`);
	},
};
