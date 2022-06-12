const fs = require('fs')
const { chain } = require('stream-chain')
const { parser } = require('stream-json')
const { pick } = require('stream-json/filters/Pick')
const { ignore } = require('stream-json/filters/Ignore')
const { streamArray } = require('stream-json/streamers/StreamArray')

const main = () => {
  chain([
    fs.createReadStream('./bad.json', { encoding: 'utf8' }),
    parser(),
    pick({ filter: 'result' }),
    ignore({ filter: /huge/ }),
    streamArray(),
    data => console.log(data),
  ])
}

try {
  main()
} catch (error) {
  console.error('ERROR:', error)
}
