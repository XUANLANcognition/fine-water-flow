import React, { Component } from 'react'
import { Layout, Typography, Row, Col } from 'antd'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

const { Title, Paragraph } = Typography

class EditorGuidance extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#fff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
              <Typography>
                <Title level={3}>FWF 编辑须知</Title>
                <Paragraph strong style={{ fontSize: '18px' }}>
                  1. 本站资源定位 : 优质作品的收纳
                </Paragraph>
                <Paragraph strong style={{ fontSize: '18px' }}>
                  2. 首先声明，相比较互怼我更喜欢雅俗共赏，但鉴于本站定位不包含”俗“,故以下举数枚书籍、影视反例：
                </Paragraph>
                <Paragraph>
                  * 修仙型 : 《斗破苍穹》（此项只是值书籍，改编动漫不属于反例范畴）
                  <br /><br />
                  * 瞎三观幻想型 : 各种《霸道总裁》类
                  <br /><br />
                  * 不可言喻型 : 就不明说了
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

export default EditorGuidance
