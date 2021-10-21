const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const xlsx = require('node-xlsx')
const app = express()
app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json())
app.use(cookieParser())

const getTableData = (tableName) => {
  const { data } = xlsx.parse(`${__dirname}/data/${tableName}.xlsx`)[0]
  const title = data.shift()
  /* 格式化数组对象形式 */
  return data.map((row) => {
    const item = {}
    row.forEach((val, index) => {
      item[title[index]] = val
    })
    return item
  })
}

const setTableData = (tableName, data = []) => {
  /* 将数组对象格式回目标数组格式 */
  const title = Object.keys(data[0])
  const list = data.map((item) => Object.values(item))
  const buffer = xlsx.build([{ name: tableName, data: [title, ...list] }])
  fs.writeFileSync(`${__dirname}/data/${tableName}.xlsx`, buffer)
}

app.all('/*', function (req, res, next) {
  const { url, cookies } = req
  if (url.includes('login') || cookies.role) {
    next()
  } else {
    res.status(401).send({ err: '登录超时' })
  }
})

app.post('/login', function (req, res) {
  // console.log('==> req', req.cookies, req.signedCookies, req.query, req.params, req.body)
  const { username, password } = req.body
  const data = getTableData('user')
  const { role } = data.find((val) => val.username === username && val.password === password)
  res.cookie('role', role, { maxAge: 30 * 60 * 1000, httpOnly: true, path: '/' })
  res.send({ role })
})

app.get('/role', function (req, res) {
  console.log('==> req', req.cookies)
  res.status(200).send(req.cookies.role)
})

app.get('/list', function (req, res) {
  const data = getTableData('phone')
  res.status(200).send(data)
})

app.get('/detail', function (req, res) {
  const { id } = req.query
  const data = getTableData('phone')
  const item = data.find((item) => item.id === id)
  res.status(200).send(item)
})

app.post('/add', function (req, res) {
  const { id, name, price, brand } = req.body
  const data = getTableData('phone')
  if (data.some((item) => item.id === id)) {
    return res.status(500).send({ message: '已存在相同id的数据' })
  }
  data.push({ id, name, price, brand })
  setTableData('phone', data)
  res.status(200).send({ message: '添加成功' })
})

app.post('/update', function (req, res) {
  const { id, name, price, brand } = req.body
  const data = getTableData('phone')
  const item = data.find((item) => item.id === id)
  item.name = name
  item.price = price
  item.brand = brand
  setTableData('phone', data)
  res.status(200).send({ message: '更新成功' })
})

app.get('/remove', function (req, res) {
  const { id } = req.query
  const data = getTableData('phone')
  const index = data.findIndex((item) => item.id === id)
  const newList = [...data.slice(0, index), ...data.slice(index + 1, data.length)]
  setTableData('phone', newList)
  res.status(200).send({ message: '删除成功' })
})

app.listen(3000, console.log('==> server listen:3000'))
