import React, { Component } from 'react'
import { Layout, Avatar, Row, Col, Tabs, Icon, Button, Typography, Card, Statistic, Tag, message, Upload } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Nav from './Nav'
import Myfooter from './Myfooter'
import ProfileArticleList from './ProfileArticleList'
import FollowList from './FollowList'
import PropertyList from './PropertyList'

const TabPane = Tabs.TabPane
const { Paragraph } = Typography

function checkImageWH (file, width, height) {
  let self = this
  return new Promise(function (resolve, reject) {
    let filereader = new window.FileReader()
    filereader.onload = e => {
      let src = e.target.result
      const image = new window.Image()
      image.onload = function () {
        if (width && this.width < width) {
          message.error('error')
          reject()
        } else if (height && this.height < height) {
          message.error('error')
          reject()
        } else {
          resolve()
        }
      }
      image.onerror = reject
      image.src = src
    }
    filereader.readAsDataURL(file)
  })
}

function beforeUpload (file) {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('文件不能大于 2MB!')
  }
  return isLt2M && checkImageWH(file, 1200, 240)
}

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_bctqp8owe4o.js'
})

class Profile extends Component {
  state = {
    data: [],
    urlAvatar: '',
    username: '',
    bio: '',
    property: 0,
    profession: '',
    loading: false,
    cover: ''
  }

  componentDidMount = async (v) => {
    await this.getProfileData()
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
        return {
          urlAvatar: response.data.last_name,
          username: response.data.username,
          bio: response.data.profile.bio,
          property: response.data.profile.property,
          profession: response.data.profile.profession,
          cover: response.data.profile.cover
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  CoverAvatarUrl = async (avatarURL) => {
    let config = {
      headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
    }
    await axios.patch(
      'https://finewf.club:8080/api/users/' + window.localStorage.getItem('user_id'),
      {
        profile: { cover: avatarURL }
      },
      config
    )
    this.setState({
      cover: avatarURL
    })
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({ imageUrl: info.file.response.data.url, loading: false })
    }
    this.CoverAvatarUrl(info.file.response.data.url)
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
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
        <Nav />
        <Row style={{ marginTop: '15px' }}>
          <Col xxl={{ span: 14, offset: 5 }} xl={{ span: 20, offset: 2 }} md={{ span: 22, offset: 1 }} xs={{ span: 24, offset: 0 }} style={{ boxShadow: '0 1px 3px rgba(26,26,26,.1)' }}>
            <div style={{ background: `url(${this.state.cover})`, backgroundColor: '#fff', overflow: 'hidden', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundOrigin: 'padding-box', backgroundClip: 'border-box', backgroundAttachment: 'scroll', height: '240px' }}>
              <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: '20px', marginRight: '20px' }}>
                <Upload
                  name='avatar'
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                  customRequest={this.customRequest}
                  action='https://sm.ms/api/upload'
                >
                  <Button ghost style={{ width: '150px', color: '#fff' }}>
                    <Icon type='upload' />编辑
                  </Button>
                </Upload>
              </div>
            </div>
            <div style={{ background: '#fff', display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ height: '200px', width: '200px', marginTop: '-100px', padding: '20px' }}>
                <Avatar shape='square' src={this.state.urlAvatar} icon='user' style={{ height: '100%', width: '100%', border: '4px solid white', borderRadius: '10px', backgroundColor: 'white' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '26px', lineHeight: '30px', fontWeight: 'bold', color: '#000', marginRight: '6px' }}>{this.state.username}</span>
                  {this.state.profession && <Tag color='#f50' style={{ height: '22px', fontSize: '14px' }}>{ this.state.profession }</Tag>}
                </div>
                <Paragraph>{this.state.bio}</Paragraph>
              </div>
              <div style={{ display: 'flex', flexGrow: '1', flexDirection: 'row-reverse', alignItems: 'center', padding: '20px' }}>
                <Button type='primary' ghost style={{ width: '150px' }}>
                  <Link to='/settings/profile'>个人设置</Link>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ flex: '1 0', paddingTop: '15px', paddingBottom: '30px' }} >
          <Col xxl={{ span: 10, offset: 5 }} xl={{ span: 14, offset: 2 }} md={{ span: 14, offset: 1 }} xs={{ span: 24, offset: 0 }} style={{ background: '#fff', padding: '0 20px', marginBottom: '30px', boxShadow: '0 1px 3px rgba(26,26,26,.1)' }}>
            <Tabs defaultActiveKey='1' size='large'>
              <TabPane tab={<span><IconFont type='icon-wenzhang' />我的文章</span>} key='1'>
                <ProfileArticleList />
              </TabPane>
              <TabPane tab={<span><IconFont type='icon-meishi1' />我的关注</span>} key='2'>
                <FollowList />
              </TabPane>
            </Tabs>
          </Col>
          <Col xxl={{ span: 4, offset: 0 }} xl={{ span: 6, offset: 0 }} md={{ span: 8, offset: 0 }} xs={{ span: 22, offset: 1 }} style={{ paddingLeft: '20px' }} >
            <Card
              title={
                <div style={{ color: '#646464', fontWeight: '600', fontSize: '15px' }}>
                  积分
                </div>
              }
              bordered={false}
              style={{ boxShadow: '0 1px 3px rgba(26,26,26,.1)', marginBottom: '20px' }} >
              <PropertyList property={this.state.property} />
            </Card>
            <Card
              title={
                <div style={{ color: '#646464', fontWeight: '600', fontSize: '15px' }}>
                  成就
                </div>
              }
              bordered={false}
              style={{ boxShadow: '0 1px 3px rgba(26,26,26,.1)' }} >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                <Statistic title='关注了' value={112893} />
                <Statistic title='关注者' value={112893} />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }} />
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Profile
