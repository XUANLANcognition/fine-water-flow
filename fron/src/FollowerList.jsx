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

const count = 6

class FollowList extends Component {
  page = 1
  state = {
    data: [],
    loading: false
  }

  componentDidMount = async (v) => {
    await this.getProfileData()
  }

  getProfileData = async (v) => {
    try {
      let url = ''
      url = 'https://101.200.52.246:8080/api/follow_relations/' + '?format=json' + '&page=' + this.page + '&page_size=' + count + '&follow=' + window.localStorage.getItem('user_id')
      const response = await axios.get(url)
      const temp = []
      for (let index = 0; index < response.data.count; index++) {
        temp.push({ user: { username: '', last_name: '', id: index, profile: { bio: '' } } })
      }
      this.setState({
        data: temp
      })
      for (let index = 0; index < response.data.results.length; index++) {
        temp[index] = response.data.results[index]
      }
      this.setState({
        data: temp
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleFollowList = async (page) => {
    this.setState({
      loading: true
    })
    try {
      let url = ''
      url = 'https://101.200.52.246:8080/api/follow_relations' + '?format=json' + '&page=' + page + '&page_size=' + count + '&follow=' + window.localStorage.getItem('user_id')
      const response = await axios.get(url)
      let temp = this.state.data
      let i = (page - 1) * count
      for (let index = 0; index < response.data.results.length; index++) {
        temp[i] = response.data.results[index]
        i++
      }
      this.setState({
        data: temp,
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <List
        style={{ paddingBottom: '20px' }}
        grid={{
          gutter: 12, xs: 1, xl: 2
        }}
        loading={this.state.loading}
        dataSource={this.state.data}
        pagination={{
          onChange: this.handleFollowList,
          pageSize: count,
          total: this.state.data.length,
          showQuickJumper: true,
          size: 'small'
        }}
        renderItem={item => (
          <List.Item>
            <div style={{ display: 'flex', justifyContent: 'space-around', borderRadius: '3px', backgroundColor: '#f2f2f5', padding: '5px' }}>
              <div style={{ borderRight: '1px solid rgb(217, 217, 217)', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '10px 10px 10px 0', padding: '20px' }}>
                <Link to={(item.user.id + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + (item.user.id)}>
                  <Avatar size={35} shape='square' src={item.user.last_name} />
                </Link>
              </div>
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'stretch' }}>
                <div style={{ color: '#333', fontSize: '16px', fontWeight: 'bold' }}>{item.user.username}</div>
                <div>{item.user.profile.bio.slice(0, 12) + '...'}</div>
                <div style={{ display: 'flex', padding: '10px 0' }}>
                  <Button size='small'>屏蔽 TA(即将)</Button>
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
