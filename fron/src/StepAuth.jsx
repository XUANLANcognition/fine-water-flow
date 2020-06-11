import React, { Component } from 'react'
import { Steps, Button } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

const { Step } = Steps

const First = ({ onClick }) => (
  <div style={{ margin: '24px 0' }}>
    你还没有申请书籍影视资源的编辑权限, 点击
    <Button onClick={onClick} type='primary' size='small' style={{ margin: '0 10px' }}>申请</Button>
  </div>
)

const Second = ({ onClick }) => (
  <div style={{ margin: '24px 0' }}>
      等着吧
    <Button onClick={onClick} type='primary' size='small' style={{ margin: '0 10px' }}>取消申请</Button>
  </div>
)

const Third = ({ onClick }) => (
  <div style={{ margin: '24px 0' }}>
        去上传书籍喽
    <Link to='/book_editor_page'>
      <Button onClick={onClick} type='primary' size='small' style={{ margin: '0 10px' }}>去上传</Button>
    </Link>
  </div>
)

class StepAuth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  componentDidMount () {
    this.getProfileData()
  }

  getProfileData = async (v) => {
    try {
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      const response = await axios.get(
        'https://101.200.52.246:8080/api/users/' + window.localStorage.getItem('user_id') + '?format=json',
        config
      )
      let temp = 0
      if (response.data.profile.media_editor_auth === '未审核') {
        temp = 0
      } else {
        if (response.data.profile.media_editor_auth === '审核中') {
          temp = 1
        } else {
          temp = 2
        }
      }
      this.setState(function (state) {
        return { current: temp }
      })
    } catch (error) {
      console.log(error)
    }
  }

  apply = async () => {
    let config = {
      headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
    }
    await axios.post(
      'https://101.200.52.246:8080/api/user/' + window.localStorage.getItem('user_id') + '/apply_media_editor/',
      {},
      config
    )
    const current = 1
    this.setState({ current })
  }

  unapply = async () => {
    let config = {
      headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
    }
    await axios.post(
      'https://101.200.52.246:8080/api/user/' + window.localStorage.getItem('user_id') + '/unapply_media_editor/',
      {},
      config
    )
    const current = 0
    this.setState({ current })
  }

  render () {
    const { current } = this.state
    return (
      <div>
        <Steps current={current}>
          <Step key={0} title='提交申请' />
          <Step key={1} title='等待审核' />
          <Step key={2} title='审核通过' />
        </Steps>
        {current === 0 ? (<First onClick={this.apply} />) : null}
        {current === 1 ? (<Second onClick={this.unapply} />) : null}
        {current === 2 ? (<Third />) : null}
      </div>
    )
  }
}

export default StepAuth
