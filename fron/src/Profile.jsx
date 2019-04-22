import React, { Component } from 'react'
import { Layout, Avatar, Row, Col, Tabs, Icon } from 'antd'

import Nav from './Nav'
import Myfooter from './Myfooter'
import ProfileArticleList from './ProfileArticleList'

const TabPane = Tabs.TabPane

class Profile extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <Row style={{ flex: '1 0', padding: '60px' }}>
          <Col xl={{ span: 6 }} lg={{ span: 8 }} xs={{ span: 24 }} >
            <Avatar size={180} shape='square' >{this.props.match.params.id}</Avatar>
            <h1 style={{ paddingTop: '10px' }}>{this.props.match.params.id}</h1>
          </Col>
          <Col xl={{ span: 18 }} lg={{ span: 16 }} xs={{ span: 24 }} >
            <Tabs defaultActiveKey='1'>
              <TabPane tab={<span><Icon type='read' />我的文章</span>} key='1'>
                <ProfileArticleList />
              </TabPane>
              <TabPane tab={<span><Icon type='rest' />我的草稿</span>} key='2'>
      等会写...
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
