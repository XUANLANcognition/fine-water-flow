import React, { Component } from 'react'
import { Layout, Row, Col, Tabs, Form, BackTop } from 'antd'
import { withRouter } from 'react-router'

import Nav from './Nav'
import Advertisement from './Advertisement'
import ArticleList from './ArticleList'
import ArticleFollowList from './ArticleFollowList'
import Myfooter from './Myfooter'
import CategoryList from './CategoryList'
import PropertyRank from './PropertyRank'

const TabPane = Tabs.TabPane

class THome extends Component {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  goToEditorPage = () => {
    this.props.history.replace('/textEditorPage')
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
        <Nav />
        <BackTop />
        <Row style={{ flex: '1 0', padding: '15px 0' }}>
          <Col xxl={{ span: 10, offset: 5 }} xl={{ span: 13, offset: 2 }} md={{ span: 15, offset: 1 }} xs={{ span: 24, offset: 0 }} style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px 20px', boxShadow: '0 1px 3px rgba(26,26,26,.1)', borderRadius: '1px' }}>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='全部' key='1'>
                <ArticleList />
              </TabPane>
              <TabPane tab='关注' key='2'>
                <ArticleFollowList />
              </TabPane>
            </Tabs>
          </Col>
          <Col xxl={{ span: 4, offset: 0 }} xl={{ span: 7, offset: 0 }} md={{ span: 7, offset: 0 }} xs={{ span: 22, offset: 1 }} style={{ paddingLeft: '15px' }}>
            <CategoryList />
            <PropertyRank />
            <Advertisement />
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

const THomer = withRouter(Form.create()(THome))

export default THomer
