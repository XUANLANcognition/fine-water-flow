import React, { Component } from 'react'
import { Card, Carousel } from 'antd'

import './Advertisement.css'

class Advertisement extends Component {
  render () {
    return (
      <Card
        title='广告位'
        bordered={false}
      >
        <Carousel autoplay effect='fade'>
          <div>
            <h3>搭飞机坐火车去哪里都好</h3>
          </div>
          <div>
            <h3>我都觉得精彩</h3>
          </div>
          <div>
            <h3>这个世界是多么神奇</h3>
          </div>
          <div>
            <h3>我竟然遇到了你</h3>
          </div>
        </Carousel>
      </Card>
    )
  }
}

export default Advertisement
