const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateCommentReply(data) {
	let errors = {};
	data.i_name = !isEmpty(data.i_name) ? data.i_name : "";
	data.c_reply = !isEmpty(data.c_reply) ? data.c_reply : "";
	data.r_name = !isEmpty(data.r_name) ? data.r_name : "";

	if (validator.isEmpty(data.i_name)) {
		errors.i_name = "昵称不能为空";
	}
	if (
		!validator.isLength(data.i_name, {
			min: 1,
			max: 20,
		})
	) {
		errors.i_name = "昵称的长度不超过20位";
	}
	if (validator.isEmpty(data.r_name)) {
		errors.r_name = "回复昵称不能为空";
	}
	if (validator.isEmpty(data.c_reply)) {
		errors.c_reply = "回复不能为空";
	}
	if (
		!validator.isLength(data.c_reply, {
			min: 1,
			max: 240,
		})
	) {
		errors.c_reply = "回复的长度不超过240位";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
