import React, { Component } from 'react'
import { Layout, Row, Col, Button } from 'antd'
import axios from 'axios'
import Texty from 'rc-texty'
import 'rc-texty/assets/index.css'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import CheckBoard from '../CheckBoard'

class GobangPage extends Component {
    state = {
      data: '',
      loading: false
    }

    componentDidMount = async (v) => {
    }

    render () {
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Nav />
          <div style={{ flex: '1 0', minHeight: '100vh', backgroundColor: '#fff' }}>
            <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
             <CheckBoard></CheckBoard>
            </Row>
          </div>
          <Myfooter />
        </Layout>
      )
    }
}

export default GobangPage
