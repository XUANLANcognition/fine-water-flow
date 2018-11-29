import React, { Component } from 'react'
import { Card, Row, Col, Layout, Modal, Timeline, Button, Divider } from 'antd'
import axios from 'axios'

import Nav from './Nav'
import Myfooter from './Myfooter'

class ArticlePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      id: '',
      translationList: [],
      visible: false,
      modalTitle: '',
      modalContent: ''
    }
  }

  componentDidMount = async (v) => {
    await this.getArticle()
    this.getTranslation()
  }

  getArticle = async (v) => {
    try {
      const response = await axios.get(
        '/api/article/' + this.props.match.params.id
      )
      this.setState(function (state) {
        return {
          title: response.data.title,
          content: response.data.content,
          id: response.data.id
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  getTranslation = async (v) => {
    try {
      const response = await axios.get(
        '/api/translate/?format=json&article=' + this.state.id
      )
      console.log(response)
      this.setState(function (state) {
        return {
          translationList: response.data.results
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  showModal = (title, content) => {
    this.setState({
      visible: true,
      modalTitle: title,
      modalContent: content
    })
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
        <Row style={{ padding: '30px', flex: '1 0' }}>
          <Col span={12}>
            <Card title={this.state.title} bordered={false} >
              <p>{this.state.content}</p>
            </Card>
          </Col>
          <Col span={12}>
            <Timeline style={{ padding: '60px' }}>
              {this.state.translationList.map((node, index) =>
                <Row>
                  <Timeline.Item color='green'>
                    <Button type='primary' onClick={(title, content) => this.showModal(node.title, node.content)}>{index + '  :  ' + node.title}</Button>
                  </Timeline.Item>
                </Row>
              )}
            </Timeline>
          </Col>
        </Row>
        <Modal
          style={{ top: 20 }}
          title={this.state.modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
          <p>{this.state.modalContent}</p>
        </Modal>
        <Myfooter />
      </Layout>
    )
  }
}

export default ArticlePage
