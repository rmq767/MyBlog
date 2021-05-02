const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateTheme(data) {
	let errors = {};
	data.theme = !isEmpty(data.theme) ? data.theme : "";

	if (validator.isEmpty(data.theme)) {
		errors.theme = "主题不能为空";
	}
	if (
		!validator.isLength(data.theme, {
			min: 1,
			max: 20,
		})
	) {
		errors.theme = "主题不超过20位";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
