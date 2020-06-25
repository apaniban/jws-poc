const fs = require('fs')
const R = require('ramda')

const promisify = (cb) => (arg) => new Promise((resolve, reject) =>
  cb(arg, (err, data) => {
    if (!R.isNil(err)) {
      return reject(err)
    }

    return resolve(data)
  })
)

module.exports = {
  readFile: promisify(fs.readFile)
}
