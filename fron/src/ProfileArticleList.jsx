import React, { Component } from 'react'
import { List, Button, Skeleton, message, Avatar, Modal } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'

const count = 3
const confirm = Modal.confirm

class ProfileArticleList extends Component {
  state = {
    data: [],
    cache: [],
    loading: false,
    initLoading: true,
    page: 1
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
        'https://guoliang.online:8080/api/articles/?format=json' + '&page=' + this.state.page + '&page_size=' + count + '&user=' + window.localStorage.getItem('user_id')
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
        'https://guoliang.online:8080/api/articles/?format=json' + '&page=' + this.state.page + '&page_size=' + count + '&user=' + window.localStorage.getItem('user_id')
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

  deleteArticle = async (v) => {
    try {
      confirm({
        title: 'Delete!',
        content: '你确认要删除这篇文章吗？',
        onOk: async () => {
          let config = {
            headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
          }
          const response = await axios.delete(
            'https://guoliang.online:8080/api/articles/' + v,
            config
          )
          if (response.status === 204) {
            message.success('删除成功.')
            this.setState(function (state) {
              return { data: state.data.filter(article => article.id !== v) }
            })
          } else {
            message.error('删除失败.')
          }
        }
      })
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
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    ) : null

    return (
      <List
        itemLayout='horizontal'
        dataSource={data}
        size='large'
        loadMore={loadMore}
        loading={initLoading}
        renderItem={item => (
          <List.Item actions={[<a>Modify</a>, <a onClick={() => this.deleteArticle(item.id)} style={{ color: 'red' }}>Delete</a>]}>
            <Skeleton title={false} loading={item.loading} actives>
              <List.Item.Meta
                title={<a href={'/article/' + item.id}>{item.title}</a>}
                avatar={<Avatar icon='user' src={item.user && item.user.last_name} />}
                description={dayjs(item.pub_date).fromNow()}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    )
  }
}

export default ProfileArticleList
