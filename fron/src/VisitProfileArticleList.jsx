import React, { Component } from 'react'
import { List, Button, Skeleton, message, Avatar, Icon } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const count = 3
const briefLength = 100
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_tb2emfivmbd.js'
})

class ProfileArticleList extends Component {
  state = {
    data: [],
    cache: [],
    loading: false,
    initLoading: true,
    page: 1
  }

  extractText = HTMLString => {
    var span = document.createElement('span')
    span.innerHTML = HTMLString
    return span.textContent || span.innerText
  }

  extractBrief = HTMLString => {
    const text = this.extractText(HTMLString)
    if (text.length > briefLength) {
      return text.slice(0, briefLength) + '……'
    }
    return text
  }

  componentDidMount = async (v) => {
    await this.getArticleData()
    this.setState(function (state) {
      return { initLoading: false }
    })
  }

  getArticleData = async (v) => {
    try {
      const response = await axios.get(
        'https://101.200.52.246:8080/api/articles/?format=json' + '&page=' + this.state.page + '&page_size=' + count + '&user=' + this.props.visitUserId
      )
      this.data = response.data.results
      this.setState(function (state) {
        return { data: response.data.results, cache: response.data.results }
      })
    } catch (error) {
      console.log(error)
    }
  }

  onLoadMore = async (v) => {
    this.setState(function (state) {
      return {
        loading: true,
        data: this.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} })))
      }
    })
    try {
      this.state.page = this.state.page + 1
      const response = await axios.get(
        'https://101.200.52.246:8080/api/articles/?format=json' + '&page=' + this.state.page + '&page_size=' + count + '&user=' + this.props.visitUserId
      )
      if (response.status !== 404) {
        const cache = this.state.cache.concat(response.data.results)
        this.setState(function (state) {
          return { cache: cache, data: cache, loading: false }
        }, () => {
          window.dispatchEvent(new window.Event('resize'))
        })
      } else {
        message.error('No more article ^-^')
      }
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    const { initLoading, loading, data } = this.state
    const loadMore = !initLoading && !loading ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'
      }}
      >
        {(this.state.data.length > 0) && <Button onClick={this.onLoadMore}>加载更多</Button>}
      </div>
    ) : null

    return (
      <List
        itemLayout='vertical'
        dataSource={data}
        size='small'
        loadMore={loadMore}
        loading={initLoading}
        style={{ paddingBottom: '20px' }}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={
                  <Link to={((item.user && item.user.id) + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + (item.user && item.user.id)}>
                    <div>
                      {item.user && item.user.username}
                      {(item.user && item.user.profile.media_editor_auth) === '审核通过' ? <IconFont type='icon-renzhenghuizhang' style={{ paddingLeft: '10px' }} /> : null}
                    </div>
                  </Link>
                }
                avatar={<Link to={((item.user && item.user.id) + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + (item.user && item.user.id)}><Avatar shape='square' icon='user' src={item.user && item.user.last_name} /></Link>}
                description={item.pub_date && dayjs(item.pub_date).fromNow()}
              />
              <Link to={'/article/' + item.id}>
                <h3 style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '18px', fontStretch: '100%' }}>{item.title}</h3>
                <div style={{ color: '#646464', fontSize: '15px' }}>
                  {this.extractBrief(item.content)}
                </div>
              </Link>
            </Skeleton>
          </List.Item>
        )}
      />
    )
  }
}

export default ProfileArticleList
