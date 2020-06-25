const axios = require('axios')
const R = require('ramda')
const { createFetch } = require('./fetch')

const fetch = createFetch({
  baseURL: 'http://localhost:3001',
  jwkPrivateFile: './keys/private.json'
})

const getGiftCards = (ctx) =>
  fetch.get('/instruments')
    .then(R.prop('data'))
    .then(R.applySpec({
      items: R.prop('giftCards')
    }))
    .then((body) => {
      ctx.body = body
    })
    .catch((err) => {
      ctx.status = 401
      ctx.body = 'Unauthorized'
    })

const addGiftCard = (ctx) =>
  fetch.post('/instruments', ctx.request.body)
    .then(R.prop('data'))
    .then((body) => {
      ctx.body = body
    })
    .catch((err) => {
      ctx.status = 401
      ctx.body = 'Unauthorized'
    })

module.exports = {
  getGiftCards,
  addGiftCard
}
