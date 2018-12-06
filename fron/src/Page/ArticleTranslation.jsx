import React, { Component } from 'react'
import { Layout, Form, Row, Col, Card, Spin } from 'antd'
import axios from 'axios'

import 'braft-editor/dist/index.css'
import Nav from '../Nav'
import Myfooter from '../Myfooter'

const { Content } = Layout

class ArticleTranslation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articleTitle: '',
      articleContent: '',
      translationTitle: '',
      translationContent: '',
      loadingArticle: true,
      loadingTranslation: true
    }
  }

  componentDidMount () {
    this.getArticle()
    this.getTranslation()
  }

  getArticle = async (v) => {
    try {
      const response = await axios.get(
        'https://guoliang.online:8080/api/article/' + this.props.match.params.articleId
      )
      this.setState(function (state) {
        return {
          articleTitle: response.data.title,
          articleContent: response.data.content,
          loadingArticle: false
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  getTranslation = async (v) => {
    try {
      const response = await axios.get(
        'https://guoliang.online:8080/api/translate/' + this.props.match.params.translationId
      )
      this.setState(function (state) {
        return {
          translationTitle: response.data.title,
          translationContent: response.data.content,
          loadingTranslation: false
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <Content style={{ backgroundColor: '#fff', padding: '20px 80px 20px 80px' }}>
          <Row gutter={30}>
            <Col span={12}>
              <div style={{ textAlign: 'center' }}>
                <Spin spinning={this.state.loadingArticle} size='large' tip='loading...' />
              </div>
              <Card title={this.state.articleTitle} bordered={false} >
                <div dangerouslySetInnerHTML={{ __html: this.state.articleContent }} style={{ height: '100vh', overflowY: 'scroll' }} />
              </Card>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: 'center' }}>
                <Spin spinning={this.state.loadingTranslation} size='large' tip='loading...' />
              </div>
              <Card title={this.state.translationTitle} bordered={false} >
                <div dangerouslySetInnerHTML={{ __html: this.state.translationContent }} style={{ height: '100vh', overflowY: 'scroll' }} />
              </Card>
            </Col>
          </Row>
        </Content>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(ArticleTranslation)
