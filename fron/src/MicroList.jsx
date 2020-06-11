import React, { Component } from 'react'
import { Icon, Typography } from 'antd'
import { Link } from 'react-router-dom'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_kgwvblgypll.js'
})

const { Title } = Typography

class MicroList extends Component {
  render () {
    return (
      <div style={{ padding: '20px 20px', background: '#fff', borderRadius: '1px', boxShadow: '0 1px 3px rgba(26,26,26,.1)', marginBottom: '10px' }}>
        <Title level={4} style={{ marginBottom: '30px' }}>工具箱</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Link to={'/today_article'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-duanwenyuedu' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>刷短文</div>
            </div>
          </Link>
          <Link to={'/json_page'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-JSON' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>JSON查看</div>
            </div>
          </Link>
          <Link to={'/poker_page'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-puke' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>抽癞子</div>
            </div>
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={'/qrcode_page'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-erweima' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>二维码</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default MicroList
