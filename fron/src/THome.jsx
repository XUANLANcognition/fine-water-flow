import React, { Component } from 'react'
import { Layout, Row, Col, Divider, Form, Affix } from 'antd'
import { withRouter } from 'react-router'

import Nav from './Nav'
import Advertisement from './Advertisement'
import ArticleList from './ArticleList'
import Myfooter from './Myfooter'
import ProfileCard from './ProfileCard'

class THome extends Component {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  goToEditorPage = () => {
    this.props.history.replace('/textEditorPage')
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f6f6f6' }}>
        <Nav />
        <Row style={{ flex: '1 0', padding: '60px' }}>
          <Col xl={{ span: 16 }} lg={{ span: 14 }} style={{ paddingRight: '100px' }} >
            <ArticleList />
          </Col>
          <Col xl={{ span: 8 }} lg={{ span: 10 }} >
            <Affix offsetTop={0}>
              <ProfileCard callback={this.goToEditorPage} />
            </Affix>
            <Divider />
            <Advertisement />
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

const THomer = withRouter(Form.create()(THome))

export default THomer
