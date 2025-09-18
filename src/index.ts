'use strict'

export default function requireEnv(
  name: string,
  env?: typeof process.env
): string {
  if (!env) env = process.env
  const value = env[name]
  const type = typeof value
  if (!value || (value && type !== 'string')) {
    const path = 'environment variable ' + JSON.stringify(name)
    const message =
      value && type !== 'string' ? path + ' has invalid type: ' + type
      : value === '' ? path + ' is the empty string'
      : 'missing ' + path
    requireEnv.logError(message, '\nEnvironment:', env)
    throw new Error(message)
  }
  return value
}
// istanbul ignore next
requireEnv.logError = function logError(...args: any[]) {
  console.error(...args) // eslint-disable-line no-console
}
