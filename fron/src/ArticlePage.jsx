import React, { Component } from 'react'
import { Card, Row, Col, Layout, Modal, Timeline, Button, Affix, Form, Spin } from 'antd'
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
    this.getTranslation()
  }

  getArticle = async (v) => {
    try {
      const response = await axios.get(
        'https://guoliang.online:8080/api/article/' + this.props.match.params.id
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

  getTranslation = async (v) => {
    try {
      const response = await axios.get(
        'https://guoliang.online:8080/api/translate/?format=json&article=' + this.state.id
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

  gotoTranslationEditorPage = () => {
    this.props.history.replace('/' + this.props.match.params.id + '/translationEditorPage')
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
            <div style={{ textAlign: 'center' }}>
              <Spin spinning={this.state.loading} size='large' tip='loading...' />
            </div>
            <Card title={this.state.title} bordered={false} >
              <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
            </Card>
          </Col>
          <Col span={12}>
            <Affix offsetTop={0}>
              <Card title='Action' bordered={false} style={{ background: '#ECECEC', margin: '0px 60px 30px 60px', borderRadius: '1rem' }}>
                <Button type='primary' size={'small'} style={{ marginRight: '10px' }} onClick={this.gotoTranslationEditorPage}>Translate</Button>
                <Button type='primary' size={'small'} style={{ marginRight: '10px' }}>Issues</Button>
                <Button type='primary' size={'small'} style={{ marginRight: '10px' }}>Primary</Button>
              </Card>
            </Affix>
            <Timeline style={{ padding: '60px' }}>
              {this.state.translationList.map((node, index) =>
                <Timeline.Item type='flex' justify='space-around' color='green'>
                  <a href={'/' + this.state.id + '/translation/' + node.id}>{'click to ' + index + '  :  ' + node.title}</a>
                  <Button type='primary' style={{ marginLeft: '10px' }} onClick={(title, content) => this.showModal(node.title, node.content)}>{index + '  :  ' + node.title}</Button>
                </Timeline.Item>
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
          <div dangerouslySetInnerHTML={{ __html: this.state.modalContent }} />
        </Modal>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(ArticlePage)
