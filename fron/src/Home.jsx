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
          <Row type='flex' justify='space-around' align='middle' style={{ flex: '1 0', height: '100vh' }}>
            <Col xl={{ span: 16 }} lg={{ span: 14 }} xs={{ span: 24 }} style={{ padding: '60px' }}>
              <h1>非机翻</h1>
              <Divider />
              <p>你的， 便值得分享</p>
            </Col>
            <Col xl={{ span: 8 }} lg={{ span: 10 }} xs={{ span: 24 }} style={{ padding: '60px' }}>
              <Login />
            </Col>
          </Row>
        </div>

        <Row type='flex' justify='center' align='middle' style={{ height: '100vh', backgroundColor: '#2b3137', flexDirection: 'column' }}>
          <p style={{ fontSize: '45px', color: '#fff' }}>A better way to translate together</p>
          <p style={{ fontSize: '25px', color: '#fff' }}>A better way to translate together</p>
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
