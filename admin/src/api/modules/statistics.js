import http from "../../http";

export default {
	/**
	 * @description 获取看板数据
	 */
	getCountData() {
		return http.get("/statistics");
	},
	/**
	 * @description 获取阅读量统计
	 */
	getReadData() {
		return http.get("/statistics/read");
	},
	/**
	 * @description 获取网站访问量统计
	 */
	getPvData() {
		return http.get("/statistics/pv");
	},
};
