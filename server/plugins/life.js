const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLife(data) {
    let errors = {}
    data.description = !isEmpty(data.description) ? data.description : ''
    data.image = !isEmpty(data.image) ? data.image : ''

    if (validator.isEmpty(data.description)) {
        errors.description = '留言不能为空'
    }
    if (!validator.isLength(data.description, {
            min: 1,
            max: 240
        })) {
        errors.description = '留言的长度不超过240位'
    }
    if (validator.isEmpty(data.image)) {
        errors.image = '头像不能为空'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}