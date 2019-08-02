import React, { Component } from 'react'
import { Icon, Typography } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_lapfux51pxk.js'
})

const { Title } = Typography

class CategoryList extends Component {
  state = {
    current: '',
    switch: false
  }

  componentDidMount = async (v) => {
    await this.getUserProfile()
  }

  handleClick = (e) => {
    this.setState({
      current: e.key
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
      this.setState(function (state) {
        return {
          switch: (response.data.profile.media_editor_auth === '审核通过')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <div style={{ padding: '20px 20px', background: '#fff', borderRadius: '1px', boxShadow: '0 1px 3px rgba(26,26,26,.1)', marginBottom: '10px' }}>
        <Title level={4} style={{ marginBottom: '30px' }}>改变</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={(window.localStorage.getItem('user_id') !== null) ? '/textEditorPage' : '/'}>
            <IconFont type='icon-article' style={{ fontSize: '36px' }} />
          </Link>
          <Link to={this.state.switch ? '/book_editor_page' : '/settings/account'}>
            <IconFont type='icon-book' style={{ fontSize: '36px' }} />
          </Link>
          <Link to={this.state.switch ? '/movie_editor_page' : '/settings/account'}>
            <IconFont type='icon-movie' style={{ fontSize: '36px' }} />
          </Link>
        </div>
      </div>
    )
  }
}

export default CategoryList
