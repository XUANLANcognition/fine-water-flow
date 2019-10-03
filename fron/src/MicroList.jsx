import React, { Component } from 'react'
import { Icon, Typography } from 'antd'
import { Link } from 'react-router-dom'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_ng8zkbwomt.js'
})

const { Title } = Typography

class MicroList extends Component {
  render () {
    return (
      <div style={{ padding: '20px 20px', background: '#fff', borderRadius: '1px', boxShadow: '0 1px 3px rgba(26,26,26,.1)', marginBottom: '10px' }}>
        <Title level={4} style={{ marginBottom: '30px' }}>奇思妙想</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={'/today_article'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-duanwenyuedu' style={{ fontSize: '36px' }} />
              <div>刷短文</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default MicroList
