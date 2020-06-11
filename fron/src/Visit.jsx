import React, { Component } from 'react'
import { Layout, Avatar, Row, Col, Tabs, Icon, Button, Typography, Tag, message } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from './Nav'
import Myfooter from './Myfooter'
import VisitProfileArticleList from './VisitProfileArticleList'

const TabPane = Tabs.TabPane
const { Paragraph } = Typography

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_bctqp8owe4o.js'
})

class Visit extends Component {
  state = {
    data: [],
    urlAvatar: '',
    username: '',
    bio: '',
    follow: false,
    loading: false,
    profession: '',
    cover: ''
  }

  componentDidMount = async (v) => {
    await this.getProfileData()
    await this.isFollow()
  }

  isFollow = async (v) => {
    try {
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      const response = await axios.post(
        'https://101.200.52.246:8080/api/user/' + this.props.match.params.id + '/is_followed/?format=json',
        {},
        config
      )
      this.setState({
        follow: (response.data.code === '1')
      })
    } catch (error) {
    }
  }

  follow = async (v) => {
    try {
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      this.setState({ loading: true })
      axios.post(
        'https://101.200.52.246:8080/api/user/' + this.props.match.params.id + '/follow/?format=json',
        {},
        config
      )
      setTimeout(() => {
        this.setState({
          follow: true,
          loading: false
        })
      }, 300)
      message.success('关注成功')
    } catch (error) {
    }
  }

  unfollow = async (v) => {
    try {
      this.setState({ loading: true })
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      axios.post(
        'https://101.200.52.246:8080/api/user/' + this.props.match.params.id + '/unfollow/?format=json',
        {},
        config
      )
      setTimeout(() => {
        this.setState({
          follow: false,
          loading: false
        })
      }, 300)
      message.success('取消关注成功')
    } catch (error) {
    }
  }

  getProfileData = async (v) => {
    try {
      const response = await axios.get(
        'https://101.200.52.246:8080/api/user/' + this.props.match.params.id + '?format=json'
      )
      this.data = response.data.results
      this.setState(function (state) {
        return {
          urlAvatar: response.data.last_name,
          username: response.data.username,
          bio: response.data.profile.bio,
          profession: response.data.profile.profession,
          cover: response.data.profile.cover
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
        <Row style={{ marginTop: '15px' }}>
          <Col xxl={{ span: 14, offset: 5 }} xl={{ span: 20, offset: 2 }} md={{ span: 22, offset: 1 }} xs={{ span: 24, offset: 0 }} style={{ boxShadow: '0 1px 3px rgba(26,26,26,.1)' }}>
            <div style={{ backgroundImage: `url(${this.state.cover})`, backgroundColor: '#fff', overflow: 'hidden', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundOrigin: 'padding-box', backgroundClip: 'border-box', backgroundAttachment: 'scroll', height: '240px' }} />
            <div style={{ background: '#fff', display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ height: '200px', width: '200px', marginTop: '-100px', padding: '20px' }}>
                <Avatar shape='square' src={this.state.urlAvatar} icon='user' style={{ height: '100%', width: '100%', border: '4px solid white', borderRadius: '10px', backgroundColor: 'white' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '26px', lineHeight: '30px', fontWeight: 'bold', color: '#000', marginRight: '6px' }}>{this.state.username}</span>
                  {this.state.profession && <Tag color='#f50' style={{ height: '22px', fontSize: '14px' }}>{ this.state.profession }</Tag>}
                </div>
                <Paragraph>{this.state.bio}</Paragraph>
              </div>
              <div style={{ display: 'flex', flexGrow: '1', flexDirection: 'row-reverse', alignItems: 'center', padding: '20px' }}>
                {this.state.follow ? <Button type='primary' onClick={this.unfollow} loading={this.state.loading} style={{ width: '150px' }} block>取消关注</Button> : <Button ghost type='primary' onClick={this.follow} loading={this.state.loading} style={{ width: '150px' }} block>关注</Button>}
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ flex: '1 0', paddingTop: '15px', paddingBottom: '30px' }} >
          <Col xxl={{ span: 10, offset: 5 }} xl={{ span: 14, offset: 2 }} md={{ span: 14, offset: 1 }} xs={{ span: 24, offset: 0 }} style={{ background: '#fff', padding: '0 20px', marginBottom: '30px', boxShadow: '0 1px 3px rgba(26,26,26,.1)' }}>
            <Tabs defaultActiveKey='1' size='large' style={{ paddingBottom: '15px' }}>
              <TabPane tab={<span><IconFont type='icon-wenzhang' />Ta 的文章</span>} key='1'>
                <VisitProfileArticleList visitUserId={this.props.match.params.id} />
              </TabPane>
            </Tabs>
          </Col>
          <Col xxl={{ span: 4, offset: 0 }} xl={{ span: 6, offset: 0 }} md={{ span: 8, offset: 0 }} xs={{ span: 22, offset: 1 }} style={{ paddingLeft: '20px' }} />
        </Row>
        <Row>
          <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }} />
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Visit
