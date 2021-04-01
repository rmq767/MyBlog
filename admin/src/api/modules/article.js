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
	 * @description 文章搜索
	 */
	searchArticle(params) {
		return http.get(
			`/articles/get/page?pageSize=${params.pageSize}&currentPage=${params.currentPage}&title=${params.title}&content=${params.content}&theme=${params.theme}&type=${params.type}&startTime=${params.startTime}&endTime=${params.endTime}`
		);
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
	/**
	 * @description 文章置顶
	 */
	articleTop(id, params) {
		return http.put(`/articles/get/top/${id}`, params);
	},
};
