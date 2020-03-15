const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLink(data) {
    let errors = {}
    data.title = !isEmpty(data.title) ? data.title : ''
    data.link = !isEmpty(data.link) ? data.link : ''
    data.description = !isEmpty(data.description) ? data.description : ''
    data.image = !isEmpty(data.image) ? data.image : ''

    if (validator.isEmpty(data.title)) {
        errors.title = '题目不能为空'
    }
    if (!validator.isLength(data.title, {
            min: 1,
            max: 100
        })) {
        errors.title = '题目的长度不超过100位'
    }
    if (validator.isEmpty(data.link)) {
        errors.link = '链接不能为空'
    }
    if (!validator.isLength(data.link, {
            min: 1,
            max: 255
        })) {
        errors.link = '链接的长度不超过255位'
    }
    if (validator.isEmpty(data.description)) {
        errors.description = '描述不能为空'
    }
    if (!validator.isLength(data.description, {
            min: 1,
            max: 240
        })) {
        errors.description = '描述的长度不超过240位'
    }
    if (validator.isEmpty(data.image)) {
        errors.image = '封面不能为空'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}