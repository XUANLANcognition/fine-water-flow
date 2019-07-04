import React, { Component } from 'react'
import { Result, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_owf7reonlx8.js'
})

class NoMatch extends Component {
  render () {
    return (
      <div>
        <Result
          title='404'
          icon={<IconFont type='icon-icon-test' style={{ fontSize: '320px' }} />}
          subTitle='Sorry, the page you visited does not exist.'
          extra={
            <Link to='/'>
              <Button type='primary'>返回主页</Button>
            </Link>
          }
        />
      </div>
    )
  }
}

export default NoMatch
