import React, { Component } from 'react'
import { Layout, Col, Row, Divider } from 'antd'
import axios from 'axios'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import AvatarUpload from '../AvatarUpload'

class Settings extends Component {
  componentDidMount () {
  }

  state = {
    data: [],
    collapsed: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  getProfileData = async (v) => {
    try {
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      const response = await axios.get(
        'https://guoliang.online:8080/api/users/' + window.localStorage.getItem('user_id') + '?format=json',
        config
      )
      this.data = response.data.results
      this.setState(function (state) {
        return { urlAvatar: response.data.last_name }
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Nav />
        <Row style={{ flex: '1 0', paddingTop: '20px' }} >
          <Col xl={{ span: 22, offset: 1 }} lg={{ span: 7, offset: 1 }} xs={{ span: 24 }} >
            <h1>Public profile</h1>
            <Divider />
          </Col>
        </Row>
        <Row style={{ flex: '1 0' }} >
          <Col xl={{ span: 5, offset: 1 }} lg={{ span: 7, offset: 1 }} xs={{ span: 24 }} >
            <AvatarUpload />
          </Col>
          <Col xl={{ span: 17, offset: 1 }} lg={{ span: 15, offset: 1 }} xs={{ span: 24 }} />
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Settings
