import React, { Component } from 'react'
import { Layout, Collapse } from 'antd'

import Nav from './Nav'
import Myfooter from './Myfooter'

const Panel = Collapse.Panel
const title = ['1', '2']
const text = ['1', '2']
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
}

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
        <div style={{ flex: '1 0 ', padding: '60px', backgroundColor: '#fff' }} >
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header={title} key='1' style={customPanelStyle}>
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Notice
