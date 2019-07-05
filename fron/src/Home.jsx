import { Col, Divider, Layout, Row, Button, Typography } from 'antd'
import React, { Component } from 'react'
import Login from './Login'
import Myfooter from './Myfooter'
import Nav from './Nav'
import { Link } from 'react-router-dom'

const { Title } = Typography

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
        <div style={{ height: '100vh', background: '#fff' }}>
          <Nav />
          <div>
            <Row type='flex' align='middle' style={{ flex: '1 0', height: '80vh' }}>
              <Col xxl={{ span: 12, offset: 3 }} xl={{ span: 13, offset: 2 }} xs={{ span: 22, offset: 1 }}>
                <Title>Fine Water Flow</Title>
                <Divider />
                <Title level={3}>细水宜长流...</Title>
              </Col>
              <Col xxl={{ span: 5, offset: 1 }} xl={{ span: 6, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                <Login />
              </Col>
            </Row>
          </div>
        </div>
        <Row type='flex' justify='center' align='middle' style={{ height: '100vh', backgroundColor: '#2b3137', flexDirection: 'column' }}>
          <Col xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
            <p style={{ fontSize: '45px', color: '#fff' }}>SHARE</p>
            <p style={{ fontSize: '25px', color: '#fff' }}>A better way to share together</p>
          </Col>
        </Row>
        <Row type='flex' justify='center' align='middle' style={{ height: '100vh', flexDirection: 'column' }}>
          <p style={{ fontSize: '45px', color: 'black' }}>Join us</p>
          <a href='https://github.com/XUANLANcognition/fine-water-flow'>
            <Button size='large' type='primary' ghost>Learn about us -></Button>
          </a>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Home
