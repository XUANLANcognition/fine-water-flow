import React, { Component } from 'react'
import { Row, Col, Layout, Form, Spin, Affix, Tag, Typography } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'

import Nav from './Nav'
import Myfooter from './Myfooter'
import AuthorShowCard from './AuthorShowCard'
import Advertisement from './Advertisement'
import AddComment from './AddComment'

const { Paragraph } = Typography

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
        'https://finewf.club:8080/api/articles/' + this.props.match.params.id
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
          <Col xl={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
            <div style={{ fontSize: '25px', fontWeight: 'bold', color: 'black', padding: '24px 0 24px 0' }}>
              <Paragraph ellipsis={{ rows: 1, expandable: true }} strong>
                {this.state.title}
              </Paragraph>
            </div>
          </Col>
        </Row>
        <Row style={{ flex: '1 0' }} >
          <Col xl={{ span: 12, offset: 3 }} xs={{ span: 22, offset: 1 }}>
            <div type='flex' style={{ flex: '1 0', background: '#fff' }}>
              <div style={{ fontSize: '16px' }}>
                <div style={{ overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: this.state.content }} />
                <Tag style={{ marginTop: '10px' }} color='#108ee9'>编辑于 {dayjs(this.state.pubDate).fromNow()}</Tag>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Spin spinning={this.state.loading} size='large' tip='loading...' />
              </div>
              <AddComment authorId={this.state.authorId} articleId={this.state.id} articleUrl={this.state.url} />
            </div>
          </Col>
          <Col xl={{ span: 5, offset: 1 }} xs={{ span: 22, offset: 1 }} style={{ paddingBottom: '20px' }}>
            <Advertisement />
            <Affix offsetTop={0}>
              <AuthorShowCard authorId={this.state.authorId} />
            </Affix>
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(ArticlePage)
