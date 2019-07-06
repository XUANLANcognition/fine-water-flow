import React, { Component } from 'react'
import { } from 'antd'

class SourceList extends Component {
  render () {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ color: 'black', marginRight: '20px', fontSize: '16px', fontWeight: 'bold' }}>{this.props.title}</div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', flexWrap: 'wrap' }}>
          {this.props.data.map(item => (
            <a href={item.url}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
                {item.plantform}
              </div>
            </a>
          ))}
        </div>
      </div>
    )
  }
}

export default SourceList
