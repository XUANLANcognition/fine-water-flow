import React, { Component } from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

class NoMatch extends Component {
  render () {
    return (
      <div>
        <Result
          title='404'
          subTitle='Sorry, the page you visited does not exist.'
          extra={
            <Link to='/'>
              <Button type='primary'>Back Home</Button>
            </Link>
          }
        />
      </div>
    )
  }
}

export default NoMatch
