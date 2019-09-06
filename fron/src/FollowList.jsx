import React, { Component } from 'react'
import { List, Menu, Avatar, Button, Dropdown } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

const menu = (
  <Menu>
    <Menu.Item>
      1(即将)
    </Menu.Item>
    <Menu.Item>
      2(即将)
    </Menu.Item>
    <Menu.Item>
      3(即将)
    </Menu.Item>
  </Menu>
)

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
          gutter: 12, xs: 1, xl: 2
        }}
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item>
            <div style={{ display: 'flex', justifyContent: 'space-around', borderRadius: '3px', backgroundColor: '#f2f2f5', padding: '5px' }}>
              <div style={{ borderRight: '1px solid rgb(217, 217, 217)', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '10px 10px 10px 0', padding: '20px' }}>
                <Link to={(item.id + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + (item.id)}>
                  <Avatar size={35} shape='square' src={item.last_name} />
                </Link>
              </div>
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'stretch' }}>
                <div style={{ color: '#333', fontSize: '16px', fontWeight: 'bold' }}>{item.username}</div>
                <div>{item.bio}</div>
                <div style={{ display: 'flex', padding: '10px 0' }}>
                  <Dropdown overlay={menu} placement='bottomRight'>
                    <Button size='small' style={{ marginRight: '10px' }}>分组(即将)</Button>
                  </Dropdown>
                  <Button size='small'>取消关注(即将)</Button>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    )
  }
}

export default FollowList
