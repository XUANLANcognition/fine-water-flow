import React, { Component } from 'react'
import { Layout, notification, Form, Input, Button, Row, Col } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

// 提示框
const openNotificationWithIconS = (type) => {
  notification[type]({
    message: 'Succeed',
    description: '发布成功',
    duration: 2
  })
}
const openNotificationWithIconE = (type) => {
  notification[type]({
    message: 'Error',
    description: '发布失败',
    duration: 2
  })
}

const excludeControls = [
  'letter-spacing',
  'line-height',
  'clear',
  'headings',
  'list-ol',
  'list-ul',
  'remove-styles',
  'superscript',
  'subscript',
  'hr',
  'text-align'
]

class TextEditor extends Component {
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
            openNotificationWithIconS('success')
            this.props.history.replace('/')
          }
        } catch (error) {
          openNotificationWithIconE('error')
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
            <div className='editor-wrapper' >
              <Form onSubmit={this.handleSubmit} className='text-editor-form'>
                <Form.Item >
                  <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                    <Button loading={this.state.uploading} type='primary' htmlType='submit' >
                        发布
                    </Button>
                  </div>
                </Form.Item>
                <Form.Item >
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true,
                      message: 'Please input title.'
                    }]
                  })(
                    <Input size='large' placeholder='请输入标题' />
                  )}
                </Form.Item>
                <Form.Item>
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
                      excludeControls={excludeControls}
                      placeholder='请输入正文内容'
                      media={{ image: true }}
                    />
                  )}
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}
const TextEditorPage = withRouter(Form.create()(TextEditor))
export default TextEditorPage
