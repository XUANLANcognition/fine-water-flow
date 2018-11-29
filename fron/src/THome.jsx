import React, { Component } from 'react'
import { Layout, Row, Col, Divider } from 'antd'

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

  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f6f6f6' }}>

        <Nav />

        <Row style={{ flex: '1 0' }}>
          <Col span={16} style={{ padding: '30px 60px 60px 200px' }} >
            <ArticleList />
          </Col>
          <Col span={8} style={{ padding: '30px 00px 60px 60px' }} >
            <ProfileCard />
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
