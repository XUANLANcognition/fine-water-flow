import React, { Component } from 'react'
import { Layout, Row, Col, Descriptions, PageHeader, Typography } from 'antd'
import axios from 'axios'

import './BookDetailPage.css'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import AddComment from '../AddComment'
import Advertisement from '../Advertisement'

const { Title } = Typography
const { Paragraph } = Typography

class BookDetailPage extends Component {
    state = {
      title: '',
      author: '',
      publisher: '',
      isbn: '',
      pages: '',
      cover: ''
    }

    componentDidMount = async (v) => {
      await this.getData()
    }

    getData = async (v) => {
      try {
        const response = await axios.get(
          'https://finewf.club:8080/api/books/' + this.props.match.params.id + '?format=json'
        )
        this.data = response.data.results
        this.setState(function (state) {
          return {
            title: response.data.title,
            author: response.data.author,
            publisher: response.data.publisher,
            isbn: response.data.isbn,
            pages: response.data.pages,
            cover: response.data.cover
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
                        <Descriptions.Item label='作者'>{this.state.author}</Descriptions.Item>
                        <Descriptions.Item label='出版社'>{this.state.publisher}</Descriptions.Item>
                        <Descriptions.Item label='页数'>{this.state.pages}</Descriptions.Item>
                        <Descriptions.Item label='ISBN'>{this.state.isbn}</Descriptions.Item>
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
                12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。
                成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？
                故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。
                </Paragraph>
                <Title level={3}>书评 · · · · · ·</Title>
                <AddComment />
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
