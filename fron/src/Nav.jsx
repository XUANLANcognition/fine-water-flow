import React, { Component } from 'react'
import { Menu, Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

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
        <Col xl={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
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
              <Icon type='home' />主页
              <Link to='/' />
            </Menu.Item>
            <Menu.Item key='book'>
              <Icon type='book' />读书
              <Link to='/book' />
            </Menu.Item>
            <Menu.Item key='movie'>
              <Icon type='book' />观影
              <Link to='/movie' />
            </Menu.Item>
            <Menu.Item key='notice'>
              <Icon type='mail' />消息
              <Link to='/notice' />
            </Menu.Item>
          </Menu>
        </Col>
      </Row>

    )
  }
}

export default Nav
