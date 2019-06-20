import React, { Component } from 'react'
import { Layout, Row, Col, Card, List } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import Advertisement from '../Advertisement'
import CategoryList from '../CategoryList'

const { Meta } = Card
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
            <Col xxl={{ span: 11, offset: 4 }} xl={{ span: 13, offset: 2 }} xs={{ span: 22, offset: 1 }}>
              <List
                loading={this.state.loading}
                grid={{
                  gutter: 28,
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
                      <div>
                        <div alt={item.title} style={{ width: '128px', paddingBottom: '133%', borderRadius: '5px', backgroundClip: 'border-box', backgroundSize: 'contain', backgroundPosition: 'center', backgroundImage: `url(${item.cover})` }} />
                        <br />
                        {item.title.slice(0, 6) + '...'}
                      </div>
                    </Link>
                  </List.Item>
                )}
              />
            </Col>
            <Col xxl={{ span: 4, offset: 1 }} xl={{ span: 6, offset: 1 }} xs={{ span: 22, offset: 1 }}>
              <CategoryList />
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
