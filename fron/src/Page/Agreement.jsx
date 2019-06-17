import React, { Component } from 'react'
import { Layout, Typography, Row, Col } from 'antd'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

const { Title, Paragraph } = Typography

class Agreement extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#fff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
              <Typography>
                <Title>Introduction</Title>
                <Paragraph>
              1.邮箱可以填假的，反正我也没配置邮件服务器（以后还是有可能的）;
                </Paragraph>
                <Paragraph>
              2.密码在后台已加盐“哈希”，放心食用，当然用简单口令（如123456，admin）也没限制;
                </Paragraph>
                <Paragraph>
              3.感谢过来
                </Paragraph>
                <Paragraph>
              4.我肝不动了...
                </Paragraph>
              </Typography>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Agreement
