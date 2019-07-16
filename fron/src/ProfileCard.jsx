import React, { Component } from 'react'
import { Card, Avatar, Divider, Button, message, Modal, Icon } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import PropertyList from './PropertyList'

const { Meta } = Card
const confirm = Modal.confirm

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_m57rpr4woh.js'
})

class ProfileCarder extends Component {
  state = {
    username: '',
    avatarUrl: '',
    bio: '',
    property: 0
  }

  onClickLogout = () => {
    window.localStorage.clear()
    this.props.history.replace('/')
    message.success('Have Logouted')
  }

  showConfirm = () => {
    confirm({
      title: 'Confirm',
      content: 'Are you sure to sign out?',
      onOk: () => {
        this.onClickLogout()
      },
      onCancel () {
      }
    })
  }

  getUserProfile = async (v) => {
    try {
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      const response = await axios.get(
        'https://finewf.club:8080/api/users/' + window.localStorage.getItem('user_id'),
        config
      )
      window.localStorage.setItem('url', response.data.url)
      this.setState(function (state) {
        return {
          username: response.data.username,
          avatarUrl: response.data.last_name,
          bio: response.data.profile.bio,
          property: response.data.profile.property
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount = async (v) => {
    await this.getUserProfile()
  }

  render () {
    return (
      <Card >
        <Meta
          avatar={<Avatar shape='square' size='large' src={this.state.avatarUrl} icon='user' style={{ color: '#ffffff', backgroundColor: '#f6f6f6' }} />}
          title={
            <div>
              {this.state.username}
              <IconFont type='icon-renzhenghuizhang' style={{ paddingLeft: '10px' }} />
            </div>
          }
          description={this.state.bio}
        />
        <br />
        <PropertyList property={this.state.property} />
        <Divider> Infomation </Divider>
        <div>
          <Link to={'/profile/' + this.state.username} >
            <IconFont type='icon-geren1' style={{ paddingRight: '10px' }} />
            我的主页
          </Link>
        </div>
        <Divider> Action </Divider>
        <Button type='danger' ghost onClick={this.showConfirm} block>Logout</Button>
      </Card>
    )
  }
}

const ProfileCard = withRouter(ProfileCarder)

export default ProfileCard
