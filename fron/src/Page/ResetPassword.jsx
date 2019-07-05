import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

class ResetPassword extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
              此功能还没写...
              <br />
              忘了密码直接发我邮件
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default ResetPassword
