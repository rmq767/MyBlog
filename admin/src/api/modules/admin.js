import http from "../../http";

export default {
	/**
	 * @description 获取管理员列表
	 */
	getAdmin() {
		return http.get("/admins");
	},
	// /**
	//  * @description 删除管理员
	//  */
	// deleteAdmin(id) {
	// 	return http.delete(`/admins/${id}`);
	// },
	/**
	 * @description 修改管理员信息
	 */
	editAdmin(id, params) {
		return http.put(`/admins/${id}`, params);
	},
};
