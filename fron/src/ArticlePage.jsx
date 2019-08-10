import React, { Component } from 'react'
import { Row, Col, Layout, Form, Spin, Affix, Typography, BackTop, Statistic } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import 'braft-editor/dist/output.css'

import Nav from './Nav'
import Myfooter from './Myfooter'
import AuthorShowCard from './AuthorShowCard'
import Advertisement from './Advertisement'
import AddComment from './AddComment'

const { Paragraph } = Typography
const { Title } = Typography

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
      pubDate: '',
      views: 0
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
          pubDate: response.data.pub_date,
          views: response.data.views
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
        <BackTop />
        <Row style={{ background: '#fff', padding: '20px 0', marginBottom: '15px', boxShadow: '0px 2px 2px #888888' }}>
          <Col xxl={{ span: 10, offset: 5 }} xl={{ span: 13, offset: 2 }} md={{ span: 14, offset: 1 }} xs={{ span: 22, offset: 1 }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: 'black' }}>
              <Paragraph ellipsis={{ rows: 1, expandable: true }} strong style={{ color: 'black' }}>
                {this.state.title}
              </Paragraph>
            </div>
          </Col>
          <Col xxl={{ span: 4, offset: 0 }} xl={{ span: 6, offset: 1 }} md={{ span: 7, offset: 1 }} xs={{ span: 22, offset: 1 }} style={{ paddingLeft: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Statistic title='浏览次数' suffix='次' value={this.state.views} />
              <Statistic title='发布时间' value={dayjs(this.state.pubDate).fromNow()} />
            </div>
          </Col>
        </Row>
        <Row style={{ flex: '1 0' }}>
          <Col xxl={{ span: 10, offset: 5 }} xl={{ span: 14, offset: 2 }} md={{ span: 15, offset: 1 }} xs={{ span: 22, offset: 1 }}>
            <div type='flex' style={{ flex: '1 0', background: '#fff', padding: '10px 0', marginBottom: '20px' }}>
              <div style={{ fontSize: '16px' }}>
                <div className='braft-output-content' style={{ overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: this.state.content }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <Spin spinning={this.state.loading} size='large' tip='loading...' />
              </div>
              <Title level={4} style={{ paddingTop: '20px' }}>评论 · · · · · ·</Title>
              <AddComment articleId={this.state.id} articleUrl={this.state.url} />
            </div>
          </Col>
          <Col xxl={{ span: 4, offset: 0 }} xl={{ span: 6, offset: 0 }} md={{ span: 7, offset: 0 }} xs={{ span: 22, offset: 1 }} style={{ paddingBottom: '20px', paddingLeft: '15px' }}>
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
