import React, { Component } from 'react'
import { Layout } from 'antd'

import Nav from './Nav'
import Myfooter from './Myfooter'

class Notice extends Component {
  componentDidMount () {
  }

  state = {
    collapsed: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ' }} />
        <Myfooter />
      </Layout>
    )
  }
}

export default Notice
