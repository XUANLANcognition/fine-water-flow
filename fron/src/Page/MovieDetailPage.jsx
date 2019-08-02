import React, { Component } from 'react'
import { Layout, Row, Col, Descriptions, Tag, Typography, List, BackTop, Avatar } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './BookDetailPage.css'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import AddMovieComment from '../AddMovieComment'
import Advertisement from '../Advertisement'
import RowList from '../RowList'
import StillList from '../StillList'
import SourceList from '../SourceList'

const { Title } = Typography

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
      writer: [''],
      still: [''],
      loading: true,
      tags: [],
      prelock: false,
      source: ['']
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
            actor: response.data.actor,
            loading: false,
            tags: response.data.tag,
            still: response.data.still,
            source: response.data.play_source,
            prelock: true
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    render () {
      const { prelock } = this.state
      return (
        <Layout style={{ minHeight: '100vh', background: 'unset' }}>
          <Nav />
          <BackTop />
          <div style={{ flex: '1 0 ' }}>
            <Row style={{ boxShadow: '0px 0px 5px #888888' }}>
              <div className='MovieHeader'
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'hsla(0, 10%, 60%, 0.5)'
                }}>
                <div style={{
                  background: `url(${this.state.cover})`,
                  position: 'absolute',
                  filter: 'blur(20px)',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: -1,
                  overflow: 'hidden'
                }} />
                <Col xxl={{ span: 14, offset: 5 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
                  <div className='wrap' style={{ background: 'rgba(0,30%,100%,90%)', display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
                    <div className='MovieCover'>
                      <img
                        src={this.state.cover}
                        alt={this.state.title}
                        style={{ width: '225px', maxHeight: '300px', border: '4px solid white', borderRadius: '8px' }}
                      />
                    </div>
                    <div className='content' style={{ marginLeft: '20px' }}>
                      <Title level={3} style={{ color: 'white' }}>{this.state.title}</Title>
                      <Descriptions
                        border
                        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                      >
                        <Descriptions.Item label='集数'>{this.state.number}</Descriptions.Item>
                        <Descriptions.Item label='单集片长'>{this.state.runtime}</Descriptions.Item>
                        <Descriptions.Item label='制片国家/地区'>{this.state.region}</Descriptions.Item>
                      </Descriptions>
                      {this.state.tags.map(tag => (
                        <Tag key={tag.title} color='#fff' style={{ margin: '5px' }}>
                          <div style={{ color: '#000' }}>
                            {tag.title}
                          </div>

                        </Tag>
                      ))}
                    </div>
                  </div>
                </Col>
              </div>
            </Row>
            <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <Col xxl={{ span: 10, offset: 5 }} xl={{ span: 13, offset: 2 }} md={{ span: 15, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                <Title level={4}>内容简介 · · · · · ·</Title>
                <div style={{ padding: '24px 0' }} dangerouslySetInnerHTML={{ __html: this.state.overview.replace(/\n/g, '</br>') }} />
                {prelock && (this.state.still.length !== 0) && (
                  <StillList data={this.state.still} title='剧照' />
                )}
                {prelock && (this.state.director.length !== 0) && (
                  <RowList data={this.state.director} title='导演' />
                )}
                {prelock && (this.state.writer.length !== 0) && (
                  <RowList data={this.state.writer} title='编剧' />
                )}
                {prelock && (this.state.actor.length !== 0) && (
                  <RowList data={this.state.actor} title='演员' />
                )}
                <Title level={4}>影评 · · · · · ·</Title>
                <AddMovieComment movieId={this.state.id} movieUrl={this.state.url} />
              </Col>
              <Col xxl={{ span: 4, offset: 0 }} xl={{ span: 7, offset: 0 }} md={{ span: 7, offset: 0 }} xs={{ span: 22, offset: 1 }} style={{ paddingLeft: '15px' }}>
                {prelock && (this.state.source.length !== 0) && (
                  <SourceList data={this.state.source} title='播放源' />
                )}
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
