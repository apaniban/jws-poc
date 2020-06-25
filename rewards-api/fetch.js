const axios = require('axios')
const R = require('ramda')
const { encryptWith } = require('./jws')

const createFetch = (options) => {
  const { jwkPrivateFile, ...rest } = options
  const instance = axios.create(rest)

  if (!R.isNil(jwkPrivateFile)) {
    instance.interceptors.request.use(encryptWith(jwkPrivateFile))
  }

  return instance
}

module.exports = {
  createFetch
}
