import React, { Component } from 'react'
import { Layout, Row, Col, Divider } from 'antd'

import Login from './Login'
import Nav from './Nav'
import Myfooter from './Myfooter'

class Home extends Component {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>

        <Nav />

        <Row style={{ flex: '1 0' }}>
          <Col span={16} style={{ padding: '60px' }}>
            <h1>非机翻</h1>
            <Divider />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
          </Col>
          <Col span={8} style={{ padding: '60px' }}>
            <Login />
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Home
