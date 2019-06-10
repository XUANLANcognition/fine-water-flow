import React, { Component } from 'react'
import { Layout, Row, Col, Typography, Card, Divider, Tag, List } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import Advertisement from '../Advertisement'

const { Meta } = Card
const CheckableTag = Tag.CheckableTag
const { Title } = Typography
const count = 8
const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports']

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
            <Col xl={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
              <Title level={2}>观赏 | 影视</Title>
              <div style={{ backgroundColor: '#f8f8f8', borderRadius: '10px', padding: '20px' }}>
                <Row style={{ paddingTop: '3px', paddingBottom: '3px' }}>
                  <div>
                    <h5 style={{ marginRight: 8, display: 'inline', backgroundColor: '#7f7f8b', borderRadius: '16px 0 16px 16px', padding: '10px', color: 'white' }}>Categories:</h5>
                    {tagsFromServer.map(tag => (
                      <CheckableTag
                        key={tag}
                        checked={this.state.selectedTags.indexOf(tag) > -1}
                        onChange={checked => this.handleChange(tag, checked)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                  </div>
                </Row>
                <Row style={{ paddingTop: '30px', paddingBottom: '3px' }}>
                  <div>
                    <h5 style={{ marginRight: 8, display: 'inline', backgroundColor: '#7f7f8b', borderRadius: '16px 0 16px 16px', padding: '10px', color: 'white' }}>Categories:</h5>
                    {tagsFromServer.map(tag => (
                      <CheckableTag
                        key={tag}
                        checked={this.state.selectedTags.indexOf(tag) > -1}
                        onChange={checked => this.handleChange(tag, checked)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                  </div>
                </Row>
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: '0px', paddingBottom: '30px' }}>
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
                  pageSize: 8
                }}
                renderItem={item => (
                  <List.Item>
                    <Link to={'/movie/' + item.id}>
                      <Card
                        style={{ borderRadius: '10px' }}
                        loading={this.state.loading}
                        hoverable
                        cover={<img alt='example' src={item.cover} style={{ borderRadius: '10px', maxHeight: '180px' }} />}
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
