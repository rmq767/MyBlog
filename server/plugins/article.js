const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateArticle(data) {
	let errors = {};
	data.title = !isEmpty(data.title) ? data.title : "";
	data.content_html = !isEmpty(data.content_html) ? data.content_html : "";
	data.theme = !isEmpty(data.theme) ? data.theme : "";
	let type = data.type.toString();
	type = !isEmpty(type) ? type : "";

	if (validator.isEmpty(data.title)) {
		errors.title = "标题不能为空";
	}
	if (validator.isEmpty(data.theme)) {
		errors.theme = "主题不能为空";
	}
	if (
		!validator.isLength(data.theme, {
			min: 1,
			max: 100,
		})
	) {
		errors.theme = "主题的长度不超过100位";
	}
	if (validator.isEmpty(type)) {
		errors.type = "分类不能为空";
	}
	if (
		!validator.isLength(type, {
			min: 1,
			max: 100,
		})
	) {
		errors.type = "分类的长度不超过100位";
	}
	if (
		!validator.isLength(data.title, {
			min: 1,
			max: 100,
		})
	) {
		errors.title = "标题的长度不超过100位";
	}
	if (validator.isEmpty(data.content_html)) {
		errors.content_html = "内容不能为空";
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
