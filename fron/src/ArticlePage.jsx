import React, { Component } from 'react'
import { Card, Row, Col, Layout, Form, Spin } from 'antd'
import axios from 'axios'

import Nav from './Nav'
import Myfooter from './Myfooter'

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
      loading: true
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
          loading: false
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
          <Col xl={{ span: 18, offset: 3 }} lg={{ span: 7, offset: 1 }} xs={{ span: 24 }}>
            <div type='flex' style={{ flex: '1 0', background: '#fff' }}>
              <Card bordered={false} style={{ fontSize: '18px', marginTop: '0' }}>
                <div style={{ overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: this.state.content }} />
              </Card>
              <div style={{ textAlign: 'center' }}>
                <Spin spinning={this.state.loading} size='large' tip='loading...' />
              </div>
            </div>
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(ArticlePage)
