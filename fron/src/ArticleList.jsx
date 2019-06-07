import React, { Component } from 'react'
import { List, Button, Skeleton, Avatar } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const count = 8

class ArticleList extends Component {
    page = 1
    state = {
      data: [],
      cache: [],
      loading: false,
      initLoading: true
    }

    componentDidMount = async (v) => {
      await this.getArticleData()
      this.setState({ initLoading: false })
    }

    getArticleData = async (v) => {
      try {
        const response = await axios.get(
          'https://finewf.club:8080/api/articles/?format=json' + '&page=' + this.page + '&page_size=' + count
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
          'https://finewf.club:8080/api/articles/?format=json' + '&page=' + this.page + '&page_size=' + count
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
        <List
          itemLayout='vertical'
          dataSource={cache}
          loadMore={loadMore}
          loading={initLoading}
          renderItem={item => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={<Link to={((item.user && item.user.id) + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + (item.user && item.user.id)}>{item.user && item.user.username}</Link>}
                  avatar={<Link to={((item.user && item.user.id) + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + (item.user && item.user.id)}><Avatar icon='user' src={item.user && item.user.last_name} /></Link>}
                  description={dayjs(item.pub_date).fromNow()}
                />
                <Link to={'/article/' + item.id}>
                  <h3>{item.title}</h3>
                </Link>
              </Skeleton>
            </List.Item>
          )}
        />
      )
    }
}

export default ArticleList
