import React, { Component } from 'react'
import { Layout, Row, Col, Button } from 'antd'
import axios from 'axios'
import Texty from 'rc-texty'
import 'rc-texty/assets/index.css'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

class TodayArticle extends Component {
    state = {
      data: '',
      loading: false,
      dire: 'left'
    }

    getData = async (v) => {
      let url = 'https://interface.meiriyiwen.com/article/random?dev=1'
      const response = await axios.get(url)
      this.setState({
        data: response.data.data,
        dire: 'bottom'
      })
    }

    componentDidMount = async (v) => {
      await this.getData()
    }

    refresh = async (v) => {
      await this.setState({
        loading: true,
        dire: 'right'
      })
      await this.getData()
      setTimeout((null), 1024)
      this.setState({
        loading: false,
        dire: 'top'
      })
    }

    render () {
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Nav />
          <div style={{ flex: '1 0', minHeight: '100vh', backgroundColor: '#fff' }}>
            <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <Col xxl={{ span: 14, offset: 5 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
                <h1 style={{ display: 'flex', justifyContent: 'center', color: '#000', fontWeight: '600' }}>
                  <Texty mode='sync' type={this.state.dire}>
                    {this.state.data.title}
                  </Texty>
                </h1>
                <div style={{ background: '#f1f1f1', padding: '20px', borderRadius: '5px', fontWeight: '600' }}>{this.state.data.digest}</div>
                <div style={{ display: 'flex', flexDirection: 'row-reverse', margin: '20px 0', color: '#000', fontWeight: '600' }}>作者 : {this.state.data.author}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row-reverse', margin: '20px 0' }}>
                  <Button type='primary' onClick={this.refresh} loading={this.state.loading}>下一篇</Button>
                </div>
                <div style={{ overflow: 'auto', fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
              </Col>
            </Row>
          </div>
          <Myfooter />
        </Layout>

      )
    }
}

export default TodayArticle
