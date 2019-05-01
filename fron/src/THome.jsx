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
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Nav />
        <Row style={{ flex: '1 0', padding: '60px' }}>
          <Col xl={{ span: 14, offset: 1 }} lg={{ span: 14 }} xs={{ span: 24 }} style={{ paddingBottom: '20px' }}>
            <ArticleList />
          </Col>
          <Col xl={{ span: 8, offset: 1 }} lg={{ span: 10 }} xs={{ span: 24 }}>
            <Affix offsetTop={0}>
              <ProfileCard callback={this.goToEditorPage} />
            </Affix>
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
