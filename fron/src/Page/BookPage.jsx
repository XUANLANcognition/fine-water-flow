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
      selectedTags: nextSelectedTags
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
        this.setState({ data: response.data.results, cache: response.data.results })
      } catch (error) {
        console.log(error)
      }
    } else {
      this.getData()
    }
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xl={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
              <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <Icon type='caret-right' rotate={isActive ? 90 : 0} />}
              >
                <Panel header={<Title level={4}>热门标签</Title>} key='1' style={customPanelStyle}>
                  <List
                    loading={this.state.loading}
                    size='small'
                    dataSource={this.state.tags}
                    renderItem={item => (
                      <List.Item>
                        <span style={{ backgroundColor: '#7f7f8b', borderRadius: '16px 0 16px 16px', padding: '5px 15px', color: 'white', margin: '0 24px' }}>{item.title}
                        </span>
                        <List
                          loading={this.state.loading}
                          size='small'
                          grid={{
                            gutter: 72,
                            xs: 3,
                            xl: 8,
                            xxl: 8
                          }}
                          dataSource={item.tags}
                          renderItem={tag => (
                            <List.Item>
                              <CheckableTag
                                key={tag}
                                checked={this.state.selectedTags.indexOf(tag) > -1}
                                onChange={checked => this.handleChange(tag, checked)}
                              >
                                {tag.title}
                              </CheckableTag>
                            </List.Item>
                          )}
                        />
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
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
