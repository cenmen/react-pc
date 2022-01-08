const ENV_MAP = {
  DEV: 'development',
  PROD: 'production'
}

const CONFIG = {
  [ENV_MAP.DEV]: {
    baseURL: 'http://localhost:3000/'
  },
  [ENV_MAP.PROD]: {
    baseURL: 'http://localhost:3000/'
  }
}

export default CONFIG[ENV]
