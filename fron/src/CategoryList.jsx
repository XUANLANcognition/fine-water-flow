import React, { Component } from 'react'
import { Icon, Card, Typography } from 'antd'
import { Link } from 'react-router-dom'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_lapfux51pxk.js'
})

const { Title } = Typography

class CategoryList extends Component {
  state = {
    current: ''
  }

  handleClick = (e) => {
    this.setState({
      current: e.key
    })
  }

  render () {
    return (
      <div style={{ padding: '20px', background: '#f7f7f7', borderRadius: '5px' }}>
        <Title level={4}>改变</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/textEditorPage'>
            <IconFont type='icon-article' style={{ fontSize: '36px' }} />
          </Link>
          <Link to='/book_editor_page'>
            <IconFont type='icon-book' style={{ fontSize: '36px' }} />
          </Link>
          <Link to='/movie_editor_page'>
            <IconFont type='icon-movie' style={{ fontSize: '36px' }} />
          </Link>
        </div>
      </div>
    )
  }
}

export default CategoryList
