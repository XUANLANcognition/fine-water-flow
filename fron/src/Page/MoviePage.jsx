import React, { Component } from 'react'
import { Layout, Row, Col, Typography, List, Divider, BackTop } from 'antd'
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
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xxl={{ span: 11, offset: 4 }} xl={{ span: 13, offset: 2 }} xs={{ span: 22, offset: 1 }}>
              <Title level={4}>FWF 全库</Title>
              <Divider />
              <List
                itemLayout='vertical'
                loading={this.state.loading}
                grid={{
                  gutter: 28,
                  xs: 1,
                  sm: 2,
                  md: 2,
                  lg: 2,
                  xl: 2,
                  xxl: 2
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
                    <div style={{ padding: '20px 0px' }}>
                      <Link to={'/movie/' + item.id} >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '16px', color: '#3377aa' }}>
                              {item.title}
                            </div>
                          </div>
                          <div alt={item.title} style={{ width: '32%', paddingBottom: '46%', borderRadius: '10px', backgroundClip: 'border-box', backgroundSize: 'contain', backgroundPosition: 'center', backgroundImage: `url(${item.cover})` }} />
                        </div>
                      </Link>
                      <div style={{ fontSize: '14px', color: 'grey', paddingTop: '5px' }}>
                        {item.overview && item.overview.slice(0, 42) + '...'}
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
