import React, { Component } from 'react'
import { Layout, Collapse } from 'antd'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

class Settings extends Component {
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
        <div style={{ flex: '1 0 ', padding: '60px', backgroundColor: '#fff' }} >
          <h1>我肝不动了...</h1>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Settings
