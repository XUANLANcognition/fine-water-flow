import React, { Component } from 'react'
import { Upload, message, Avatar, Icon } from 'antd'
import axios from 'axios'

function beforeUpload (file) {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('文件不能大于 2MB!')
  }
  return isLt2M
}

class AvatarUpload extends Component {
  state = {
    loading: false
  };

  componentDidUpdate (prevProps) {
    if (prevProps.avatarUrl !== this.props.avatarUrl) {
      this.setState({ imageUrl: this.props.avatarUrl })
    }
  }

  CoverAvatarUrl = async (avatarURL) => {
    let config = {
      headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
    }
    await axios.patch(
      'https://finewf.club:8080/api/users/' + window.localStorage.getItem('user_id'),
      {
        'last_name': avatarURL
      },
      config
    )
    window.localStorage.setItem('user_avatar', avatarURL)
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
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        customRequest={this.customRequest}
        action='https://sm.ms/api/upload'
      >
        {this.state.loading ? <Icon style={{ width: '180px', height: '180px', fontSize: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} type={this.state.loading ? 'loading' : 'plus'} /> : <Avatar size={180} shape='square' src={this.state.imageUrl} icon='user' style={{ color: '#ffffff', backgroundColor: '#f6f6f6' }} />}
      </Upload>
    )
  }
}

export default AvatarUpload
