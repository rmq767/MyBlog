import axios from "axios";

export default {
	/**
	 * @description 获取管理员列表
	 */
	login(params) {
		return axios.post("http://47.115.83.172/login", params);
	},
};
