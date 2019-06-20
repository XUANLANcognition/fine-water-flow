import React, { Component } from 'react'
import { Icon, Row, Col, Avatar, Popover } from 'antd'
import { Link } from 'react-router-dom'

import ProfileCard from './ProfileCard'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_xap1h8gomve.js'
})

const Card = (
  <div style={{ width: '298px' }}>
    <ProfileCard />
  </div>
)

class Nav extends Component {
  render () {
    return (
      <Row style={{ backgroundColor: '#343a40' }}>
        <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
          <div style={{ backgroundColor: '#343a40', color: '#fff', lineHeight: '64px', display: 'flex', flexDirection: 'row' }}
          >
            <div style={{ paddingRight: '24px', display: 'flex', alignItems: 'center' }}>
              <Link to='/' >
                <img src='/icon.png' style={{ width: '60px', height: '60px' }} />
              </Link>
            </div>

            <Link to='/'>
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont type='icon-zhuye' style={{ fontSize: '24px' }} />
                <div style={{ color: 'white', paddingLeft: '10px' }}>
                   主页
                </div>
              </div>
            </Link>

            <Link to='/book' >
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont type='icon-shu1' style={{ fontSize: '24px' }} />
                <div style={{ color: 'white', paddingLeft: '10px' }}>
                读书
                </div>
              </div>
            </Link>

            <Link to='/movie' >
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont type='icon-dianying' style={{ fontSize: '24px' }} />
                <div style={{ color: 'white', paddingLeft: '10px' }}>
                观影
                </div>
              </div>
            </Link>

            <Link to='/notice' >
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont type='icon-xiaoxi' style={{ fontSize: '24px' }} />
                <div style={{ color: 'white', paddingLeft: '10px' }}>
                消息
                </div>
              </div>
            </Link>

            <div style={{ width: '96px', display: 'flex', justifyContent: 'space-start', flexGrow: '1', flexDirection: 'row-reverse' }}>
              <div>
                <Link to='#'>
                  <Popover content={Card} placement='bottomRight' trigger='click' >
                    <Avatar size='large' icon='user' src={window.localStorage.getItem('user_avatar')} />
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
