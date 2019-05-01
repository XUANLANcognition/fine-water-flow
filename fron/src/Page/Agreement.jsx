import React, { Component } from 'react'
import { Layout, Typography, Divider } from 'antd'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

const { Title, Paragraph, Text } = Typography

class Agreement extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', padding: '60px', backgroundColor: '#fff' }}>
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
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Agreement
