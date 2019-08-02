import React, { Component } from 'react'
import { Layout, Row, Col, Button, List, Skeleton } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'

import Nav from './Nav'
import Myfooter from './Myfooter'

const count = 8

class Notice extends Component {
  page = 1
  state = {
    data: [],
    cache: [],
    loading: false,
    initLoading: true
  }

  componentDidMount = async (v) => {
    await this.getNoticeData()
    this.setState({ initLoading: false })
  }

  getNoticeData = async (v) => {
    try {
      const response = await axios.get(
        'https://finewf.club:8080/api/notices/?format=json' + '&page=' + this.page + '&page_size=' + count
      )
      this.setState({ data: response.data.results, cache: response.data.results })
    } catch (error) {
      console.log(error)
    }
  }

  onLoadMore = async (v) => {
    await this.setState({
      loading: true,
      cache: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} })))
    })
    try {
      this.page = this.page + 1
      const response = await axios.get(
        'https://finewf.club:8080/api/notices/?format=json' + '&page=' + this.page + '&page_size=' + count
      )
      const temp1 = this.state.data
      if (response.status === 200) {
        const temp = this.state.data.concat(response.data.results)
        this.setState(
          { data: temp, cache: temp, loading: false }
          , () => {
            window.dispatchEvent(new window.Event('resize'))
          })
      } else {
        this.setState({
          cache: temp1
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    const { initLoading, loading, cache, data } = this.state
    const loadMore = !initLoading && !loading ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'
      }}
      >
        {(data.length > 0) && <Button onClick={this.onLoadMore}>加载更多</Button>}
      </div>
    ) : null

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#fff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xxl={{ span: 14, offset: 5 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
              <List
                itemLayout='vertical'
                dataSource={cache}
                loadMore={loadMore}
                loading={initLoading}
                split={false}
                renderItem={item => (
                  <List.Item>
                    <Skeleton title={false} loading={item.loading} active >
                      <div style={{ display: 'flex', flexDirection: 'column', background: '#f7f7f7', boxShadow: '0 1px 3px rgba(26,26,26,.1)', borderRadius: '10px', padding: '20px 20px', fontSize: '16px' }}>
                        <div style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '18px', fontStretch: '100%', paddingBottom: '10px' }}>{item.tab}</div>
                        <div style={{ color: '#646464', fontSize: '15px', paddingBottom: '10px' }}>
                          {item.content}
                        </div>
                        <div>{item.release_date && dayjs(item.release_date).fromNow()}</div>
                      </div>
                    </Skeleton>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default Notice
