import axios from 'axios'
import env from '../config/env'
import auth from './auth'
import phone from './phone'
axios.defaults.baseURL = env.baseURL
axios.defaults.withCredentials = true

export default {
  ...auth,
  ...phone
}
