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
        <div style={{ height: '100vh', background: '#55b9f3' }}>
          <Nav />
          <div>
            <Row type='flex' align='middle' style={{ flex: '1 0', height: '80vh' }}>
              <Col xxl={{ span: 11, offset: 4 }} xl={{ span: 13, offset: 2 }} xs={{ span: 22, offset: 1 }}>
                <Title style={{color: '#f5f5f5', fontSize: '52px', fontWeight: 'bold'}}>Fine Water Flow</Title>
                <Title style={{color: '#f5f5f5', fontWeight: 'bold'}} level={3}>细水长流</Title>
              </Col>
              <Col xxl={{ span: 5, offset: 1 }} xl={{ span: 6, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                <div style={{padding: '86px 20px', backgroundColor: '#55b9f3', borderRadius: '22px', boxShadow: '41px 41px 82px #479bcc, -41px -41px 82px #55b9f3'}}>
                  <Login />
                </div>
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
