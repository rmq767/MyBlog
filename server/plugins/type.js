const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateType(data) {
	let errors = {};
	data.type = !isEmpty(data.type) ? data.type : "";

	if (validator.isEmpty(data.type)) {
		errors.type = "分类不能为空";
	}
	if (
		!validator.isLength(data.type, {
			min: 1,
			max: 20,
		})
	) {
		errors.type = "分类不超过20位";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
