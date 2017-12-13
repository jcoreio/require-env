var requireEnv = require('../lib')
var expect = require('chai').expect

describe('requireEnv', function () {
  it('returns value of environment variable', function () {
    expect(requireEnv('FOO', {FOO: 'bar'})).to.equal('bar')
  })
  it('throws if environment variable is missing', function () {
    var error
    try {
      requireEnv('FOO', {BAR: 'baz'})
    } catch (err) {
      error = err
    }
    expect(error).to.be.an.instanceOf(Error)
    expect(error.message).to.match(/missing environment variable "FOO"/)
    expect(error.message).to.match(/Environment: \{\n {2}"BAR": "baz"\n\}/i)
  })
  it('throws if environment variable is not a string', function () {
    var error
    try {
      requireEnv('FOO', {FOO: 2})
    } catch (err) {
      error = err
    }
    expect(error).to.be.an.instanceOf(Error)
    expect(error.message).to.match(/environment variable "FOO" has invalid type: number/)
    expect(error.message).to.match(/Environment: \{\n {2}"FOO": 2\n\}/i)
  })
  it('throws if environment variable is the empty string', function () {
    var error
    try {
      requireEnv('FOO', {FOO: '', BAR: 'baz'})
    } catch (err) {
      error = err
    }
    expect(error).to.be.an.instanceOf(Error)
    expect(error.message).to.match(/environment variable "FOO" is the empty string/)
    expect(error.message).to.match(/Environment: \{\n {2}"FOO": "",\n {2}"BAR": "baz"\n\}/i)
  })
  it('defaults to process.env', function () {
    expect(requireEnv('npm_package_name')).to.equal(require('../package.json').name)
  })
})

