import React, { Component } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

class Myfooter extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <Footer style={{ textAlign: 'center', backgroundColor: '#343a40', color: '#fff' }}>
        <img src='/icon.png' style={{ width: '60px', height: '60px', margin: '0 20px 0 20px' }} />
            FWF ©2019 Created by XUANLAN
      </Footer>
    )
  }
}

export default Myfooter
