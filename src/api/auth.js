import axios from 'axios'

const login = async (data) => {
  const res = await axios({
    method: 'post',
    url: `login`,
    data
  })
  return res.data
}

const role = async () => {
  const res = await axios({
    method: 'get',
    url: `role`
  })
  return res.data
}

export default {
  login,
  role
}
