import React, { Component } from 'react'
import { Layout, Row, Col, Typography, Card, Divider, Tag, List } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import Advertisement from '../Advertisement'

const { Meta } = Card
const { Title } = Typography
const count = 8

class BookPage extends Component {
  page = 1
  state = {
    data: [],
    cache: [],
    loading: true
  }

  componentDidMount = async (v) => {
    await this.getData()
    this.setState({ loading: false })
  }

  getData = async (v) => {
    try {
      const response = await axios.get(
        'https://finewf.club:8080/api/books/?format=json' + '&page=' + this.page + '&page_size=' + count
      )
      this.setState({ data: response.data.results, cache: response.data.results })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xl={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
              <Title level={2}>品读 | 书籍</Title>
              <Divider>标签区</Divider>
              <Row style={{ paddingTop: '3px', paddingBottom: '3px' }}>
                <Col xl={{ span: 1, offset: 0 }} xs={{ span: 2, offset: 0 }}>
                  文学
                </Col>
                <Col xl={{ span: 23, offset: 0 }} xs={{ span: 21, offset: 1 }}>
                  <div>
                    <Tag color='#f50'>#f50</Tag>
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
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xl={{ span: 12, offset: 3 }} xs={{ span: 22, offset: 1 }}>
              <List
                grid={{
                  gutter: 24,
                  xs: 2,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 4,
                  xxl: 6
                }}
                size='large'
                dataSource={this.state.cache}
                pagination={{
                  onChange: page => {
                    console.log(page)
                  },
                  pageSize: 8
                }}
                renderItem={item => (
                  <List.Item>
                    <Link to={'/book/' + item.id}>
                      <Card
                        style={{ borderRadius: '10px' }}
                        loading={this.state.loading}
                        hoverable
                        cover={<img alt='example' src={item.cover} style={{ borderRadius: '10px', maxHeight: '180px' }} />}
                      >
                        <Meta title={item.title} description={item.author.slice(0, 5) + '...'} />
                      </Card>
                    </Link>
                  </List.Item>
                )}
              />
            </Col>
            <Col xl={{ span: 5, offset: 1 }} xs={{ span: 22, offset: 1 }}>
              <Advertisement />
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}
export default BookPage
