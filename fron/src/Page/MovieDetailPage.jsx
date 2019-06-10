import React, { Component } from 'react'
import { Layout, Row, Col, Descriptions, PageHeader, Typography, List, Card } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './BookDetailPage.css'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import AddBookComment from '../AddBookComment'
import Advertisement from '../Advertisement'

const { Title } = Typography
const { Paragraph } = Typography
const { Meta } = Card

class BookDetailPage extends Component {
    state = {
      title: '',
      region: '',
      runtime: '',
      number: '',
      cover: '',
      overview: '',
      id: '',
      url: '',
      actor: [''],
      director: [''],
      writer: ['']
    }

    componentDidMount = async (v) => {
      await this.getData()
    }

    getData = async (v) => {
      try {
        const response = await axios.get(
          'https://finewf.club:8080/api/movies/' + this.props.match.params.id + '?format=json'
        )
        this.data = response.data.results
        this.setState(function (state) {
          return {
            title: response.data.title,
            runtime: response.data.runtime,
            number: response.data.number,
            region: response.data.region,
            cover: response.data.cover,
            overview: response.data.overview,
            id: response.data.id,
            url: response.data.url,
            director: response.data.director,
            writer: response.data.writer,
            actor: response.data.actor
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
              <Col xl={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
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
                      <Title level={2}>{this.state.title}</Title>
                      <Descriptions
                        border
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                      >
                        <Descriptions.Item label='集数'>{this.state.number}</Descriptions.Item>
                        <Descriptions.Item label='单集片长'>{this.state.runtime}</Descriptions.Item>
                        <Descriptions.Item label='制片国家/地区'>{this.state.region}</Descriptions.Item>
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
              <Col xl={{ span: 12, offset: 3 }} xs={{ span: 22, offset: 1 }}>
                <Title level={3}>内容简介 · · · · · ·</Title>
                <Paragraph ellipsis={{ rows: 2, expandable: true }} style={{ fontSize: '24' }}>
                  {this.state.overview}
                </Paragraph>
                <Title level={3}>导演 · · · · · ·</Title>
                <List
                  loading={this.state.loading}
                  grid={{
                    gutter: 24,
                    xs: 2,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 6
                  }}
                  size='small'
                  dataSource={this.state.director}
                  renderItem={item => (
                    <List.Item>
                      <Link to={'/figure/' + item.id}>
                        <Card
                          style={{ borderRadius: '10px' }}
                          loading={this.state.loading}
                          hoverable
                          cover={<img alt='example' src={item.cover} style={{ borderRadius: '10px', maxHeight: '180px' }} />}
                        >
                          <Meta title={item.name} />
                        </Card>
                      </Link>
                    </List.Item>
                  )}
                />
                <Title level={3}>编剧 · · · · · ·</Title>
                <List
                  loading={this.state.loading}
                  grid={{
                    gutter: 24,
                    xs: 2,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 6
                  }}
                  size='small'
                  dataSource={this.state.writer}
                  renderItem={item => (
                    <List.Item>
                      <Link to={'/figure/' + item.id}>
                        <Card
                          style={{ borderRadius: '10px' }}
                          loading={this.state.loading}
                          hoverable
                          cover={<img alt='example' src={item.cover} style={{ borderRadius: '10px', maxHeight: '180px' }} />}
                        >
                          <Meta title={item.name} />
                        </Card>
                      </Link>
                    </List.Item>
                  )}
                />
                <Title level={3}>演员表 · · · · · ·</Title>
                <List
                  loading={this.state.loading}
                  grid={{
                    gutter: 24,
                    xs: 2,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 6
                  }}
                  size='small'
                  dataSource={this.state.actor}
                  pagination={{
                    onChange: page => {
                      console.log(page)
                    },
                    pageSize: 4
                  }}
                  renderItem={item => (
                    <List.Item>
                      <Link to={'/figure/' + item.id}>
                        <Card
                          style={{ borderRadius: '10px' }}
                          loading={this.state.loading}
                          hoverable
                          cover={<img alt='example' src={item.cover} style={{ borderRadius: '10px', maxHeight: '180px' }} />}
                        >
                          <Meta title={item.name} />
                        </Card>
                      </Link>
                    </List.Item>
                  )}
                />
                <Title level={3}>影评 · · · · · ·</Title>
                <AddBookComment bookId={this.state.id} bookUrl={this.state.url} />
              </Col>
              <Col xl={{ span: 5, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                <Advertisement />
              </Col>
            </Row>
          </div>
          <Myfooter />
        </Layout>
      )
    }
}

export default BookDetailPage
