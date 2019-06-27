import React, { Component } from 'react'
import { Layout, Row, Col, Typography, Form, Button, Icon, Input, Upload, message, InputNumber, notification, Tooltip } from 'antd'
import { withRouter } from 'react-router'
import axios from 'axios'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

import './BookEditorPage.css'

const { Title } = Typography
const openNotificationWithIconS = (type) => {
  notification[type]({
    message: 'Successful',
    description: '发布成功',
    duration: 2
  })
}
const openNotificationWithIconE = (type) => {
  notification[type]({
    message: 'Error',
    description: '你还未通过编辑审核',
    duration: 2
  })
}
const { TextArea } = Input

function beforeUpload (file) {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isLt2M
}

class MovieEditor extends Component {
  state = {
    imageUrl: '',
    loading: false
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({
          loading: true
        })
        const submitData = {
          title: values.title,
          region: values.region,
          number: values.number,
          runtime: values.runtime,
          cover: values.cover ? values.cover[0].response.data.url : '',
          overview: values.overview
        }
        try {
          let config = {
            headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
          }
          const response = await axios.post(
            'https://finewf.club:8080/api/movies/',
            {
              title: submitData.title,
              region: submitData.region,
              number: submitData.number,
              runtime: submitData.runtime,
              cover: submitData.cover,
              overview: submitData.overview
            },
            config
          )
          this.setState({
            loading: false
          })
          if (response.status === 201) {
            openNotificationWithIconS('success')
            this.props.history.replace('/movie')
          }
        } catch (error) {
          if (error.response.status === 403) {
            openNotificationWithIconE('error')
            this.setState({
              loading: false
            })
          }
        }
      }
    })
  }

    normFile = e => {
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
              <Col xxl={{ span: 12, offset: 6 }} xl={{ span: 16, offset: 4 }} xs={{ span: 22, offset: 1 }}>
                <Title level={3}>Welcome!</Title>
                <Form onSubmit={this.handleSubmit} className='book-editor-form'>
                  <Form.Item
                    label='片名'>
                    {getFieldDecorator('title', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input the title of movie!'
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='地区'>
                    {getFieldDecorator('region', {
                      rules: [
                        {}
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label={(
                    <span>
                  集数&nbsp;
                      <Tooltip title='电影就是默认一集'>
                        <Icon type='question-circle-o' />
                      </Tooltip>
                    </span>
                  )}>
                    {getFieldDecorator('number', {
                      initialValue: 1,
                      rules: [
                        {
                          required: true,
                          message: 'Please input the numbers of movie!'
                        }
                      ]
                    })(<InputNumber min={0} max={100000000000} />)}
                    <span className='ant-form-text'>集</span>
                  </Form.Item>
                  <Form.Item label={(
                    <span>
                  单集片长&nbsp;
                      <Tooltip title='电影就是总时长'>
                        <Icon type='question-circle-o' />
                      </Tooltip>
                    </span>
                  )}>
                    {getFieldDecorator('runtime', {
                      initialValue: 0,
                      rules: [
                        {
                          required: true,
                          message: 'Please input the runtime of movie!'
                        }
                      ]
                    })(<InputNumber min={0} max={100000000000} />)}
                    <span className='ant-form-text'>分钟</span>
                  </Form.Item>
                  <Form.Item label='简述'>
                    {getFieldDecorator('overview', {
                      rules: [
                        {}
                      ]
                    })(<TextArea
                      placeholder='简要说说这部片吧'
                      autosize={{ minRows: 2, maxRows: 20 }}
                    />)}
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
                          <Icon type='upload' /> 点击上传
                        </Button>
                      </Upload>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' loading={this.state.loading}>
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

const MovieEditorPage = withRouter(Form.create()(MovieEditor))

export default MovieEditorPage
