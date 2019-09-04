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
    requireEnv.logError(message, '\nEnvironment:', env)
    throw new Error(message)
  }
  return value
}

// istanbul ignore next
requireEnv.logError = function logError() {
  console.error.apply(console, arguments) // eslint-disable-line no-console
}

module.exports = requireEnv
