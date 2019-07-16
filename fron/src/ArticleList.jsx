import React, { Component } from 'react'
import { List, Button, Skeleton, Avatar, Icon, Input } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const count = 8
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_tb2emfivmbd.js'
})
const { Search } = Input

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

    search = async (value) => {
      this.setState({
        initLoading: true
      })
      try {
        const response = await axios.get(
          'https://finewf.club:8080/api/articles/?format=json' + '&page=' + this.page + '&page_size=' + count + '&search=' + value
        )
        this.setState({ data: response.data.results, cache: response.data.results, initLoading: false })
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
          {(data.length > 0) && <Button onClick={this.onLoadMore}><IconFont type='icon-more1-copy-copy' />加载更多</Button>}
        </div>
      ) : null

      return (
        <div>
          <Search placeholder='请输入文章标题或内容含有的关键字' onSearch={value => this.search(value)} enterButton />
          <List
            itemLayout='vertical'
            dataSource={cache}
            loadMore={loadMore}
            loading={initLoading}
            renderItem={item => (
              <List.Item>
                <div style={item.originality === 'Y' ? { borderLeft: '8px solid', borderColor: '#269f42', paddingLeft: '15px' } : {}}>
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
                      <h3>{item.title}</h3>
                    </Link>
                  </Skeleton>
                </div>
              </List.Item>
            )}
          />
        </div>
      )
    }
}

export default ArticleList
