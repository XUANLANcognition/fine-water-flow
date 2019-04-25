import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd'
import axios from 'axios'

function beforeUpload (file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

class AvatarUpload extends Component {
  state = {
    loading: false
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({ imageUrl: info.file.response.data.url, loading: false })
    }
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl
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
        {imageUrl ? <img src={imageUrl} alt='avatar' /> : uploadButton}
      </Upload>
    )
  }
}

export default AvatarUpload
