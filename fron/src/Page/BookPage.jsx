import React, { Component } from 'react'
import { Layout, Row, Col, Typography, Card, Divider, Tag, List } from 'antd'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

const { Meta } = Card
const { Title } = Typography

const data = [
  {
    title: '小王子',
    src: 'https://img3.doubanio.com/view/subject/l/public/s1103152.jpg'
  },
  {
    title: '明朝那些事儿',
    src: 'https://img3.doubanio.com/view/subject/l/public/s28322202.jpg'
  },
  {
    title: '人类简史',
    src: 'https://img3.doubanio.com/view/subject/l/public/s27814883.jpg'
  }
]

class BookPage extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xl={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
              <Title level={2}>品读 —— 书籍</Title>
              <Divider>标签区</Divider>
              <Row style={{ paddingTop: '3px', paddingBottom: '3px' }}>
                <Col xl={{ span: 1, offset: 0 }} xs={{ span: 2, offset: 0 }}>
                  文学
                </Col>
                <Col xl={{ span: 23, offset: 0 }} xs={{ span: 21, offset: 1 }}>
                  <div>
                    <Tag color='#f50'>#f50</Tag>
                    <Tag color='#2db7f5'>#2db7f5</Tag>
                    <Tag color='#87d068'>#87d068</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                    <Tag color='#f50'>#f50</Tag>
                    <Tag color='#2db7f5'>#2db7f5</Tag>
                    <Tag color='#87d068'>#87d068</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                    <Tag color='#f50'>#f50</Tag>
                    <Tag color='#2db7f5'>#2db7f5</Tag>
                    <Tag color='#87d068'>#87d068</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                  </div>
                </Col>
              </Row>
              <Row style={{ paddingTop: '3px', paddingBottom: '3px' }}>
                <Col xl={{ span: 1, offset: 0 }} xs={{ span: 2, offset: 0 }}>
                  科技
                </Col>
                <Col xl={{ span: 23, offset: 0 }} xs={{ span: 21, offset: 1 }}>
                  <div>
                    <Tag color='#f50'>#f50</Tag>
                    <Tag color='#2db7f5'>#2db7f5</Tag>
                    <Tag color='#87d068'>#87d068</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                    <Tag color='#108ee9'>#108ee9</Tag>
                  </div>
                </Col>
              </Row>
              <Divider />
              <List
                grid={{
                  gutter: 16,
                  xs: 2,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 8
                }}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Card
                      hoverable
                      cover={<img alt='example' src={item.src} />}
                    >
                      <Meta title={item.title} description={item.description} />
                    </Card>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}
export default BookPage
