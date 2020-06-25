const axios = require('axios')
const R = require('ramda')
const { createFetch } = require('./fetch')
const { apiKey, jwkPrivateFile } = require('./config')

const fetch = createFetch({
  baseURL: 'https://dev.mobile-api.woolworths.com.au/wow/v1/jwsdemo',
  jwkPrivateFile,
  headers: {
    'X-Api-Key': apiKey
  }
})

const validate = (ctx) =>
  fetch.post('/validate', ctx.request.body)
    .then(R.prop('data'))
    .then((body) => {
      ctx.body = body
    })
    .catch((err) => {
      ctx.status = 401
      ctx.body = err
    })

module.exports = {
  validate
}
