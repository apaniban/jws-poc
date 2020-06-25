require('dotenv').config()

const config = {
  apiKey: process.env.API_KEY,
  jwkPrivateFile: process.env.JWK_PRIV_FILE
}

module.exports = config
