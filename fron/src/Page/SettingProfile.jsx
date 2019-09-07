import React, { Component } from 'react'
import { Layout, Col, Row, Form, Icon, Button, Input, message } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import AvatarUpload from '../AvatarUpload'

class Setting extends Component {
  componentDidMount () {
    this.getProfileData()
  }

  state = {
    data: [],
    collapsed: false,
    bio: '',
    username: '',
    email: '',
    uploading: false

  };

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
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
      this.data = response.data.results
      this.setState(function (state) {
        return { urlAvatar: response.data.last_name, bio: response.data.profile.bio, username: response.data.username, email: response.data.email }
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({
          uploading: true
        })
        const submitData = {
          username: values.username,
          bio: values.bio,
          email: values.email
        }
        try {
          let config = {
            headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
          }
          const response = await axios.patch(
            'https://finewf.club:8080/api/users/' + window.localStorage.getItem('user_id'),
            {
              username: submitData.username,
              profile: { bio: submitData.bio },
              email: submitData.email
            },
            config
          )
          this.setState({
            uploading: false
          })
          if (response.status === 200) {
            message.success('更新成功')
          }
        } catch (error) {
          message.error('更新失败')
        }
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Nav />
        <div style={{ flex: '1 0' }}>
          <Row style={{ flex: '1 0', paddingTop: '20px' }} >
            <Col xxl={{ span: 3, offset: 5 }} xl={{ span: 4, offset: 2 }} md={{ span: 5, offset: 1 }} xs={{ span: 22, offset: 1 }}>
              <nav style={{ border: '1px solid #d1d5da', borderRadius: '3px' }}>
                <div style={{ backgroundColor: '#f3f5f8', color: '#586069', padding: '8px 16px', fontSize: '14px', lineHeight: '20px', borderBottom: '1px solid #e1e4e8', fontWeight: '800' }}>
                  个人设置
                </div>
                <Link to='/settings/profile'>
                  <div style={{ padding: '8px 10px', display: 'block', borderBottom: '1px solid #e1e4e8', color: '#24292e', fontWeight: '600', cursor: 'default', borderLeft: '3px solid #e36209' }}>
                    <Icon type='user' style={{ paddingRight: '6px' }} />个人信息
                  </div>
                </Link>
                <Link to='/settings/account'>
                  <div style={{ padding: '8px 10px', display: 'block', color: '#0366d6' }}>
                    <Icon type='user' style={{ paddingRight: '6px' }} />账号设置
                  </div>
                </Link>
              </nav>
            </Col>
            <Col xxl={{ span: 11, offset: 0 }} xl={{ span: 16, offset: 0 }} md={{ span: 16, offset: 0 }} xs={{ span: 22, offset: 1 }} style={{ paddingLeft: '15px' }}>
              <div style={{ padding: '0 10px ' }}>
                <Row>
                  <Col xl={{ span: 24, offset: 0 }} xs={{ span: 22, offset: 1 }}>
                    <div style={{ fontSize: '20px', borderBottom: '1px solid #e1e4e8', paddingBottom: '8px', fontWeight: '600', color: '#24292e' }}>
                      个人信息
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col xl={{ span: 16, offset: 0 }} xs={{ span: 22, offset: 1 }} style={{ paddingBottom: '20px' }}>
                    <Form onSubmit={this.handleSubmit}>
                      <div style={{ fontSize: '14px', fontWeight: '600', lineHeight: '21px', marginBottom: '3px', color: '#24292e' }}>用户名</div>
                      <Form.Item >
                        {getFieldDecorator('username', {
                          initialValue: this.state.username,
                          rules: [{
                            required: true,
                            message: 'Please input username.'
                          }]
                        })(
                          <Input size='default' />
                        )}
                      </Form.Item>
                      <div style={{ fontSize: '14px', fontWeight: '600', lineHeight: '21px', marginBottom: '3px', color: '#24292e' }}>简单介绍</div>
                      <Form.Item >
                        {getFieldDecorator('bio', {
                          initialValue: this.state.bio,
                          rules: [{
                            required: true,
                            message: 'Please input bio.'
                          }]
                        })(
                          <Input size='default' />
                        )}
                      </Form.Item>
                      <div style={{ fontSize: '14px', fontWeight: '600', lineHeight: '21px', marginBottom: '3px', color: '#24292e' }}>邮箱</div>
                      <Form.Item >
                        {getFieldDecorator('email', {
                          initialValue: this.state.email,
                          rules: [{
                            required: true,
                            message: 'Please input email.'
                          }]
                        })(
                          <Input size='default' />
                        )}
                      </Form.Item>
                      <Form.Item >
                        <Button loading={this.state.uploading} type='primary' htmlType='submit' style={{ backgroundColor: '#2fcb53', color: 'white', borderColor: '#2fcb53', fontWeight: '400' }}>
                          更新信息
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} xs={{ span: 22, offset: 1 }} >
                    <AvatarUpload avatarUrl={this.state.urlAvatar} />
                    <h1>点击上传头像</h1>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

const SettingProfile = withRouter(Form.create()(Setting))
export default SettingProfile
