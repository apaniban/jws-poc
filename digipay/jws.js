const btoa = require('btoa')
const R = require('ramda')
const { JWK, JWT } = require('jose')
const { readFile } = require('../utils/file')

const reattach = (jws, payload) =>
  R.pipe(
    R.split('.'),
    R.set(
      R.lensIndex(1),
      btoa(JSON.stringify(payload)).replace(/=/g, '')
    ),
    R.join('.')
  )(jws)

const validateRequest = (request) => ({ header, payload }) => {
  // Test if header is the same with the request info, but for now just check the verb is the same
  if (request.verb === header.verb) {
    return payload
  }

  console.log('Invalid JWT header')

  return Promise.reject('UNAUTHORIZED')
}

const decrypt = (ctx) => {
  const jws = ctx.headers.jws
  const payload = ctx.request.body || {}
  const request = {
    url: ctx.path,
    verb: ctx.method
  }

  return readFile('./keys/public.json')
    .then(JSON.parse)
    .then((key) => JWK.asKey(key, { public: true }))
    .then((key) => JWT.verify(reattach(jws, payload), key, { complete: true }))
    .then(validateRequest(request))
}

module.exports = {
  decrypt
}
