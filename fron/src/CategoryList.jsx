import React, { Component } from 'react'
import { Icon, Row, Col, Card } from 'antd'
import { Link } from 'react-router-dom'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_lapfux51pxk.js'
})
const gridStyle = {
  textAlign: 'center'
}

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
      <Card title='做点啥'>
        <Link to='/textEditorPage'>
          <Card.Grid style={gridStyle} >
            <IconFont type='icon-article' style={{ fontSize: '36px' }} />
          </Card.Grid>
        </Link>
        <Link to='/book_editor_page'>
          <Card.Grid style={gridStyle}>
            <IconFont type='icon-book' style={{ fontSize: '36px' }} />
          </Card.Grid>
        </Link>
        <Link to='/movie_editor_page'>
          <Card.Grid style={gridStyle} >
            <IconFont type='icon-movie' style={{ fontSize: '36px' }} />
          </Card.Grid>
        </Link>
        <Card.Grid style={gridStyle} >
        </Card.Grid>
        <Card.Grid style={gridStyle} >
        </Card.Grid>
        <Card.Grid style={gridStyle} >
        </Card.Grid>
      </Card>
    )
  }
}

export default CategoryList
