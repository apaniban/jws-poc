const rewardsApi = require('./rewards-api')
const digipay = require('./digipay')

rewardsApi.listen(3000)
digipay.listen(3001)
