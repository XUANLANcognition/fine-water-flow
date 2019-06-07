import React, { Component } from 'react'
import { Layout, Avatar, Row, Col, Tabs, Icon, Typography, Button, message } from 'antd'
import axios from 'axios'

import Nav from './Nav'
import Myfooter from './Myfooter'
import VisitProfileArticleList from './VisitProfileArticleList'

const TabPane = Tabs.TabPane
const { Title, Paragraph } = Typography

class Visit extends Component {
  state = {
    data: [],
    urlAvatar: '',
    username: '',
    bio: '',
    follow: false,
    loading: false
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
        'https://finewf.club:8080/api/user/' + this.props.match.params.id + '/is_followed/?format=json',
        {},
        config
      )
      this.setState({
        follow: (response.data.m === '1')
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
        'https://finewf.club:8080/api/user/' + this.props.match.params.id + '/follow/?format=json',
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
        'https://finewf.club:8080/api/user/' + this.props.match.params.id + '/unfollow/?format=json',
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
        'https://finewf.club:8080/api/user/' + this.props.match.params.id + '?format=json'
      )
      this.data = response.data.results
      this.setState(function (state) {
        return { urlAvatar: response.data.last_name, username: response.data.username, bio: response.data.profile.bio }
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
          <Col xl={{ span: 4, offset: 3 }} xs={{ span: 22, offset: 1 }} style={{ paddingBottom: '20px' }} >
            <Avatar size={180} shape='square' src={this.state.urlAvatar} icon='user' style={{ color: '#ffffff', backgroundColor: '#f6f6f6' }} />
            <Title level={2}>{this.state.username}</Title>
            <Paragraph>{this.state.bio}</Paragraph>
            {this.state.follow ? <Button type='primary' onClick={this.unfollow} loading={this.state.loading} block>Unfollow</Button> : <Button type='primary' onClick={this.follow} loading={this.state.loading} block>Follow</Button>}
          </Col>
          <Col xl={{ span: 13, offset: 1 }} xs={{ span: 22, offset: 1 }} >
            <Tabs defaultActiveKey='1'>
              <TabPane tab={<span><Icon type='read' />Ta 的文章</span>} key='1'>
                <VisitProfileArticleList visitUserId={this.props.match.params.id} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Visit
