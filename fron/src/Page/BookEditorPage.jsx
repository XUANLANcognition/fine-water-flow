import React, { Component } from 'react'
import { Layout, Row, Col, Typography, Form, Button, Icon, Input, Upload, message, InputNumber, notification } from 'antd'
import { withRouter } from 'react-router'
import axios from 'axios'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

import './BookEditorPage.css'

const { Title } = Typography
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'successful',
    description: '发布成功',
    duration: 2
  })
}

function beforeUpload (file) {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isLt2M
}

class BookEditor extends Component {
  state = {
    imageUrl: '',
    loading: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        const submitData = {
          title: values.title,
          subtitle: values.subtitle,
          author: values.author,
          publisher: values.publisher,
          isbn: values.isbn,
          pages: values.pages,
          cover: values.cover[0].response.data.url
        }
        try {
          let config = {
            headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
          }
          const response = await axios.post(
            'https://finewf.club:8080/api/books/',
            {
              title: submitData.title,
              subtitle: submitData.subtitle,
              author: submitData.author,
              publisher: submitData.publisher,
              isbn: submitData.isbn,
              pages: submitData.pages,
              cover: submitData.cover
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

    normFile = e => {
      console.log('Upload event:', e.file)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    }

    customRequest = async (info) => {
      try {
        let formData = new window.FormData()
        formData.append('smfile', info.file)
        const response = await axios.post(
          info.action,
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }
        )
        info.onSuccess(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    render () {
      const { getFieldDecorator } = this.props.form

      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Nav />
          <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
            <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
                <Title level={3}>Welcome!</Title>
                <Form onSubmit={this.handleSubmit} className='book-editor-form'>
                  <Form.Item
                    label='书名'>
                    {getFieldDecorator('title', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input the title of book!'
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='副标题'>
                    {getFieldDecorator('subtitle', {
                      rules: [
                        {}
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='作者'>
                    {getFieldDecorator('author', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input the author of book!'
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='出版社'>
                    {getFieldDecorator('publisher', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input the publisher of book!'
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='ISBN'>
                    {getFieldDecorator('isbn', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input the isbn of book!'
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='页数'>
                    {getFieldDecorator('pages', {
                      initialValue: 0,
                      rules: [
                        {
                          required: true,
                          message: 'Please input the pages of book!'
                        }
                      ]
                    })(<InputNumber min={0} max={100000000000} />)}
                    <span className='ant-form-text'> machines</span>
                  </Form.Item>
                  <Form.Item label='封面'>
                    {getFieldDecorator('cover', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile
                    })(
                      <Upload name='cover'
                        action='https://sm.ms/api/upload'
                        listType='picture'
                        customRequest={this.customRequest}
                        beforeUpload={beforeUpload}>
                        <Button>
                          <Icon type='upload' /> Click to upload
                        </Button>
                      </Upload>
                    )}
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 2, offset: 22 }}>
                    <Button type='primary' htmlType='submit'>
                        上传
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
          <Myfooter />
        </Layout>
      )
    }
}

const BookEditorPage = withRouter(Form.create()(BookEditor))

export default BookEditorPage
