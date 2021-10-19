import axios from 'axios'
import auth from './auth'
import phone from './phone'
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.withCredentials = true

export default {
  ...auth,
  ...phone
}
