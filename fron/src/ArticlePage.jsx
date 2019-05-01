import React, { Component } from 'react'
import { Card, Row, Col, Layout, Form, Spin, Affix, Tag } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'

import Nav from './Nav'
import Myfooter from './Myfooter'
import AuthorShowCard from './AuthorShowCard'
import Advertisement from './Advertisement'

class ArticlePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'loading...',
      content: '',
      id: '',
      url: '',
      translationList: [],
      visible: false,
      modalTitle: '',
      modalContent: '',
      loading: true,
      authorId: '',
      pubDate: ''
    }
  }

  componentDidMount = async (v) => {
    await this.getArticle()
  }

  getArticle = async (v) => {
    try {
      const response = await axios.get(
        'https://guoliang.online:8080/api/articles/' + this.props.match.params.id
      )
      this.setState(function (state) {
        return {
          title: response.data.title,
          content: response.data.content,
          id: response.data.id,
          url: response.data.url,
          loading: false,
          authorId: response.data.user.id,
          pubDate: response.data.pub_date
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Nav />
        <Row >
          <Col xl={{ span: 18, offset: 3 }} lg={{ span: 7, offset: 1 }} xs={{ span: 24 }}>
            <Card bordered={false} style={{ fontSize: '25px', fontWeight: 'bold', color: 'black' }}>
              {this.state.title}
            </Card>
          </Col>
        </Row>
        <Row style={{ flex: '1 0' }} >
          <Col xl={{ span: 12, offset: 3 }} xs={{ span: 24 }}>
            <div type='flex' style={{ flex: '1 0', background: '#fff' }}>
              <Card bordered={false} style={{ fontSize: '18px', marginTop: '0' }}>
                <div style={{ overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: this.state.content }} />
                <Tag color='#108ee9'>编辑于 {dayjs(this.state.pubDate).fromNow()}</Tag>
              </Card>
              <div style={{ textAlign: 'center' }}>
                <Spin spinning={this.state.loading} size='large' tip='loading...' />
              </div>
            </div>
          </Col>
          <Col xl={{ span: 5, offset: 1 }} xs={{ span: 20, offset: 2 }} style={{ paddingBottom: '20px' }}>
            <Affix offsetTop={0}>
              <AuthorShowCard authorId={this.state.authorId} />
            </Affix>
            <Advertisement />
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(ArticlePage)
