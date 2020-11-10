import http from "../../http";

export default {
	/**
	 * @description 获取文章列表
	 */
	getArticleList() {
		return http.get("/articles");
	},
	/**
	 * @description 删除文章
	 */
	deleteArticle(id) {
		return http.delete(`/articles/${id}`);
	},
	/**
	 * @description 文章分页
	 */
	pagination(size, page) {
		return http.get(
			`/articles/get/page?pageSize=${size}&currentPage=${page}`
		);
	},
	/**
	 * @description 文章搜索
	 */
	searchArticle(params) {
		return http.post("/articles/get/search", params);
	},
	/**
	 * @description 添加文章
	 */
	addArticle(params) {
		return http.post("/articles", params);
	},
	/**
	 * @description 修改文章
	 */
	editArticle(id, params) {
		return http.put(`/articles/${id}`, params);
	},
	/**
	 * @description 文章详情
	 */
	articleInfo(id) {
		return http.get(`/articles/${id}`);
	},
};
