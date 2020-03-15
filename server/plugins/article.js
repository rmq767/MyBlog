const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateArticle(data) {
    let errors = {}
    data.title = !isEmpty(data.title) ? data.title : ''
    data.content = !isEmpty(data.content) ? data.content : ''

    if (validator.isEmpty(data.title)) {
        errors.title = '标题不能为空'
    }
    if (!validator.isLength(data.title, {
            min: 1,
            max: 100
        })) {
        errors.title = '标题的长度不超过100位'
    }
    if (validator.isEmpty(data.content)) {
        errors.content = '内容不能为空'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}