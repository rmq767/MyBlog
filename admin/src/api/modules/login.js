import axios from "axios";

export default {
	/**
	 * @description 获取管理员列表
	 */
	login(params) {
		return axios.post("http://localhost:3002/login", params);
	},
};
