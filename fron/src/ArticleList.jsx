import React, { Component } from 'react'
import { List, Icon } from 'antd'
import axios from 'axios'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

class ArticleList extends Component {
  state = {
    data: []
  }
  getArticleList = async (v) => {
    try {
      const response = await axios.get(
        'https://guoliang.online/api//article/?format=json'
      )
      this.data = response.data.results
      this.setState(function (state) {
        return { data: response.data.results }
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount () {
    this.getArticleList()
  }

  render () {
    return (
      <List
        itemLayout='vertical'
        dataSource={this.data}
        size='large'
        renderItem={item => (
          <List.Item
            actions={[<IconText type='star-o' text='156' />, <IconText type='like-o' text='156' />, <IconText type='message' text='2' />]}
          >
            <List.Item.Meta
              title={<a href={'/article/' + item.id}>{item.title}</a>}
            />
            {item.content}
          </List.Item>
        )}
      />
    )
  }
}

export default ArticleList
