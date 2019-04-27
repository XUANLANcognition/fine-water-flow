import React, { Component } from 'react'
import { Layout, Timeline } from 'antd'

import Nav from './Nav'
import Myfooter from './Myfooter'

class Notice extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', padding: '60px', backgroundColor: '#fff' }}>
          <Timeline>
            <Timeline.Item color='blue'>用户说：“要有头像.”</Timeline.Item>
            <Timeline.Item color='blue'>基本文章发布功能完成</Timeline.Item>
            <Timeline.Item color='green'>项目诞生了！！！</Timeline.Item>
          </Timeline>,
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Notice
