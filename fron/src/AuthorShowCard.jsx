import React, { Component } from 'react'
import { Card, Avatar, Tag } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

const { Meta } = Card

class AuthorShowCard extends Component {
  state = {
    data: [],
    urlAvatar: '',
    username: '',
    bio: '',
    id: '',
    profession: ''
  }

  componentDidUpdate (prevProps) {
    if (prevProps.authorId !== this.props.authorId) { this.getProfileData() }
  }

  getProfileData = async (v) => {
    try {
      const response = await axios.get(
        'https://finewf.club:8080/api/user/' + this.props.authorId + '?format=json'
      )
      this.data = response.data.results
      this.setState({
        urlAvatar: response.data.last_name,
        username: response.data.username,
        bio: response.data.profile.bio,
        id: response.data.id,
        profession: response.data.profile.profession
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <Card title={<div style={{ fontWeight: 'bold' }}>关于作者</div>} bordered style={{ background: '#fff', fontWeight: 'bold', borderRadius: '1px', boxShadow: '0 1px 3px rgba(26,26,26,.1)' }}>
        <Meta
          avatar={<Link to={(this.state.id + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + this.state.id}><Avatar shape='square' src={this.state.urlAvatar} /></Link>}
          title={<div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#000', marginRight: '6px' }}>{this.state.username}</span>
              {this.state.profession && <Tag color='#f50'>{ this.state.profession }</Tag>}
            </div>
          </div>}
          description={this.state.bio}
        />
      </Card>
    )
  }
}

export default AuthorShowCard
