const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateAdmin(data) {
    let errors = {}
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (validator.isEmpty(data.email)) {
        errors.email = '邮箱不能为空'
    }
    if (!validator.isEmail(data.email)) {
        errors.email = '邮箱格式不对'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = '密码不能为空'
    }
    if (!validator.isLength(data.password, {
            min: 8,
            max: 16
        })) {
        errors.password = '密码的长度不超过16位'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}