const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateMessage(data) {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : ''
    data.message = !isEmpty(data.message) ? data.message : ''
    data.avatar = !isEmpty(data.avatar) ? data.avatar : ''

    if (validator.isEmpty(data.name)) {
        errors.name = '昵称不能为空'
    }
    if (!validator.isLength(data.name, {
            min: 1,
            max: 20
        })) {
        errors.name = '昵称的长度不超过20位'
    }
    if (validator.isEmpty(data.message)) {
        errors.message = '留言不能为空'
    }
    if (!validator.isLength(data.message, {
            min: 1,
            max: 240
        })) {
        errors.message = '留言的长度不超过240位'
    }
    if (validator.isEmpty(data.avatar)) {
        errors.avatar = '头像不能为空'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}