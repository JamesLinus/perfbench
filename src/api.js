const axios = require('axios')
const { repo, sha } = require('ci-env')
const token = require('./token')
const url = 'https://perfbench-store.now.sh/values'

let enabled = false
let values = {}

if (repo && token) {
  enabled = true
  axios
    .get(`${url}?repo=${repo}&token=${token}`)
    .then(response => (values = response.data))
    .catch(error => console.log(error))
}

const get = () => values

const set = values => {
  if (repo && token) {
    axios
      .post(url, { repo, token, sha, values })
      .catch(error => console.log(error))
  }
}

const store = { enabled, set, get }
module.exports = store
