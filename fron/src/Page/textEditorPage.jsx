import React, { Component } from 'react'
import { Layout, Tooltip, notification, Form, Input, Button, Row, Col } from 'antd'
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
    description: '发布成功',
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
    event.preventDefault()

    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({
          uploading: true
        })
        const submitData = {
          title: values.title,
          content: values.content.toHTML() // or values.content.toHTML()
        }
        try {
          let config = {
            headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
          }
          const response = await axios.post(
            'https://finewf.club:8080/api/articles/',
            {
              title: submitData.title,
              content: submitData.content
            },
            config
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
        <Row style={{ backgroundColor: '#fff', paddingTop: '30px' }}>
          <Col xxl={{ span: 12, offset: 6 }} xl={{ span: 16, offset: 4 }} xs={{ span: 22, offset: 1 }}>
            <Content>
              <div className='editor-wrapper' >
                <Form onSubmit={this.handleSubmit}>
                  <FormItem label='标题'>
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
                        media={{ image: true }}
                      />
                    )}
                  </FormItem>
                  <FormItem >
                    <Button loading={this.state.uploading} size='large' type='primary' htmlType='submit' >
                      发布
                    </Button>
                  </FormItem>
                </Form>
              </div>
            </Content>
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(textEditorPage)
