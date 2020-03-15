const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateComment(data) {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : ''
    data.comment = !isEmpty(data.comment) ? data.comment : ''
    data.article_id = !isEmpty(data.article_id) ? data.article_id : ''

    if (validator.isEmpty(data.name)) {
        errors.name = '昵称不能为空'
    }
    if (!validator.isLength(data.name, {
            min: 1,
            max: 16
        })) {
        errors.name = '昵称的长度不超过16位'
    }
    if (validator.isEmpty(data.comment)) {
        errors.comment = '评论不能为空'
    }
    if (!validator.isLength(data.comment, {
            min: 1,
            max: 300
        })) {
        errors.comment = '评论的长度不超过300位'
    }
    if (validator.isEmpty(data.article_id)) {
        errors.article_id = '评论文章不能为空'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}