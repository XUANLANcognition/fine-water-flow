import React, { Component } from 'react'
import { Layout, Col, Row, Menu, Icon, Divider, Typography } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import AvatarUpload from '../AvatarUpload'

const { Title, Paragraph, Text } = Typography

class Settings extends Component {
  componentDidMount () {
    this.getProfileData()
  }

  state = {
    data: [],
    collapsed: false,
    bio: '',
    username: '',
    email: ''
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
        'https://finewf.club:8080/api/users/' + window.localStorage.getItem('user_id') + '?format=json',
        config
      )
      this.data = response.data.results
      this.setState(function (state) {
        return { urlAvatar: response.data.last_name, bio: response.data.profile.bio, username: response.data.username, email: response.data.email }
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key
    })
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Nav />
        <div style={{ flex: '1 0' }}>
          <Row style={{ flex: '1 0', paddingTop: '20px' }} >
            <Col xl={{ span: 4, offset: 3 }} xs={{ span: 22, offset: 1 }} >
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
              >
                <Menu.Item key='Profile'>
                  <Icon type='user' />Profile
                  <Link to='/settings/profile' />
                </Menu.Item>
                <Menu.Item key='Account'>
                  <Icon type='user' />Account
                  <Link to='#' />
                </Menu.Item>
              </Menu>
            </Col>
            <Col xl={{ span: 13, offset: 1 }} xs={{ span: 22, offset: 1 }} >
              <Row>
                <Col xl={{ span: 24, offset: 0 }} xs={{ span: 22, offset: 1 }}>
                  <Title level={2}>Public profile</Title>
                  <Divider />
                </Col>
              </Row>
              <Row>
                <Col xl={{ span: 16, offset: 0 }} xs={{ span: 22, offset: 1 }} style={{ paddingBottom: '20px' }}>
                  <h3>Username : {this.state.username}</h3>
                  <h3>Bio : {this.state.bio}</h3>
                  <h3>E-mail : {this.state.email}</h3>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} xs={{ span: 22, offset: 1 }} >
                  <AvatarUpload avatarUrl={this.state.urlAvatar} />
                  <h1>点击上传头像</h1>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Settings
