import React, { Component } from 'react'
import { List, Card, Avatar } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

const { Meta } = Card

class FollowList extends Component {
  state = {
    data: []
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
      this.setState(function (state) {
        return { data: response.data.profile.follow }
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <List
        grid={{
          gutter: 36, xs: 1, xl: 2
        }}
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item>
            <Card>
              <Meta
                avatar={<Link to={(item.id + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + (item.id)}><Avatar shape='square' src={item.last_name} /></Link>}
                title={<Link to={(item.id + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + (item.id)}>{item.username}</Link>}
                description={item.bio}
              /></Card>
          </List.Item>
        )}
      />
    )
  }
}

export default FollowList
