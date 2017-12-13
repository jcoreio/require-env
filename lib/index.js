'use strict'

function requireEnv(name, env) {
  if (!env) env = process.env
  var value = env[name]
  var type = typeof value
  if (!value || (value && type !== 'string')) {
    var path = 'environment variable ' + JSON.stringify(name)
    var message = value && type !== 'string'
      ? path + ' has invalid type: ' + type
      : value === ''
        ? path + ' is the empty string'
        : 'missing ' + path
    message += '. Environment: ' + JSON.stringify(env, null, 2)
    throw new Error(message)
  }
  return value
}

module.exports = requireEnv
