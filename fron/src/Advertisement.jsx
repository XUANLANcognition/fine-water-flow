import React, { Component } from 'react'
import { Card } from 'antd'

class Advertisement extends Component {
  render () {
    return (
      <Card
        title='广告位'
        style={{ width: 300 }}
      >
        <p>诚招</p>
      </Card>
    )
  }
}

export default Advertisement
