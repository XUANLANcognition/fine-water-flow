import React, { Component } from 'react'
import { Layout, Col, Row, Form, Icon, Button, Input, message, Select } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import AvatarUpload from '../AvatarUpload'

const { Option } = Select

const profession = ['高新科技', '互联网', '电子商务', '    电子游戏', '    计算机软件', '    计算机硬件', '信息传媒', '    出版业', '    电影录音', '    广播电视', '    通信', '金融', '    银行', '    资本投资', '    证券投资', '    保险', '    信贷', '    财务', '    审计', '服务业', '    法律', '    餐饮', '    酒店', '    旅游', '    广告', '    公关', '    景观', '    咨询分析', '    市场推广', '    人力资源', '    社工服务', '    养老服务', '教育', '    高等教育', '    基础教育', '    职业教育', '    幼儿教育', '    特殊教育', '    培训', '医疗服务', '    临床医疗', '    制药', '    保健', '    美容', '    医疗器材', '    生物工程', '    疗养服务', '    护理服务', '艺术娱乐', '    创意艺术', '    体育健身', '    娱乐休闲', '    图书馆', '    博物馆', '    策展', '    博彩', '制造加工', '    食品饮料业', '    纺织皮革业', '    服装业', '    烟草业', '    造纸业', '    印刷业', '    化工业', '    汽车', '    家具', '    电子电器', '    机械设备', '    塑料工业', '    金属加工', '    军火', '地产建筑', '    房地产', '    装饰装潢', '    物业服务', '    特殊建造', '    建筑设备', '贸易零售', '    零售', '    大宗交易', '    进出口贸易', '公共服务', '    政府', '    国防军事', '    航天', '    科研', '    给排水', '    水利能源', '    电力电网', '    公共管理', '    环境保护', '    非营利组织', '开采冶金', '    煤炭工业', '    石油工业', '    黑色金属', '    有色金属', '    土砂石开采', '    地热开采', '交通仓储', '    邮政', '    物流递送', '    地面运输', '    铁路运输', '    管线运输', '    航运业', '    民用航空业', '农林牧渔', '    种植业', '    畜牧养殖业', '    林业', '    渔业']

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
    uploading: false,
    profession: ''
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
        'https://101.200.52.246:8080/api/users/' + window.localStorage.getItem('user_id') + '?format=json',
        config
      )
      this.data = response.data.results
      this.setState(function (state) {
        return { urlAvatar: response.data.last_name, bio: response.data.profile.bio, username: response.data.username, email: response.data.email, profession: response.data.profile.profession }
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
          email: values.email,
          profession: values.profession
        }
        try {
          let config = {
            headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
          }
          const response = await axios.patch(
            'https://101.200.52.246:8080/api/users/' + window.localStorage.getItem('user_id'),
            {
              username: submitData.username,
              profile: { bio: submitData.bio, profession: submitData.profession },
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
          this.setState({
            uploading: false
          })
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
            <Col xxl={{ span: 3, offset: 5 }} xl={{ span: 4, offset: 2 }} md={{ span: 5, offset: 1 }} xs={{ span: 22, offset: 1 }} style={{ marginBottom: '20px' }}>
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
                      <div style={{ fontSize: '14px', fontWeight: '600', lineHeight: '21px', marginBottom: '3px', color: '#24292e' }}>所在行业</div>
                      <Form.Item hasFeedback>
                        {getFieldDecorator('profession', {
                          initialValue: this.state.profession,
                          rules: [{ required: true, message: 'Please select your peofession!' }]
                        })(
                          <Select placeholder='Please select a profession'>
                            {profession.map(item => (
                              <Option value={item}>{item}</Option>
                            ))}
                          </Select>
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
