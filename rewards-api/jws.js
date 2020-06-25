const R = require('ramda')
const { JWT, JWK } = require('jose')
const { readFile } = require('../utils/file')

const RSA_ALG = 'RS256'

const detachPayload = R.pipe(
  R.split('.'),
  R.set(R.lensIndex(1), ''),
  R.join('.')
)

const sign = (config) => (key) => {
  const payload = R.propOr({}, 'data', config)
  const jwt = JWT.sign(
    payload,
    key,
    {
      algorithm: RSA_ALG,
      header: {
        verb: config.method.toUpperCase(),
        url: config.baseURL + config.url,
        timestamp: Date.now()
        // Add CRN as userid
        //userid: '123123'
      },
      kid: true,
      iat: false
    }
  )

  return R.mergeDeepRight(config, {
    headers: {
      jws: detachPayload(jwt),
    }
  })
}

const encryptWith = (jwkPrivateFile) => (config) =>
  readFile(jwkPrivateFile)
    .then(JSON.parse)
    .then(JWK.asKey)
    .then(sign(config))

module.exports = {
  encryptWith
}
