import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input, message } from "antd";
import moment from "moment";
import axios from "axios";
import dayjs from "dayjs";

import AvatarF from "./AvatarF";

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={
      <div style={{ fontWeight: "bold", color: "#000" }}>
        {comments.length} 条回复
      </div>
    }
    itemLayout="horizontal"
    renderItem={(item) => (
      <Comment
        author={item.user ? item.user.username : item.username}
        avatar={<AvatarF user={item.user}></AvatarF>}
        content={item.content}
        datetime={item && dayjs(item.pub_date).fromNow()}
      />
    )}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <div style={{ flexGrow: "1", marginRight: "26px" }}>
      <Form.Item>
        <TextArea
          onChange={onChange}
          value={value}
          style={{ height: "99px" }}
          placeholder="发条友善的评论"
        />
      </Form.Item>
    </div>
    <div>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
          block
          style={{ height: "99px", width: "89px" }}
        >
          <div>发表</div>
          <div>评论</div>
        </Button>
      </Form.Item>
    </div>
  </div>
);

const count = 32;

class AddComment extends Component {
  state = {
    comments: [],
    submitting: false,
    value: "",
    cache: [],
    loading: false,
    initLoading: true,
    page: 1,
    user: null,
  };

  componentDidMount = async (v) => {
    this.getUserData();
    if (this.props.articleId) {
      await this.getCommentData();
      this.setState(function (state) {
        return { initLoading: false };
      });
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.articleId !== this.props.articleId) {
      await this.getCommentData();
      this.setState(function (state) {
        return { initLoading: false };
      });
    }
  };

  getUserData = async (v) => {
    try {
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        "https://101.200.52.246:8080/api/users/" +
          window.localStorage.getItem("user_id"),
        config
      );
      this.setState(function (state) {
        return { user: response.data };
      });
    } catch (error) {
      console.log(error);
    }
  };

  getCommentData = async (v) => {
    if (this.props.articleId) {
      try {
        const response = await axios.get(
          "https://101.200.52.246:8080/api/comments/?format=json&page=" +
            this.state.page +
            "&page_size=" +
            count +
            "&article=" +
            this.props.articleId
        );
        this.comments = response.data.results;
        this.setState(function (state) {
          return {
            comments: response.data.results,
            cache: response.data.results,
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  sendComment = async (value) => {
    try {
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.post(
        "https://101.200.52.246:8080/api/comments/",
        {
          content: value,
          article: this.props.articleUrl,
        },
        config
      );
      if (response.status !== 201) {
        message("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = async () => {
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true,
    });
    await this.sendComment(this.state.value);
    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          ...this.state.comments,
          {
            content: <p>{this.state.value}</p>,
            pub_date: moment(),
            user: this.state.user,
          },
        ],
      });
    }, 500);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              shape="circle"
              src={window.localStorage.getItem("user_avatar")}
              alt={window.localStorage.getItem("user_name")}
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}

export default AddComment;
