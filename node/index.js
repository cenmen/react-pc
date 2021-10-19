const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json())
app.use(cookieParser())

const ACCOUNT = [
  {
    username: '123456',
    password: '123456',
    role: 'normal'
  },
  {
    username: 'admin',
    password: 'admin',
    role: 'admin'
  }
]

const JSON_PATH = path.join(__dirname, './data/dataSource.json')

app.all('/*', function (req, res, next) {
  const { url, cookies } = req
  console.log('==> all', url, cookies)
  if (url.includes('login') || cookies.role) {
    next()
  } else {
    res.status(401).send({ err: '登录超时' })
  }
})

app.post('/login', function (req, res) {
  // console.log('==> req', req.cookies, req.signedCookies, req.query, req.params, req.body)
  const { username, password } = req.body
  const { role } = ACCOUNT.find((val) => val.username === username && val.password === password)
  // console.log('==> role', role)
  res.cookie('role', role, { maxAge: 30*60*1000, httpOnly: true, path: '/' })
  res.send({ role })
})

app.get('/role', function (req, res) {
  console.log('==> req', req.cookies)
  res.status(200).send(req.cookies.role)
})

app.get('/list', function (req, res) {
  let raw = fs.readFileSync(JSON_PATH)
  let list = JSON.parse(raw)
  res.status(200).send(list)
})

app.get('/detail', function (req, res) {
  const {id} = req.query
  let raw = fs.readFileSync(JSON_PATH)
  let list = JSON.parse(raw)
  const item = list.find(item => item.id === id)
  res.status(200).send(item)
})

app.post('/add', function (req, res) {
  const { id, name, price, brand } = req.body
  let raw = fs.readFileSync(JSON_PATH)
  let list = JSON.parse(raw)
  if (list.some(item => item.id === id)) {
    return res.status(500).send({message: '已存在相同id的数据'})
  }
  list.push({ id, name, price, brand })
  let data = JSON.stringify(list)
  fs.writeFileSync(JSON_PATH, data)
  res.status(200).send({message: '添加成功'})
})

app.post('/update', function (req, res) {
  const { id, name, price, brand } = req.body
  let raw = fs.readFileSync(JSON_PATH)
  let list = JSON.parse(raw)
  const item = list.find(item => item.id === id)
  item.name = name
  item.price = price
  item.brand = brand
  let data = JSON.stringify(list)
  fs.writeFileSync(JSON_PATH, data)
  res.status(200).send({message: '更新成功'})
})

app.get('/remove', function (req, res) {
  const {id} = req.query
  let raw = fs.readFileSync(JSON_PATH)
  let list = JSON.parse(raw)
  const index = list.findIndex(item => item.id === id)
  const newList = [...list.slice(0, index), ...list.slice(index + 1, list.length)]
  let data = JSON.stringify(newList)
  fs.writeFileSync(JSON_PATH, data)
  res.status(200).send({message: '删除成功'})
})

app.listen(3000, console.log('==> server listen:3000'))
