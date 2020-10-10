import React, { Component } from "react";
import {
  Icon,
  Comment,
  Form,
  Button,
  List,
  Input,
  Modal,
  message,
  Avatar,
} from "antd";
import moment from "moment";
import axios from "axios";
import dayjs from "dayjs";

import AvatarF from "../AvatarF";

const count = 32;

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(item) => (
      <Comment
        author={item.user ? item.user.username : item.username}
        avatar={<AvatarF user={item.user}></AvatarF>}
        content={item.content}
        datetime={item && dayjs(item.pub_date).fromNow()}
      />
    )}
    style={{ padding: "6px 14px" }}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <div style={{ flexGrow: "1", marginRight: "26px" }}>
      <Form.Item>
        <TextArea
          onChange={onChange}
          value={value}
          style={{ height: "69px" }}
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
          style={{ height: "69px", width: "89px" }}
        >
          <div>发表</div>
          <div>评论</div>
        </Button>
      </Form.Item>
    </div>
  </div>
);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_d9hnbhljnr.js",
});

class CommentButton extends Component {
  state = {
    modalVisible: false,
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
    if (this.props.article_id) {
      await this.getCommentData();
      this.setState(function (state) {
        return { initLoading: false };
      });
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.article_id !== this.props.article_id) {
      await this.getCommentData();
      this.setState(function (state) {
        return { initLoading: false };
      });
    }
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

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
    if (this.props.article_id) {
      try {
        const response = await axios.get(
          "https://101.200.52.246:8080/api/comments/?format=json&page=" +
            this.state.page +
            "&page_size=" +
            count +
            "&article=" +
            this.props.article_id
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
          article: this.props.article_url,
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
      <div style={this.props.style}>
        <Modal
          title={"评论区 (" + comments.length + ")"}
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
          width="680px"
          bodyStyle={{ padding: "0" }}
          footer={
            <Comment
              style={{ margin: "-16px -3px -26px -3px" }}
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
          }
        >
          <div style={{ height: "320px", overflowY: "auto" }}>
            {comments.length > 0 && <CommentList comments={comments} />}
          </div>
        </Modal>
        <Button
          type="link"
          onClick={() => this.setModalVisible(true)}
          style={{ color: "#8590a6", fontWeight: "bold" }}
        >
          <IconFont type="icon-pinglun"></IconFont>
          {"评论 " + comments.length}
        </Button>
      </div>
    );
  }
}

export default CommentButton;
