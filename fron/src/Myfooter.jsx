import React, { Component } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

class Myfooter extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <Footer style={{ textAlign: 'center', backgroundColor: '#343a40', color: '#fff' }}>
            Non Machine Translate ©2018 Created by XUANLAN
      </Footer>
    )
  }
}

export default Myfooter
