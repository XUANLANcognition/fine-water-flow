import React, { Component } from 'react'
import { Layout, Row, Col, Descriptions, Typography, Tag, BackTop } from 'antd'
import axios from 'axios'

import './BookDetailPage.css'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import AddBookComment from '../AddBookComment'
import Advertisement from '../Advertisement'

const { Title } = Typography

class BookDetailPage extends Component {
    state = {
      title: '',
      author: '',
      publisher: '',
      isbn: '',
      pages: '',
      cover: '',
      overview: '',
      subtitle: '',
      tags: [],
      id: '',
      url: ''
    }

    componentDidMount = async (v) => {
      await this.getData()
    }

    getData = async (v) => {
      try {
        const response = await axios.get(
          'https://101.200.52.246:8080/api/books/' + this.props.match.params.id + '?format=json'
        )
        this.data = response.data.results
        this.setState(function (state) {
          return {
            title: response.data.title,
            author: response.data.author,
            publisher: response.data.publisher,
            isbn: response.data.isbn,
            pages: response.data.pages,
            cover: response.data.cover,
            overview: response.data.overview,
            subtitle: response.data.subtitle,
            tags: response.data.tag,
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
          <BackTop />
          <div style={{ flex: '1 0 ' }}>
            <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <Col xxl={{ span: 14, offset: 5 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
                <div className='Bookheader'
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
                  <div className='wrap' style={{ background: 'rgba(0,30%,100%,90%)', display: 'flex', justifyContent: 'space-between', padding: '20px 30px' }}>
                    <div className='content'>
                      <Title level={3}>{this.state.title}</Title>
                      <Descriptions
                        border
                        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                      >
                        <Descriptions.Item label='副标题'>{this.state.subtitle}</Descriptions.Item>
                        <Descriptions.Item label='作者'>{this.state.author}</Descriptions.Item>
                        <Descriptions.Item label='出版社'>{this.state.publisher}</Descriptions.Item>
                        <Descriptions.Item label='页数'>{this.state.pages}</Descriptions.Item>
                        <Descriptions.Item label='ISBN'>{this.state.isbn}</Descriptions.Item>
                      </Descriptions>
                      {this.state.tags.map(tag => (
                        <Tag key={tag.title} color='#343a40' style={{ margin: '5px' }}>
                          {tag.title}
                        </Tag>
                      ))}
                    </div>
                    <div className='BookCover'>
                      <img
                        src={this.state.cover}
                        alt={this.state.title}
                        style={{ width: '135px', maxHeight: '200px', marginLeft: '10px' }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <Col xxl={{ span: 10, offset: 5 }} xl={{ span: 13, offset: 2 }} md={{ span: 15, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                <Title level={4}>内容简介 · · · · · ·</Title>
                <div style={{ padding: '24px 0' }} dangerouslySetInnerHTML={{ __html: this.state.overview.replace(/\n/g, '</br>') }} />
                <Title level={4}>书评 · · · · · ·</Title>
                <AddBookComment bookId={this.state.id} bookUrl={this.state.url} />
              </Col>
              <Col xxl={{ span: 4, offset: 0 }} xl={{ span: 7, offset: 0 }} md={{ span: 7, offset: 0 }} xs={{ span: 22, offset: 1 }} style={{ paddingLeft: '15px' }}>
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
