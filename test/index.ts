import requireEnv from '../src'
import sinon from 'sinon'
import { expect } from 'chai'
import { describe, it } from 'mocha'

describe('requireEnv', function () {
  let logError = sinon.spy()
  afterEach(function () {
    requireEnv.logError = logError = sinon.spy()
  })
  it('returns value of environment variable', function () {
    expect(requireEnv('FOO', { FOO: 'bar' })).to.equal('bar')
  })
  it('throws if environment variable is missing', function () {
    let error: any
    try {
      requireEnv('FOO', { BAR: 'baz' })
    } catch (err) {
      error = err
    }
    expect(error).to.be.an.instanceOf(Error)
    expect(error.message).to.match(/missing environment variable "FOO"/)
    expect(error.message).not.to.match(/Environment: \{\n {2}"BAR": "baz"\n\}/i)
    expect(logError.args[0]).to.deep.equal([
      'missing environment variable "FOO"',
      '\nEnvironment:',
      { BAR: 'baz' },
    ])
  })
  it('throws if environment variable is not a string', function () {
    let error: any
    try {
      // @ts-expect-error intentionally invalid
      requireEnv('FOO', { FOO: 2 })
    } catch (err) {
      error = err
    }
    expect(error).to.be.an.instanceOf(Error)
    expect(error.message).to.match(
      /environment variable "FOO" has invalid type: number/
    )
    expect(logError.args[0]).to.deep.equal([
      'environment variable "FOO" has invalid type: number',
      '\nEnvironment:',
      { FOO: 2 },
    ])
  })
  it('throws if environment variable is the empty string', function () {
    let error: any
    try {
      requireEnv('FOO', { FOO: '', BAR: 'baz' })
    } catch (err) {
      error = err
    }
    expect(error).to.be.an.instanceOf(Error)
    expect(error.message).to.match(
      /environment variable "FOO" is the empty string/
    )
    expect(error.message).not.to.match(
      /Environment: \{\n {2}"FOO": "",\n {2}"BAR": "baz"\n\}/i
    )
    expect(logError.args[0]).to.deep.equal([
      'environment variable "FOO" is the empty string',
      '\nEnvironment:',
      { FOO: '', BAR: 'baz' },
    ])
  })
  it('defaults to process.env', function () {
    process.env.npm_package_name = '@jcoreio/require-env'
    expect(requireEnv('npm_package_name')).to.equal(
      process.env.npm_package_name
    )
  })
})
