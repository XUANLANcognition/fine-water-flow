import React, { Component } from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
import { Typography } from 'antd';
import Link from "next/link";
import axios from 'axios'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_ng8zkbwomt.js'
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
        'https://101.200.52.246:8080/api/users/' + window.localStorage.getItem('user_id'),
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
        <Title level={4} style={{ marginBottom: '30px' }}>内容发布</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href={(this.props.userId !== null) ? '/textEditorPage' : '/'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-article' style={{ fontSize: '36px' }} />
              <div>写文章</div>
            </div>
          </Link>
          <Link href={this.state.switch ? '/book_editor_page' : '/settings/account'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-book' style={{ fontSize: '36px' }} />
              <div>推书籍</div>
            </div>
          </Link>
          <Link href={this.state.switch ? '/movie_editor_page' : '/settings/account'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-movie' style={{ fontSize: '36px' }} />
              <div>推影视</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}



export default CategoryList
