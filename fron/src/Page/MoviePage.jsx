import React, { Component } from 'react'
import { Layout, Row, Col, Typography, List, Descriptions, BackTop } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import Advertisement from '../Advertisement'
import CategoryList from '../CategoryList'

const count = 12
const { Title } = Typography

class MoviePage extends Component {
  page = 1
  state = {
    cache: [],
    selectedTags: [],
    loading: true,
    count: 0
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
      const temp = []
      for (let index = 0; index < response.data.count; index++) {
        temp.push({ title: '', cover: '', author: '', id: index })
      }
      this.setState({
        cache: temp
      })
      for (let index = 0; index < response.data.results.length; index++) {
        temp[index] = response.data.results[index]
      }
      this.setState({
        cache: temp,
        count: response.data.count
      })
      const responseTag = await axios.get(
        'https://finewf.club:8080/api/bookblocks/?format=json' + (this.state.selectedTags.length === 0 ? '' : '123')
      )
      this.setState({ tags: responseTag.data })
    } catch (error) {
      console.log(error)
    }
  }

  handleMovie = async (page) => {
    this.setState({
      loading: true
    })
    try {
      const response = await axios.get(
        'https://finewf.club:8080/api/movies/?format=json' + '&page=' + page + '&page_size=' + count
      )
      let temp = this.state.cache
      let i = (page - 1) * count
      for (let index = 0; index < response.data.results.length; index++) {
        temp[i] = response.data.results[index]
        i++
      }
      this.setState({
        cache: temp,
        loading: false
      })
      console.log(this.state.cache)
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <BackTop />
        <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
          <Row style={{ paddingBottom: '30px' }}>
            <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }} />
          </Row>
          <Row style={{ paddingTop: '0px', paddingBottom: '30px' }}>
            <Col xxl={{ span: 11, offset: 4 }} xl={{ span: 13, offset: 2 }} xs={{ span: 22, offset: 1 }} style={{ paddingTop: '0px', paddingBottom: '30px' }}>
              <Title level={4} style={{ padding: '10px 0' }}>FWF 全库 ({this.state.cache.length})</Title>
              <List
                itemLayout='vertical'
                loading={this.state.loading}
                grid={{
                  gutter: 28,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1
                }}
                pagination={{
                  pageSize: count,
                  total: this.state.count,
                  showQuickJumper: true,
                  onChange: this.handleMovie
                }}
                size='large'
                dataSource={this.state.cache}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <div style={{ padding: '20px', background: '#f7f7f7', borderRadius: '20px' }}>
                      <Link to={'/movie/' + item.id} >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '16px', color: '#3377aa', marginBottom: '15px' }}>
                              {item.title}
                            </div>
                            <Descriptions
                              border
                              column={1}
                            >

                              <Descriptions.Item label='集数'>{item.number}</Descriptions.Item>
                              <Descriptions.Item label='单集片长'>{item.number}</Descriptions.Item>
                              <Descriptions.Item label='制片国家/地区'>{item.region}</Descriptions.Item>
                            </Descriptions>
                          </div>
                          <img alt={item.title} src={item.cover} style={{ width: '135px', maxHeight: '200px' }} />
                        </div>
                      </Link>
                      <div style={{ fontSize: '14px', color: 'grey', paddingTop: '5px' }}>
                        {item.overview && item.overview.slice(0, 96) + '......'}
                      </div>
                    </div>
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
