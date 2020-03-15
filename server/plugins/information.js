const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateInformation(data) {
    let errors = {}
    data.my_message = !isEmpty(data.my_message) ? data.my_message : ''
    data.my_info = !isEmpty(data.my_info) ? data.my_info : ''
    data.my_hope = !isEmpty(data.my_hope) ? data.my_hope : ''

    if (validator.isEmpty(data.my_message)) {
        errors.my_message = '我的留言不能为空'
    }
    if (!validator.isLength(data.my_message, {
            min: 1,
            max: 100
        })) {
        errors.my_message = '我的留言的长度不超过100位'
    }
    if (validator.isEmpty(data.my_info)) {
        errors.my_info = '我的信息不能为空'
    }
    if (!validator.isLength(data.my_info, {
            min: 1,
            max: 100
        })) {
        errors.my_info = '我的信息的长度不超过100位'
    }
    if (validator.isEmpty(data.my_hope)) {
        errors.my_hope = '我的希望不能为空'
    }
    if (!validator.isLength(data.my_hope, {
            min: 1,
            max: 200
        })) {
        errors.my_hope = '我的希望的长度不超过200位'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}