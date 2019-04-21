import React, { Component } from 'react'
import { Card, Avatar, Divider, Button, message, Modal } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router'

const { Meta } = Card
const confirm = Modal.confirm

class ProfileCarder extends Component {
  state = {
    username: ''
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
      const response = await axios.get(
        'https://guoliang.online:8080/api/users/' + window.localStorage.getItem('user_id')
      )
      window.localStorage.setItem('url', response.data.url)
      this.data = response.data.username
      this.setState(function (state) {
        return { data: response.data.username }
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount () {
    this.getUserProfile()
  }

  render () {
    return (
      <Card >
        <Meta
          avatar={<Avatar style={{ backgroundColor: '#123456' }}>{this.data}</Avatar>}
          title={this.state.data}
          description='My description'
        />
        <Divider> Infomation </Divider>
        <p><a href={'/profile/' + this.state.data} >Profile</a></p>
        <p><a href='/'>My Text</a></p>
        <p><a href='/'>My Translate</a></p>
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
