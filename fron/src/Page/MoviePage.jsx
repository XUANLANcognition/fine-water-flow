import React, { Component } from 'react'
import { Layout, Row, Col, Typography, Card, List } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import Advertisement from '../Advertisement'

const { Meta } = Card
const { Title } = Typography
const count = 8

class MoviePage extends Component {
  page = 1
  state = {
    data: [],
    cache: [],
    selectedTags: [],
    loading: true
  }

  componentDidMount = async (v) => {
    await this.getData()
    this.setState({ loading: false })
  }

  getData = async (v) => {
    try {
      const response = await axios.get(
        'https://finewf.club:8080/api/movies/?format=json' + '&page=' + this.page + '&page_size=' + count
      )
      this.setState({ data: response.data.results, cache: response.data.results })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange (tag, checked) {
    const { selectedTags } = this.state
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag)
    console.log('You are interested in: ', nextSelectedTags)
    this.setState({ selectedTags: nextSelectedTags })
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xl={{ span: 12, offset: 3 }} xs={{ span: 22, offset: 1 }}>
              <List
                loading={this.state.loading}
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
                  pageSize: 128
                }}
                renderItem={item => (
                  <List.Item>
                    <Link to={'/movie/' + item.id}>
                      <Card
                        style={{ borderRadius: '10px' }}
                        loading={this.state.loading}
                        hoverable
                        cover={<img alt='example' src={item.cover} style={{ borderRadius: '10px', maxHeight: '160px' }} />}
                      >
                        <Meta title={item.title} />
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
export default MoviePage
