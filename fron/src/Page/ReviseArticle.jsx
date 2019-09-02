import React, { Component } from 'react'
import { Layout, notification, Form, Input, Button, Row, Col, Switch } from 'antd'
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
    description: '修改成功',
    duration: 2
  })
}
const openNotificationWithIconE = (type) => {
  notification[type]({
    message: 'Error',
    description: '修改失败',
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

class Revise extends Component {
  state = {
    uploading: false,
    title: '',
    content: ''
  }

  componentDidMount = async (v) => {
    await this.getData()
    // 设置题目

    // 设置编辑器内容
    this.props.form.setFieldsValue({
      content: BraftEditor.createEditorState(this.state.content)
    })
  }

  getData = async (v) => {
    try {
      const response = await axios.get(
        'https://finewf.club:8080/api/articles/' + this.props.match.params.id + '?format=json'
      )
      this.setState({
        title: response.data.title,
        content: response.data.content
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
          title: values.title,
          content: values.content.toHTML(), // or values.content.toHTML()
          originalitySwitch: values.originalitySwitch
        }
        try {
          let config = {
            headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
          }
          const response = await axios.patch(
            'https://finewf.club:8080/api/articles/' + this.props.match.params.id,
            {
              title: submitData.title,
              content: submitData.content
            },
            config
          )
          this.setState({
            uploading: false
          })
          if (response.status === 200) {
            openNotificationWithIconS('success')
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
                <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                  <Form.Item >
                    <Button loading={this.state.uploading} type='primary' htmlType='submit' >
                        修改并发布
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('originalitySwitch', {
                      rules: []
                    })(<Switch checkedChildren='原创' unCheckedChildren='转载整理' />)}
                  </Form.Item>
                </div>
                <Form.Item >
                  {getFieldDecorator('title', {
                    initialValue: this.state.title,
                    rules: [{
                      required: true,
                      message: 'Please input title.'
                    }]
                  })(
                    <Input size='large' />
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
const ReviseArticle = withRouter(Form.create()(Revise))
export default ReviseArticle
