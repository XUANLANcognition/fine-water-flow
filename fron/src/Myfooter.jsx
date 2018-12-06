import React, { Component } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

class Myfooter extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <Footer style={{ textAlign: 'center', backgroundColor: '#343a40', color: '#fff' }}>
        <img src='/icon.png' style={{ width: '60px', height: '60px' }} />
            Non Machine Translate ©2018 Created by XUANLAN
      </Footer>
    )
  }
}

export default Myfooter
