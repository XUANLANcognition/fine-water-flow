import React, { Component } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

class Myfooter extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <Footer style={{ textAlign: 'center', backgroundColor: '#343a40', color: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ margin: '5px 0' }}>
            <img src='/icon.png' style={{ width: '60px', height: '60px' }} />Fine Water Flow
          </div>
          <div style={{ margin: '5px 0' }}>
            Fine Water Flow ©2019 Created by XUANLAN
          </div>
          <div style={{ margin: '5px 0' }}>
            若本站收录内容无意侵犯了贵公司版权，请给网页底部邮箱地址来信，我会及时处理和回复，谢谢合作
          </div>
          <div style={{ margin: '5px 0' }}>
            站长邮箱 : guoliangxuanlan@outlook.com
          </div>
        </div>
      </Footer>
    )
  }
}

export default Myfooter
