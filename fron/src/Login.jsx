import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const FormItem = Form.Item

class Login extends Component {
  Login = async (v) => {
    try {
      const response = await axios.post(
        'https://101.200.52.246:8080/api-token-auth/',
        {
          username: v.username,
          password: v.password
        }
      )
      window.localStorage.setItem('token', response.data.token)
      window.localStorage.setItem('user_id', response.data.user_id)
      window.localStorage.setItem('user_avatar', response.data.user_avatar)
      window.localStorage.setItem('user_name', response.data.user_name)
      message.success('欢迎 ' + response.data.user_name + ' 进入 FWF')
      this.props.history.replace('/')
    } catch (error) {
      message.error('账号或密码错误')
      console.log(error)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.Login(values)
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>自动登陆</Checkbox>
          )}
          <Link className='login-form-forgot' to='/reset_password' style={{ float: 'right' }}>忘记密码？</Link>
          <Button type='primary' htmlType='submit' className='login-form-button'
            style={{ width: '100%' }}>
            登陆
          </Button>
          没有账号？<Link to='/join'>注册</Link>
        </FormItem>
      </Form>
    )
  }
}

const Loginer = withRouter(Form.create()(Login))

export default Loginer
