import React, { Component } from 'react'
import { Layout, Form, Input, Tooltip, Icon, Row, Col, Button, Checkbox, Card, message } from 'antd'
import axios from 'axios'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

const FormItem = Form.Item

class Join extends Component {
  state = {
    confirmDirty: false
  };
  componentDidMount () {
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      window.callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  Join = async (v) => {
    try {
      const responseJoin = await axios.post(
        'https://guoliang.online:8080/api/users/',
        {
          username: v.username,
          password: v.password,
          email: v.email
        }
      )
      const response = await axios.post(
        'https://guoliang.online:8080/api-token-auth/',
        {
          username: v.username,
          password: v.password
        }
      )
      window.localStorage.setItem('token', response.data.token)
      message.success('Join Successful, Welcome ' + response.data.user_name)
      window.localStorage.setItem('user_id', response.data.user_id)
      this.props.history.replace('/')
    } catch (error) {
      console.log(error)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.Join(values)
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#fff' }} >
          <Row style={{ flex: '1 0', paddingTop: '20px' }} >
            <Col xl={{ span: 22, offset: 1 }} lg={{ span: 7, offset: 1 }} xs={{ span: 24 }} >
              <h1 style={{ fontSize: '40px' }}>Join NMT</h1>
              <p style={{ color: '#586069', fontSize: '20px', paddingBottom: '20px' }}>Non Machine Translation</p>
            </Col>
          </Row>
          <Row>
            <Col xl={{ span: 5, offset: 2 }} lg={{ span: 7, offset: 1 }} xs={{ span: 24 }}>
              <Card
                title='Why Join?'
              >
                <p><Icon type='check' style={{ color: 'green' }} /> Great communication</p>
                <p><Icon type='check' style={{ color: 'green' }} /> Open source community</p>
                <p><Icon type='check' style={{ color: 'green' }} /> Frictionless Translate</p>
              </Card>
            </Col>
            <Col xl={{ span: 14, offset: 1 }} lg={{ span: 15, offset: 1 }} xs={{ span: 24 }}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label='E-mail'
                >
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: 'The input is not valid E-mail!'
                    }, {
                      required: true, message: 'Please input your E-mail!'
                    }]
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='Password'
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: 'Please input your password!'
                    }, {
                      validator: this.validateToNextPassword
                    }]
                  })(
                    <Input type='password' />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label='Confirm Password'
                >
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: 'Please confirm your password!'
                    }, {
                      validator: this.compareToFirstPassword
                    }]
                  })(
                    <Input type='password' onBlur={this.handleConfirmBlur} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
              Nickname&nbsp;
                      <Tooltip title='What do you want others to call you?'>
                        <Icon type='question-circle-o' />
                      </Tooltip>
                    </span>
                  )}
                >
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked'
                  })(
                    <Checkbox>I have read the <a href=''>agreement</a></Checkbox>
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type='primary' htmlType='submit'>Register</Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(Join)
