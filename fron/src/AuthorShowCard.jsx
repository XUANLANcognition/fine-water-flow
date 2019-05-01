import React, { Component } from 'react'
import { Card, Avatar } from 'antd'
import axios from 'axios'

const { Meta } = Card

class AuthorShowCard extends Component {
  state = {
    data: [],
    urlAvatar: '',
    username: '',
    bio: ''
  }

  componentDidUpdate (prevProps) {
    if (prevProps.authorId !== this.props.authorId) { this.getProfileData() }
  }

  getProfileData = async (v) => {
    try {
      const response = await axios.get(
        'https://guoliang.online:8080/api/user/' + this.props.authorId + '?format=json'
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
      <Card title='关于作者'>
        <Meta
          avatar={<Avatar src={this.state.urlAvatar} />}
          title={this.state.username}
          description={this.state.bio}
        />
      </Card>
    )
  }
}

export default AuthorShowCard
