import React, { Component } from 'react'
import { } from 'antd'

class StillList extends Component {
  render () {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '40px' }}>
        <div style={{ color: 'black', marginRight: '20px', fontSize: '16px', fontWeight: 'bold' }}>{this.props.title}</div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', flexWrap: 'wrap' }}>
          {this.props.data.map(item => (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img alt={item.title} src={item.url} style={{ width: '200px', maxHeight: '1350px', margin: '5px 10px', borderRadius: '5px' }} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default StillList
