const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateCommentReply(data) {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.c_reply = !isEmpty(data.c_reply) ? data.c_reply : ''

  if (validator.isEmpty(data.name)) {
    errors.name = '昵称不能为空'
  }
  if (!validator.isLength(data.name, {
      min: 1,
      max: 16
    })) {
    errors.name = '昵称的长度不超过16位'
  }
  if (validator.isEmpty(data.c_reply)) {
    errors.c_reply = '回复不能为空'
  }
  if (!validator.isLength(data.c_reply, {
      min: 1,
      max: 240
    })) {
    errors.c_reply = '回复的长度不超过240位'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}