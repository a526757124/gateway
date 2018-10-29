import env from './env'

const DEV_URL = 'http://118.31.32.168:10001/'
const PRO_URL = 'http://118.31.32.168:10001/'

export default env === 'development' ? DEV_URL : PRO_URL
