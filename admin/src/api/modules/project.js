import http from "../../http";

export default {
	/**
	 * @description 获取项目列表
	 */
	getProjectList() {
		return http.get("/projects");
	},
	/**
	 * @description 删除项目
	 */
	deleteProject(id) {
		return http.delete(`/projects/${id}`);
	},
	/**
	 * @description 项目分页
	 */
	pagination(params) {
		return http.get(
			`/projects/get/page?pageSize=${params.pageSize}&currentPage=${params.currentPage}&title=${params.title}&description=${params.description}`
		);
	},
	/**
	 * @description 添加项目
	 */
	addProject(params) {
		return http.post("/projects", params);
	},
	/**
	 * @description 修改项目
	 */
	editProject(id, params) {
		return http.put(`/projects/${id}`, params);
	},
	/**
	 * @description 项目详情
	 */
	ProjectInfo(id) {
		return http.get(`/projects/${id}`);
	},
	/**
	 * @description 获取项目分类选项
	 */
	getProjectTypeOptions() {
		return http.get("/projects/get/type");
	},
};
