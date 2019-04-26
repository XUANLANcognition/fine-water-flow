import React, { Component } from 'react'
import { Card, Row, Col, Layout, Modal, Timeline, Button, Affix, Form, Spin } from 'antd'
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
        <Affix offsetTop={0}>
          <Card bordered={false} style={{ fontSize: '25px', fontWeight: 'bold', color: 'black', paddingLeft: '100px' }}>
            {this.state.title}
          </Card>
        </Affix>
        <div type='flex' style={{ flex: '1 0', background: '#ECECEC', padding: '0px 100px 0px 100px' }}>
          <Card bordered={false} style={{ fontSize: '18px', marginTop: '15px' }}>
            <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
          </Card>
          <div style={{ textAlign: 'center' }}>
            <Spin spinning={this.state.loading} size='large' tip='loading...' />
          </div>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(ArticlePage)
