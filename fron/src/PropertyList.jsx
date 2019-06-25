import React, { Component } from 'react'
import { Icon } from 'antd'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_8abwfkq3kic.js'
})

class PropertyList extends Component {
  render () {
    return (
      <div style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <IconFont type='icon-mangguo' style={{ fontSize: '24px' }} />
          <div>
            {Math.floor(this.props.property / 100)}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <IconFont type='icon-caomei' style={{ fontSize: '24px' }} />
          <div>
            {Math.floor((this.props.property % 100) / 10)}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <IconFont type='icon-lizhi' style={{ fontSize: '24px' }} />
          <div>
            {Math.floor((this.props.property % 10) / 1)}
          </div>
        </div>
      </div>
    )
  }
}

export default PropertyList
