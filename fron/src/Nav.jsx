import React, { Component } from 'react'
import { Icon, Row, Col, Avatar, Popover } from 'antd'
import { Link } from 'react-router-dom'

import ProfileCard from './ProfileCard'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_7sypq2as9i4.js'
})

const Card = (
  <div style={{ width: '176px', boxShadow: '0px 2px 5px #888888' }}>
    <ProfileCard />
  </div>
)

class Nav extends Component {
  render () {
    return (
      <Row style={{ backgroundColor: '#fff', boxShadow: '0px 2px 2px #888888' }}>
        <Col xxl={{ span: 14, offset: 5 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
          <div style={{ backgroundColor: '#fff', color: '#fff', lineHeight: '56px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            <div style={{ paddingRight: '24px', display: 'flex', alignItems: 'center', marginLeft: '-10px' }}>
              <Link to='/' >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img src='/icon.png' style={{ width: '60px', height: '60px' }} />
                  <div style={{ fontWeight: '700', fontSize: '18px' }}>
                  Fine Water Flow
                  </div>
                </div>

              </Link>
            </div>

            <Link to='/'>
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont type='icon-yingyongzhongxin' style={{ fontSize: '24px' }} />
                <div style={{ color: '#1890ff', paddingLeft: '10px', fontWeight: 'bold' }}>
                   主页
                </div>
              </div>
            </Link>

            <Link to='/book' >
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont type='icon-tushu' style={{ fontSize: '24px' }} />
                <div style={{ color: '#1890ff', paddingLeft: '10px', fontWeight: 'bold' }}>
                读书
                </div>
              </div>
            </Link>

            <Link to='/movie' >
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont type='icon-dianyingpiao' style={{ fontSize: '24px' }} />
                <div style={{ color: '#1890ff', paddingLeft: '10px', fontWeight: 'bold' }}>
                观影
                </div>
              </div>
            </Link>

            <Link to='/notice' >
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont type='icon-xinxi' style={{ fontSize: '24px' }} />
                <div style={{ color: '#1890ff', paddingLeft: '10px', fontWeight: 'bold' }}>
                消息
                </div>
              </div>
            </Link>

            <div style={{ display: 'flex', flexGrow: '1', flexDirection: 'row-reverse', alignItems: 'center' }}>
              <div>
                <Link to='#'>
                  <Popover content={Card} placement='bottomRight' trigger='click' >
                    <Avatar shape='square' size='default' icon='user' src={window.localStorage.getItem('user_avatar')} />
                  </Popover>
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>

    )
  }
}

export default Nav
