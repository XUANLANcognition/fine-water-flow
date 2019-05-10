import React, { Component } from 'react'
import { Layout, Timeline, Row, Col } from 'antd'

import Nav from './Nav'
import Myfooter from './Myfooter'

class Notice extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xl={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
              <Timeline>
                <Timeline.Item color='blue'>🎉 关注功能正式上线. ( 2019.05.10 )</Timeline.Item>
                <Timeline.Item color='blue'>🎂 正式更名为Fine Water Flow. ( 2019.05.09 )</Timeline.Item>
                <Timeline.Item color='blue'>🎉 关注功能即将上线. </Timeline.Item>
                <Timeline.Item color='blue'>🐱‍🏍 功能疯狂诞生中...</Timeline.Item>
                <Timeline.Item color='blue'>用户说：“要有头像.”</Timeline.Item>
                <Timeline.Item color='blue'>基本文章发布功能完成</Timeline.Item>
                <Timeline.Item color='green'>🎂🎂🎂 项目诞生了！！！ ( 2018.11.29 )</Timeline.Item>
              </Timeline>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Notice
