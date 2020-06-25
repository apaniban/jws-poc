const Koa = require('koa')
const Router = require('koa-router')
const { addInstrument, getInstruments } = require('./instruments')

const app = new Koa()
const router = new Router()

router.get('/instruments', getInstruments)
router.post('/instruments', addInstrument)

app.use(require('koa-body')())
app.use(router.routes())

module.exports = app
