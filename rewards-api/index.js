const Koa = require('koa')
const Router = require('koa-router')
const { addGiftCard, getGiftCards } = require('./gift-cards')
const { validate } = require('./validate')

const app = new Koa()
const router = new Router()

router.post('/validate', validate)

app.use(require('koa-body')())
app.use(router.routes())

module.exports = app
