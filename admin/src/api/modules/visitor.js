import http from "../../http";

export default {
	/**
	 * @description 游客分页
	 */
	pagination(params) {
		return http.get(
			`/visitor/get/page?pageSize=${params.pageSize}&currentPage=${params.currentPage}&name=${params.name}&email=${params.email}&status=${params.status}&endTime=${params.endTime}&startTime=${params.startTime}`
		);
	},
	/**
	 * @description 修改游客
	 */
	editVisitor(params) {
		return http.put(`/visitor/put/status`, params);
	},
};
