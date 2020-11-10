import http from "../../http";

export default {
	/**
	 * @description 获取管理员列表
	 */
	getInformation() {
		return http.get("/informations");
	},
	/**
	 * @description 修改管理员信息
	 */
	editInformation(id, params) {
		return http.put(`/informations/${id}`, params);
	},
};
