import React, { Component } from 'react'
import { Carousel, Typography } from 'antd'

// import './Advertisement.css'

const { Title } = Typography

class Advertisement extends Component {
  render () {
    return (
      <div style={{ borderRadius: '1px', background: '#fff', padding: '20px', marginTop: '10px', boxShadow: '0 1px 3px rgba(26,26,26,.1)' }}>
        <Title level={4}>广告</Title>
        <Carousel autoplay effect='fade'>
          <div style={{ borderRadius: '5px' }}>
            <h3>搭飞机坐火车去哪里都好</h3>
          </div>
          <div style={{ borderRadius: '5px' }}>
            <h3>我都觉得精彩</h3>
          </div>
          <div style={{ borderRadius: '5px' }}>
            <h3>这个世界是多么神奇</h3>
          </div>
          <div style={{ borderRadius: '5px' }}>
            <h3>我竟然遇到了你</h3>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default Advertisement
