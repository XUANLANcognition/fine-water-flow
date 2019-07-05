import React, { Component } from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'

class RowList extends Component {
  render () {
    return (
      <div style={{ display: 'flex', alignItems: 'center', padding: '20px 0' }}>
        <div style={{ color: 'black', marginRight: '20px', fontSize: '16px', fontWeight: 'bold' }}>{this.props.title}</div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
          {this.props.data.map(item => (
            <Link to={'/figure/' + item.id}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar size={64} src={item.cover} style={{ margin: '0 10px', boxShadow: '0px 0px 10px #888888' }} />
                <div style={{ color: 'black', marginTop: '10px' }}>
                  {item.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default RowList
