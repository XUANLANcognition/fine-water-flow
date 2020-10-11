import React, { Component } from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
import { Typography } from 'antd';
import Link from "next/link";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_44n8lzs19th.js'
})

const { Title } = Typography

class MicroList extends Component {
  render () {
    return (
      <div style={{ padding: '20px 20px', background: '#fff', borderRadius: '1px', boxShadow: '0 1px 3px rgba(26,26,26,.1)', marginBottom: '10px' }}>
        <Title level={4} style={{ marginBottom: '30px' }}>工具箱</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
          <Link href={'/today_article'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-duanwenyuedu' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>刷短文</div>
            </div>
          </Link>
          <Link href={'/json_page'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-JSON' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>JSON查看</div>
            </div>
          </Link>
          <Link href={'/poker_page'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-puke' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>抽癞子</div>
            </div>
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
          <Link href={'/qrcode_page'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-erweima' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>二维码</div>
            </div>
          </Link>
          <Link href={'/chart_page'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-tubiao' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>图表绘</div>
            </div>
          </Link>
          <Link href={'/device_page'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-diannao' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>数码</div>
            </div>
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href={'/adobe_page'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-adobe-01-01-01' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>Adobe</div>
            </div>
          </Link>
          <Link href={'/gobang_page'}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconFont type='icon-qipanqu' style={{ fontSize: '36px' }} />
              <div style={{ fontSize: '12px' }}>五子棋</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default MicroList
