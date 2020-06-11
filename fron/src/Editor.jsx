import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import { Editor } from 'slate-react'
import { Value } from 'slate'

import 'ory-editor-plugins-image/lib/index.css'

import Nav from './Nav'
import Myfooter from './Myfooter'

const initialValue = Value.fromJSON({
  document: { 
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.'
              }
            ]
          }
        ]
      }
    ]
  }
})

class Editor1 extends Component {
  state = {
    value: initialValue
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xl={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
              <Editor
                value={this.state.value}
                onChange={this.onChange}
              />
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Editor1
