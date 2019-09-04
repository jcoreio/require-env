# @jcoreio/require-env

[![Build Status](https://travis-ci.org/jcoreio/require-env.svg?branch=master)](https://travis-ci.org/jcoreio/require-env)
[![Coverage Status](https://codecov.io/gh/jcoreio/require-env/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/require-env)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A simple function that returns the value of an environment variable, but **throws if it's not a non-empty string**.
Logs the entire environment to `console.error` to aid debugging.
Flow type defs included.

## Usage

```sh
npm install --save @jcoreio/require-env
```

```js
var requireEnv = require('require-env')

var FOO = requireEnv('FOO')
// now you can be sure that FOO is a non-empty string, and Flow will trust that it is too.
```

By default it looks in `process.env`, but you can override this by passing the environment
hash as the second argument:
```js
var environment = {...process.env, ...require('./defaultEnv.js')}
var FOO = requireEnv('FOO', environment)
```

## See also

* [`defaultenv`](https://github.com/jcoreio/defaultenv) - fantastic CLI/Node API for loading default environment variable values

## Error messages

In the past `Error`s thrown had all environment variables in their `message`s.
I've since realized this was a huge security risk when error messages are sent
from server to client.  Now the message and environment variables are printed to
`console.error`.  You can customize this by monkeypatching the
`require('@jcoreio/require-env').logError` function.
