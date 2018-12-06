import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

class Nav extends Component {
  state = {
    current: 'mail'
  }

  handleClick = (e) => {
    console.log('click ', e)
    this.setState({
      current: e.key
    })
  }

  render () {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode='horizontal'
        style={{ padding: '10px 40px 0px 40px', backgroundColor: '#343a40', color: '#fff' }}
      >
        <Menu.Item>
          <img src='/icon.png' style={{ width: '40px', height: '40px' }} />
          <Link to='/' />
        </Menu.Item>
        <Menu.Item key='home'>
          <Icon type='home' />HOME
          <Link to='/' />
        </Menu.Item>
        <Menu.Item key='notice'>
          <Icon type='mail' />NOTICE
          <Link to='/notice' />
        </Menu.Item>
      </Menu>
    )
  }
}

export default Nav
