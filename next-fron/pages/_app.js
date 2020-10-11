import '../styles/globals.css'
import 'antd/dist/antd.css'
import '@ant-design/compatible/assets/index.css';

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
