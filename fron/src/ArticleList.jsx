import React, { Component } from 'react'
import { List, Icon, Button, Skeleton, message, Avatar } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

const count = 8

class ArticleList extends Component {
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
          'https://guoliang.online:8080/api/articles/?format=json' + '&page=' + this.state.page + '&page_size=' + count
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
          'https://guoliang.online:8080/api/articles/?format=json' + '&page=' + this.state.page + '&page_size=' + count
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
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null

      return (
        <List
          itemLayout='vertical'
          dataSource={data}
          size='large'
          loadMore={loadMore}
          loading={initLoading}
          renderItem={item => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
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

export default ArticleList
