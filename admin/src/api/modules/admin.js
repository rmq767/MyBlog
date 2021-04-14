import http from "../../http";

export default {
	/**
	 * @description 获取管理员列表
	 */
	getAdmin() {
		return http.get("/admins");
	},
	/**
	 * @description 修改管理员信息
	 */
	editAdmin(id, params) {
		return http.put(`/admins/${id}`, params);
	},
};
