const express = require('express')

const app = express()

app.get('/', async (req, res) => {
  console.log('hello')
  res.send('hello')
})

app.get('/list', async (req, res) => {
  console.log('json')
  res.json([
    ['a', 'aaa'],
    ['b', 'bb'],
  ])
})

app.listen(80, () => {
  console.log('www.bootcdn.cn:80')
})
