import React, { Component } from 'react'
import { Layout, Row, Col, Descriptions, PageHeader, Typography } from 'antd'
import axios from 'axios'

import './BookDetailPage.css'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import Advertisement from '../Advertisement'

const { Title } = Typography
const { Paragraph } = Typography

class FigureDetailPage extends Component {
    state = {
      name: '',
      birthday: '',
      deathday: '',
      gender: '',
      place: '',
      cover: '',
      id: '',
      url: ''
    }

    componentDidMount = async (v) => {
      await this.getData()
    }

    getData = async (v) => {
      try {
        const response = await axios.get(
          'https://finewf.club:8080/api/figures/' + this.props.match.params.id + '?format=json'
        )
        this.data = response.data.results
        this.setState(function (state) {
          return {
            name: response.data.name,
            birthday: response.data.birthday,
            deathday: response.data.deathday,
            gender: response.data.gender,
            place: response.data.place,
            cover: response.data.cover,
            id: response.data.id,
            url: response.data.url
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    render () {
      return (
        <Layout style={{ minHeight: '100vh', background: 'unset' }}>
          <Nav />
          <div style={{ flex: '1 0 ' }}>
            <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
                <PageHeader className='pageheader'
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'hsla(0, 0%, 97%, 0.8)',
                    borderRadius: '20px'
                  }}>
                  <div style={{
                    background: `url(${this.state.cover})`,
                    position: 'absolute',
                    filter: 'blur(20px)',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: -1
                  }} />
                  <div className='wrap' style={{ background: 'rgba(0,30%,100%,90%)' }}>
                    <div className='content'>
                      <Title level={2}>{this.state.name}</Title>
                      <Descriptions
                        border
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                      >
                        <Descriptions.Item label='性别'>{this.state.gender}</Descriptions.Item>
                        <Descriptions.Item label='出生日期'>{this.state.birthday}</Descriptions.Item>
                        <Descriptions.Item label='地区'>{this.state.place}</Descriptions.Item>
                      </Descriptions>
                    </div>
                    <div className='extraContent'>
                      <img
                        src={this.state.cover}
                        alt={this.state.title}
                        style={{ maxWidth: '180px', borderRadius: '10px' }}
                      />
                    </div>
                  </div>
                </PageHeader>
              </Col>
            </Row>
            <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <Col xxl={{ span: 10, offset: 4 }} xl={{ span: 12, offset: 2 }} xs={{ span: 22, offset: 1 }}>
                <Title level={3}>个人简介 · · · · · ·</Title>
                <Paragraph ellipsis={{ rows: 2, expandable: true }} style={{ fontSize: '24' }} />
              </Col>
              <Col xxl={{ span: 5, offset: 1 }} xl={{ span: 7, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                <Advertisement />
              </Col>
            </Row>
          </div>
          <Myfooter />
        </Layout>
      )
    }
}

export default FigureDetailPage
