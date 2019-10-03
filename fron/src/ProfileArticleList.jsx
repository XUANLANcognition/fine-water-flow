import React, { Component } from 'react'
import { List, Button, Skeleton, message, Avatar, Modal, Icon, Dropdown, Menu, Tag } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const count = 3
const confirm = Modal.confirm
const briefLength = 100
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1242637_estflglakgj.js'
})

class ProfileArticleList extends Component {
  state = {
    data: [],
    cache: [],
    loading: false,
    initLoading: true,
    page: 1,
    next: '',
    status: 1,
    number: 0
  }

  my (list, key, status) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === key) {
        list[i].status = status
      }
    }
    return list
  }

 onClick = async (key, status, title) => {
   if (status === '2') {
     try {
       let url = 'https://finewf.club:8080/api/owner_articles/' + key
       let config = {
         headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
       }
       await axios.patch(url, { status: '1' }, config)
       const temp = this.state.cache
       this.my(temp, key, '1')
       this.setState({
         cache: temp
       })
       message.success(title + '  已进入草稿箱')
     } catch (error) {
     }
   }
   if (status === '1') {
     try {
       let url = 'https://finewf.club:8080/api/owner_articles/' + key
       let config = {
         headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
       }
       await axios.patch(url, { status: '2' }, config)
       const temp = this.state.cache
       this.my(temp, key, '2')
       this.setState({
         cache: temp
       })
       message.success(title + '  已发布成功')
     } catch (error) {
     }
   }
 }

  componentDidMount = async (v) => {
    await this.getArticleData()
    this.setState(function (state) {
      return { initLoading: false }
    })
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

  getArticleData = async (v) => {
    try {
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      const response = await axios.get(
        'https://finewf.club:8080/api/owner_articles/?format=json' + '&page=' + this.state.page + '&page_size=' + count,
        config
      )
      this.setState(function (state) {
        return { data: response.data.results, cache: response.data.results, next: response.data.next, number: response.data.count }
      })
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
      this.state.page = this.state.page + 1
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      const response = await axios.get(
        'https://finewf.club:8080/api/owner_articles/?format=json' + '&page=' + this.state.page + '&page_size=' + count,
        config
      )
      this.setState({
        next: response.data.next
      })
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

  deleteArticle = async (v) => {
    try {
      confirm({
        title: '删除!',
        content: '你确认要删除这篇文章吗？',
        onOk: async () => {
          let config = {
            headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
          }
          const response = await axios.delete(
            'https://finewf.club:8080/api/owner_articles/' + v,
            config
          )
          if (response.status === 204) {
            message.success('删除成功.')
            this.setState(function (state) {
              return { cache: state.cache.filter(article => article.id !== v) }
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
    const { initLoading, loading, cache, next } = this.state
    const loadMore = !initLoading && (!loading && next) ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'
      }}
      >
        {(this.state.cache.length > 0) && <Button onClick={this.onLoadMore}>加载更多</Button>}
      </div>
    ) : null

    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start', marginBottom: '10px' }}>
          <div style={{ marginRight: '20px', fontWeight: 'bold' }}>
            <Tag color='#108ee9'>文章总数</Tag>{this.state.number}
          </div>
        </div>
        <List
          itemLayout='vertical'
          dataSource={cache}
          size='small'
          loadMore={loadMore}
          loading={initLoading}
          style={{ paddingBottom: '20px' }}
          renderItem={item => (
            <List.Item actions={[
              <Link to={'/revise_article/' + item.id}>
                <Button style={{ color: '#76839b', backgroundColor: 'transparent', display: 'inline-block', fontSize: '14px', fontWeight: '500' }} type='link'> <IconFont type='icon-edit' style={{ paddingLeft: '5px', color: '#76839b' }} /> 修改 </Button>
              </Link>,
              <Button style={{ color: '#76839b', backgroundColor: 'transparent', display: 'inline-block', fontSize: '14px', fontWeight: '500' }} type='link' onClick={() => this.deleteArticle(item.id)}><IconFont type='icon-delete-fill' style={{ paddingLeft: '5px', color: '#76839b' }} /> 删除 </Button>,
              <Dropdown
                overlay={
                  <Menu onClick={this.onClick.bind(this, item.id, item.status, item.title)}>
                    <Menu.Item key='1' disabled={item.status === '2'} style={{ fontWeight: '600', display: 'flex', justifyContent: 'center' }}>
                      {'发布'}
                    </Menu.Item>
                    <Menu.Item key='2' disabled={item.status === '1'} style={{ fontWeight: '600', display: 'flex', justifyContent: 'center' }}>
                      {'进入草稿'}
                    </Menu.Item>
                  </Menu>
                }
                trigger={['click']}
                placement='bottomCenter'>
                <Button style={{ color: '#76839b', backgroundColor: 'transparent', display: 'inline-block', fontSize: '14px', fontWeight: '500' }} type='link' ><IconFont type={item.status === '2' ? 'icon-fabu1' : 'icon-caogao'} style={{ paddingLeft: '5px', color: '#76839b' }} /> {item.status === '2' ? '已发布' : '草稿箱'} </Button>
              </Dropdown>
            ]}>
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
                <Link to={'/owner_article/' + item.id}>
                  <h3 style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '18px', fontStretch: '100%' }}>{item.title}</h3>
                  <div style={{ color: '#646464', fontSize: '15px' }}>
                    {this.extractBrief(item.content)}
                  </div>
                </Link>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default ProfileArticleList
