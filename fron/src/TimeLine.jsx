import React, { Component } from 'react'
import { Timeline } from 'antd'
import { } from 'react-router-dom'

class TimeLine extends Component {
  constructor (props) {
    super(props)
    this.state = {
      node: []
    }
  }

  render () {
    return (
      <Timeline style={{ padding: '60px' }}>
        {this.props.list.map((node, index) =>
          <Timeline.Item>{index + '  :  ' + node.title}</Timeline.Item>
        )}
      </Timeline>
    )
  }
}

export default TimeLine
