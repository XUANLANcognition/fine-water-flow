import React, { Component } from 'react'
import { Layout, Tooltip, notification, Form, Input, Button } from 'antd'
import axios from 'axios'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import Nav from '../Nav'
import Myfooter from '../Myfooter'

const { Content } = Layout
const FormItem = Form.Item

// 提示框
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'successful',
    description: '发布成功，等待小伙伴们的讨论吧',
    duration: 2
  })
}

class textEditorPage extends Component {
  state = {
    uploading: false
  }
  componentDidMount () {
    // 异步设置编辑器内容
    setTimeout(() => {
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState(null)
      })
    }, 1000)
  }

  handleSubmit = async (event) => {
    this.setState(function (state) {
      return {
        uploading: true
      }
    })
    event.preventDefault()

    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        const submitData = {
          title: values.title,
          content: values.content.toHTML() // or values.content.toHTML()
        }
        try {
          const response = await axios.post(
            'https://guoliang.online:8080/api/article/',
            {
              title: submitData.title,
              content: submitData.content,
              pub_date: new Date().toISOString(),
              user: window.localStorage.getItem('url')
            }
          )
          this.setState(function (state) {
            return {
              uploading: false
            }
          })
          if (response.status === 201) {
            openNotificationWithIcon('success')
          } else {
            openNotificationWithIcon('error')
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <Content style={{ backgroundColor: '#fff', padding: '20px 80px 20px 80px' }}>
          <Tooltip title='prompt text'>
            <span>Editor your Text</span>
          </Tooltip>
          <div className='demo-container'>
            <Form onSubmit={this.handleSubmit}>
              <FormItem label='描述'>
                {getFieldDecorator('title', {
                  rules: [{
                    required: true,
                    message: '请输入标题'
                  }]
                })(
                  <Input size='large' placeholder='请输入标题' />
                )}
              </FormItem>
              <FormItem label='正文'>
                {getFieldDecorator('content', {
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    validator: (_, value, callback) => {
                      if (value.isEmpty()) {
                      } else {
                        callback()
                      }
                    }
                  }]
                })(
                  <BraftEditor
                    className='my-editor'
                    placeholder='请输入正文内容'
                  />
                )}
              </FormItem>
              <FormItem >
                <Button loading={this.state.uploading} size='large' type='primary' htmlType='submit' style={{ position: 'fixed', top: '80px', right: '60px' }}>
                提交
                </Button>
              </FormItem>
            </Form>
          </div>
        </Content>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(textEditorPage)
