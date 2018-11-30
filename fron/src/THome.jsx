import React, { Component } from 'react'
import { Layout, Row, Col, Divider, Modal } from 'antd'

import Nav from './Nav'
import Advertisement from './Advertisement'
import ArticleList from './ArticleList'
import Myfooter from './Myfooter'
import ProfileCard from './ProfileCard'
import Editor from './Editor'

class THome extends Component {
  state = {
    collapsed: false,
    visible: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
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
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f6f6f6' }}>

        <Nav />
        <Modal
          style={{ top: 20 }}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
          <Editor />
        </Modal>

        <Row style={{ flex: '1 0', padding: '60px' }}>
          <Col span={16} style={{ paddingRight: '100px' }} >
            <ArticleList />
          </Col>
          <Col span={8} >
            <ProfileCard callback={this.showModal} />
            <Divider style={{ width: '300px' }} />
            <Advertisement />
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default THome
