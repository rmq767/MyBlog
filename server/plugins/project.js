const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProject(data) {
	let errors = {};
	data.title = !isEmpty(data.title) ? data.title : "";
	data.link = !isEmpty(data.link) ? data.link : "";
	data.description = !isEmpty(data.description) ? data.description : "";

	if (validator.isEmpty(data.title)) {
		errors.title = "项目标题不能为空";
	}
	if (
		!validator.isLength(data.title, {
			min: 1,
			max: 50,
		})
	) {
		errors.title = "项目标题不超过50位";
	}
	if (validator.isEmpty(data.link)) {
		errors.link = "链接地址不能为空";
	}
	if (
		!validator.isLength(data.link, {
			min: 1,
			max: 255,
		})
	) {
		errors.link = "链接地址不超过255位";
	}
	if (validator.isEmpty(data.description)) {
		errors.description = "项目描述不能为空";
	}
	if (
		!validator.isLength(data.description, {
			min: 1,
			max: 240,
		})
	) {
		errors.description = "项目描述不超过240位";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
