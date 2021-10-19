import axios from 'axios'

const list = async () => {
  const res = await axios({
    method: 'get',
    url: `list`
  })
  return res.data
}

const add = (data) => {
  return axios({
    method: 'post',
    url: `add`,
    data
  })
}

const remove = (params) => {
  return axios({
    method: 'get',
    url: `remove`,
    params
  })
}

const detail = (params) => {
  return axios({
    method: 'get',
    url: `detail`,
    params
  })
}

const update = (data) => {
  return axios({
    method: 'post',
    url: `update`,
    data
  })
}

export default {
  list,
  add,
  remove,
  detail,
  update
}
