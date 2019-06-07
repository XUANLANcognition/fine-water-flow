import React, { Component } from 'react'
import { Card, Avatar, Divider, Button, message, Modal } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const { Meta } = Card
const confirm = Modal.confirm

class ProfileCarder extends Component {
  state = {
    username: '',
    avatarUrl: '',
    bio: ''
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
        return { username: response.data.username, avatarUrl: response.data.last_name, bio: response.data.profile.bio }
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
          avatar={<Avatar size='large' src={this.state.avatarUrl} icon='user' style={{ color: '#ffffff', backgroundColor: '#f6f6f6' }} />}
          title={this.state.username}
          description={this.state.bio}
        />
        <Divider> Infomation </Divider>
        <p><Link to={'/profile/' + this.state.username} >My Profile</Link></p>
        <Divider> Action </Divider>
        <Button type='primary' block onClick={e => this.props.callback(e)}>New Text</Button>
        <Divider />
        <Button type='danger' ghost onClick={this.showConfirm} block>Logout</Button>
      </Card>
    )
  }
}

const ProfileCard = withRouter(ProfileCarder)

export default ProfileCard
