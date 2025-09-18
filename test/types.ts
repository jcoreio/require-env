import requireEnv from '../src'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function testTypes() {
  requireEnv('foo')
  requireEnv('foo', process.env)
  requireEnv('foo', { TEST: '1' })
}
