import React, { Component } from 'react'
import { Layout, Avatar, Row, Col, Tabs, Icon, Button, Typography, Card } from 'antd'
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
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
        <Nav />
        <Row style={{ marginTop: '20px' }}>
          <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
            <div style={{ background: `url(${'/cover.jpg'})`, display: 'flex', justifyContent: 'center', height: '200px' }} />
            <div style={{ background: '#fff', display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ height: '200px', width: '200px', marginTop: '-100px', padding: '20px' }}>
                <Avatar shape='square' src={this.state.urlAvatar} icon='user' style={{ height: '100%', width: '100%', border: '4px solid white', borderRadius: '10px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Title level={2}>{this.state.username}</Title>
                <Paragraph>{this.state.bio}</Paragraph>
              </div>
              <div style={{ display: 'flex', flexGrow: '1', flexDirection: 'row-reverse', alignItems: 'center', padding: '20px' }}>
                <Button type='primary' ghost style={{ width: '150px' }}>
                  <Link to='/settings/profile'>设置</Link>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ flex: '1 0', paddingTop: '15px', paddingBottom: '30px' }} >
          <Col xxl={{ span: 12, offset: 4 }} xl={{ span: 14, offset: 2 }} xs={{ span: 22, offset: 1 }} style={{ background: '#fff', padding: '0 20px', paddingBottom: '30px' }}>
            <Tabs defaultActiveKey='1'>
              <TabPane tab={<span><IconFont type='icon-wenzhang' />我的文章</span>} key='1'>
                <ProfileArticleList />
              </TabPane>
              <TabPane tab={<span><IconFont type='icon-meishi1' />我的关注</span>} key='2'>
                <FollowList />
              </TabPane>
            </Tabs>
          </Col>
          <Col xxl={{ span: 3, offset: 1 }} xl={{ span: 5, offset: 1 }} xs={{ span: 22, offset: 1 }} >
            <Card title={
              <div style={{ color: '#000', fontWeight: 'bolder', fontSize: '18px' }}>
                水果
              </div>} bordered={false} >
              <PropertyList property={this.state.property} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }} />
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Profile
