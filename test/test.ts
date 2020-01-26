import requireEnv from '../lib'

requireEnv('foo')
requireEnv('foo', process.env)
requireEnv('foo', {TEST: '1'})
