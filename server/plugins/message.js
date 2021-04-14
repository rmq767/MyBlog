const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateInformation(data) {
	let errors = {};
	data.profile = !isEmpty(data.profile) ? data.profile : "";
	data.qq = !isEmpty(data.qq) ? data.qq : "";
	data.wechat = !isEmpty(data.wechat) ? data.wechat : "";
	data.github = !isEmpty(data.github) ? data.github : "";
	data.csdn = !isEmpty(data.csdn) ? data.csdn : "";
	data.description = !isEmpty(data.description) ? data.description : "";

	if (
		!validator.isLength(data.profile, {
			min: 0,
			max: 120,
		})
	) {
		errors.profile = "长度120个字符以内";
	}
	if (
		!validator.isLength(data.qq, {
			min: 0,
			max: 16,
		})
	) {
		errors.qq = "长度16个字符以内";
	}
	if (
		!validator.isLength(data.wechat, {
			min: 0,
			max: 20,
		})
	) {
		errors.wechat = "长度20个字符以内";
	}
	if (
		!validator.isLength(data.github, {
			min: 0,
			max: 20,
		})
	) {
		errors.github = "长度20个字符以内";
	}
	if (
		!validator.isLength(data.csdn, {
			min: 0,
			max: 20,
		})
	) {
		errors.csdn = "长度20个字符以内";
	}
	if (
		!validator.isLength(data.description, {
			min: 0,
			max: 240,
		})
	) {
		errors.description = "长度240个字符以内";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
