const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateMessageReply(data) {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.m_reply = !isEmpty(data.m_reply) ? data.m_reply : ''

  if (validator.isEmpty(data.name)) {
    errors.name = '昵称不能为空'
  }
  if (!validator.isLength(data.name, {
      min: 1,
      max: 16
    })) {
    errors.name = '昵称的长度不超过16位'
  }
  if (validator.isEmpty(data.m_reply)) {
    errors.m_reply = '回复不能为空'
  }
  if (!validator.isLength(data.m_reply, {
      min: 1,
      max: 240
    })) {
    errors.m_reply = '回复的长度不超过240位'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}