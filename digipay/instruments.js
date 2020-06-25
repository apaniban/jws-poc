const { decrypt } = require('./jws')

const getInstruments = (ctx) => 
  decrypt(ctx)
    .then(() => {
      ctx.body = {
        giftCards: [{
          name: 'John Doe',
          cardNumber: '12311'
        }]
      }
    })
    .catch(() => {
      ctx.status = 401
      ctx.body = 'Unauthorized'
    })

const addInstrument = (ctx) =>
  decrypt(ctx)
    .then((body) => {
      ctx.status = 201
      ctx.body = `${body.name} created.`
    })
    .catch((err) => {
      console.log('err', err)
      ctx.status = 401
      ctx.body = 'Unauthorized'
    })

module.exports = {
  getInstruments,
  addInstrument
}
