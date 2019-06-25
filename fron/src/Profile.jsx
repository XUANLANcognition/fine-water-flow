import React, { Component } from 'react'
import { Layout, Avatar, Row, Col, Tabs, Icon, Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Nav from './Nav'
import Myfooter from './Myfooter'
import ProfileArticleList from './ProfileArticleList'
import FollowList from './FollowList'
import PropertyList from './PropertyList'

const TabPane = Tabs.TabPane
const { Title, Paragraph } = Typography

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_bctqp8owe4o.js'
})

class Profile extends Component {
  state = {
    data: [],
    urlAvatar: '',
    username: '',
    bio: '',
    property: 0
  }

  componentDidMount = async (v) => {
    await this.getProfileData()
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
        return {
          urlAvatar: response.data.last_name,
          username: response.data.username,
          bio: response.data.profile.bio,
          property: response.data.profile.property
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Nav />
        <Row style={{ flex: '1 0', paddingTop: '30px', paddingBottom: '30px' }} >
          <Col xxl={{ span: 3, offset: 4 }} xl={{ span: 5, offset: 2 }} xs={{ span: 22, offset: 1 }} style={{ paddingBottom: '20px' }}>
            <Avatar size={180} shape='square' src={this.state.urlAvatar} icon='user' style={{ color: '#ffffff', backgroundColor: '#f6f6f6' }} />
            <Title level={2}>{this.state.username}</Title>
            <Paragraph>{this.state.bio}</Paragraph>
            <PropertyList property={this.state.property} />
            <br />
            <Button block style={{ backgroundColor: '#f6f6f6' }}>
              <Link to='/settings/profile'>Edit</Link>
            </Button>
          </Col>
          <Col xxl={{ span: 12, offset: 1 }} xl={{ span: 14, offset: 1 }} xs={{ span: 22, offset: 1 }} >
            <Tabs defaultActiveKey='1'>
              <TabPane tab={<span><IconFont type='icon-wenzhang' />我的文章</span>} key='1'>
                <ProfileArticleList />
              </TabPane>
              <TabPane tab={<span><IconFont type='icon-meishi1' />我的关注</span>} key='2'>
                <FollowList />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Profile
