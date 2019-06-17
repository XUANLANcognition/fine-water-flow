import React, { Component } from 'react'
import { Layout, Row, Col, Typography, Card, Tag, List, Collapse, Icon } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import Advertisement from '../Advertisement'

const { Meta } = Card
const CheckableTag = Tag.CheckableTag
const { Title } = Typography
const count = 128
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
}
const Panel = Collapse.Panel

class BookPage extends Component {
  page = 1
  state = {
    data: [],
    cache: [],
    selectedTags: [],
    loading: true,
    tags: []
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
      const responseTag = await axios.get(
        'https://finewf.club:8080/api/bookblocks/?format=json'
      )
      this.setState({ tags: responseTag.data })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = async (tag, checked) => {
    const { selectedTags } = this.state
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag)
    await this.setState({
      selectedTags: nextSelectedTags,
      loading: true
    })
    if (nextSelectedTags.length !== 0) {
      const temp = []
      for (let i of nextSelectedTags) {
        temp.push(i.id)
      }
      const fliterTag = '&tag=' + temp.join('&tag=')
      try {
        const response = await axios.get(
          'https://finewf.club:8080/api/books/?format=json' + '&page=' + this.page + '&page_size=' + count + fliterTag
        )
        this.setState({ data: response.data.results, cache: response.data.results, loading: false })
      } catch (error) {
        console.log(error)
      }
    } else {
      this.getData()
      this.setState({
        loading: false
      })
    }
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
              <Collapse
                bordered={false}
                defaultActiveKey={['']}
                expandIcon={({ isActive }) => <Icon type='caret-right' rotate={isActive ? 90 : 0} />}
              >
                <Panel header={<Title level={4}>全部标签</Title>} key='1' style={customPanelStyle}>
                  <List
                    size='small'
                    dataSource={this.state.tags}
                    renderItem={item => (
                      <List.Item>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ backgroundColor: '#ff5c38', borderRadius: '16px 0 16px 16px', padding: '5px 15px', color: 'white', margin: '0 24px 0 0' }}>{item.title}
                          </span>
                          {item.tags.map(tag => (
                            <CheckableTag
                              style={{ padding: '5px 10px', borderRadius: '20px' }}
                              key={tag}
                              checked={this.state.selectedTags.indexOf(tag) > -1}
                              onChange={checked => this.handleChange(tag, checked)}
                            >
                              {tag.title}
                            </CheckableTag>
                          ))}
                        </div>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
            </Col>
          </Row>
          <Row style={{ paddingTop: '0px', paddingBottom: '30px' }}>
            <Col xxl={{ span: 11, offset: 4 }} xl={{ span: 13, offset: 2 }} xs={{ span: 22, offset: 1 }}>
              <List
                loading={this.state.loading}
                grid={{
                  gutter: 12,
                  xs: 2,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 4,
                  xxl: 5
                }}
                size='large'
                dataSource={this.state.cache}
                pagination={{
                  onChange: page => {
                    console.log(page)
                  },
                  pageSize: 12
                }}
                renderItem={item => (
                  <List.Item>
                    <Link to={'/book/' + item.id}>
                      <Card
                        style={{ borderRadius: '10px' }}
                        loading={this.state.loading}
                        hoverable
                        cover={<img alt='example' src={item.cover} style={{ borderRadius: '10px', maxHeight: '160px' }} />}
                      >
                        <Meta title={item.title} description={item.author.slice(0, 5) + '...'} />
                      </Card>
                    </Link>
                  </List.Item>
                )}
              />
            </Col>
            <Col xxl={{ span: 4, offset: 1 }} xl={{ span: 6, offset: 1 }} xs={{ span: 22, offset: 1 }}>
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
