const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateNotice(data) {
	let errors = {};
	data.title = !isEmpty(data.title) ? data.title : "";
	data.notice = !isEmpty(data.notice) ? data.notice : "";

	if (validator.isEmpty(data.title)) {
		errors.title = "公告题目不能为空";
	}
	if (
		!validator.isLength(data.title, {
			min: 1,
			max: 50,
		})
	) {
		errors.title = "公告题目不超过50位";
	}
	if (validator.isEmpty(data.notice)) {
		errors.notice = "公告内容不能为空";
	}
	if (
		!validator.isLength(data.notice, {
			min: 1,
			max: 240,
		})
	) {
		errors.notice = "公告内容不超过240位";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
