import React, { Component } from 'react'
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd'
import moment from 'moment'
import axios from 'axios'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const TextArea = Input.TextArea

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout='horizontal'
    renderItem={item => (
      <Comment
        author={item.user ? item.user.username : item.username}
        avatar={item.user ? (<Link to={(item.user.id + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + item.user.id}><Avatar shape='square' src={item.user ? item.user.last_name : item.last_name} /></Link>) : (<Link to={(item.id + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + item.id}><Avatar shape='square' src={item.user ? item.last_name : item.last_name} /></Link>)}
        content={item.content}
        datetime={dayjs(item.pub_date).fromNow()}
      />
    )}
  />
)

const Editor = ({
  onChange, onSubmit, submitting, value
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType='submit'
        loading={submitting}
        onClick={onSubmit}
        type='primary'
      >
        评论
      </Button>
    </Form.Item>
  </div>
)

const count = 8

class AddComment extends Component {
    state = {
      comments: [],
      submitting: false,
      value: '',
      cache: [],
      loading: false,
      initLoading: true,
      page: 1,
      username: '',
      avatarUrl: ''
    }

    componentDidMount = async (v) => {
      this.getUserData()
      if (this.props.articleId) {
        await this.getCommentData()
        this.setState(function (state) {
          return { initLoading: false }
        })
      }
    }

    componentDidUpdate = async (prevProps) => {
      if (prevProps.articleId !== this.props.articleId) {
        await this.getCommentData()
        this.setState(function (state) {
          return { initLoading: false }
        })
      }
    }

    getUserData = async (v) => {
      try {
        let config = {
          headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
        }
        const response = await axios.get(
          'https://finewf.club:8080/api/users/' + window.localStorage.getItem('user_id'),
          config
        )
        this.setState(function (state) {
          return { username: response.data.username, avatarUrl: response.data.last_name }
        })
      } catch (error) {
        console.log(error)
      }
    }

    getCommentData = async (v) => {
      if (this.props.articleId) {
        try {
          const response = await axios.get(
            'https://finewf.club:8080/api/comments/?format=json&page=' + this.state.page + '&page_size=' + count + '&article=' + this.props.articleId
          )
          this.comments = response.data.results
          this.setState(function (state) {
            return { comments: response.data.results, cache: response.data.results }
          })
        } catch (error) {
          console.log(error)
        }
      }
    }

    sendComment = async (value) => {
      try {
        let config = {
          headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
        }
        const response = await axios.post(
          'https://finewf.club:8080/api/comments/',
          {
            content: value,
            article: this.props.articleUrl
          },
          config
        )
        if (response.status !== 201) {
          message('error')
        }
      } catch (error) {
        console.log(error)
      }
    }

      handleSubmit = () => {
        if (!this.state.value) {
          return
        }
        this.setState({
          submitting: true
        })
        this.sendComment(this.state.value)
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: '',
            comments: [
              ...this.state.comments,
              {
                username: this.state.username,
                last_name: this.state.avatarUrl,
                content: <p>{this.state.value}</p>,
                pub_date: moment()
              }
            ]
          })
        }, 500)
      }

      handleChange = (e) => {
        this.setState({
          value: e.target.value
        })
      }

      render () {
        const { comments, submitting, value } = this.state
        return (
          <div>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
              avatar={(
                <Avatar
                  shape='square'
                  src={this.state.avatarUrl}
                  alt={this.state.username}
                />
              )}
              content={(
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              )}
            />
          </div>
        )
      }
}

export default AddComment
