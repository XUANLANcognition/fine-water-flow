import React, { Component } from 'react'
import { Menu, Icon, Row, Col, Avatar, Popover } from 'antd'
import { Link } from 'react-router-dom'

import ProfileCard from './ProfileCard'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_xap1h8gomve.js'
})

const Card = (
  <div style={{ width: '298px', padding: '0' }}>
    <ProfileCard />
  </div>
)

class Nav extends Component {
  state = {
    current: ''
  }

  handleClick = (e) => {
    this.setState({
      current: e.key
    })
  }

  render () {
    return (
      <Row style={{ backgroundColor: '#343a40' }}>
        <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={this.state.current}
            mode='horizontal'
            style={{ backgroundColor: '#343a40', color: '#fff', border: '10px' }}
          >
            <Menu.Item>
              <img src='/icon.png' style={{ width: '50px', height: '50px' }} />
              <Link to='/' />
            </Menu.Item>
            <Menu.Item key='home'>
              <IconFont type='icon-zhuye' />主页
              <Link to='/' />
            </Menu.Item>
            <Menu.Item key='book'>
              <IconFont type='icon-shu1' />读书
              <Link to='/book' />
            </Menu.Item>
            <Menu.Item key='movie'>
              <IconFont type='icon-dianying' />观影
              <Link to='/movie' />
            </Menu.Item>
            <Menu.Item key='notice'>
              <IconFont type='icon-xiaoxi' />消息
              <Link to='/notice' />
            </Menu.Item>
            <Menu.Item key='user'>
              <Popover content={Card} placement='bottomRight' >
                <Avatar size='large' icon='user' />
              </Popover>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>

    )
  }
}

export default Nav
