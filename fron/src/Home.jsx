import { Col, Divider, Layout, Row, Button } from 'antd'
import React, { Component } from 'react'
import Login from './Login'
import Myfooter from './Myfooter'
import Nav from './Nav'

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
        <div style={{ height: '100vh' }}>
          <Nav />
          <Row type='flex' align='middle' style={{ flex: '1 0', height: '80vh' }}>
            <Col xl={{ span: 13, offset: 2 }} xs={{ span: 22, offset: 1 }}>
              <h1>非机</h1>
              <Divider />
              <p>你的， 便值得分享</p>
            </Col>
            <Col xl={{ span: 6, offset: 1 }} xs={{ span: 22, offset: 1 }}>
              <Login />
            </Col>
          </Row>
        </div>

        <Row type='flex' justify='center' align='middle' style={{ height: '100vh', backgroundColor: '#2b3137', flexDirection: 'column' }}>
          <Col xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
            <p style={{ fontSize: '45px', color: '#fff' }}>SHARE</p>
            <p style={{ fontSize: '25px', color: '#fff' }}>A better way to share together</p>
          </Col>
        </Row>
        <Row type='flex' justify='center' align='middle' style={{ height: '100vh', flexDirection: 'column' }}>
          <p style={{ fontSize: '45px', color: 'black' }}>Join us</p>
          <Button size='large' type='primary' ghost>Learn about us -></Button>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Home
