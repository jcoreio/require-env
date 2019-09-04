var requireEnv = require('../lib')
var sinon = require('sinon')
var expect = require('chai').expect

describe('requireEnv', function () {
  var logError
  afterEach(function () {
    requireEnv.logError = logError = sinon.spy()
  })
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
    expect(error.message).not.to.match(/Environment: \{\n {2}"BAR": "baz"\n\}/i)
    expect(logError.args[0]).to.deep.equal(['missing environment variable "FOO"', '\nEnvironment:', {BAR: "baz"}])
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
    expect(logError.args[0]).to.deep.equal(['environment variable "FOO" has invalid type: number', '\nEnvironment:', {FOO: 2}])
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
    expect(error.message).not.to.match(/Environment: \{\n {2}"FOO": "",\n {2}"BAR": "baz"\n\}/i)
    expect(logError.args[0]).to.deep.equal(['environment variable "FOO" is the empty string', '\nEnvironment:', {FOO: '', BAR: 'baz'}])
  })
  it('defaults to process.env', function () {
    expect(requireEnv('npm_package_name')).to.equal(require('../package.json').name)
  })
})
