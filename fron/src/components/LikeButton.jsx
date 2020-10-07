import React, { Component } from "react";
import { Icon, Row, Col, Avatar, Popover, Divider, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_ngmzy6xywk.js",
});

class LikeButton extends Component {
  state = {
    follow: false,
    loading: false,
    initLoading: true,
    number: 0,
    like: false,
    like_id: null,
  };

  componentDidMount = async (v) => {
    if (this.props.article_id) {
      await this.getLike();
      await this.testLike();
      this.setState({
        initLoading: false,
      });
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.article_id !== this.props.article_id) {
      await this.getLike();
      await this.testLike();
      this.setState({
        initLoading: false,
      });
    }
  };

  getLike = async () => {
    try {
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        "https://101.200.52.246:8080/api/likes/?article=" +
          this.props.article_id,
        config
      );
      this.setState({
        number: response.data.count,
      });
    } catch (error) {
      console.log(error);
    }
  };

  testLike = async () => {
    try {
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        "https://101.200.52.246:8080/api/likes/?article=" +
          this.props.article_id +
          "&user=" +
          window.localStorage.getItem("user_id"),
        config
      );
      this.setState({
        like: response.data.count === 1 ? true : false,
        like_id: response.data.count === 1 ? response.data.results[0].id : null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  createLike = async () => {
    this.setState({
      initLoading: true,
    });
    try {
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.post(
        "https://101.200.52.246:8080/api/likes/",
        { article: this.props.article_id + "" },
        config
      );
      this.setState({
        like: true,
        number: this.state.number + 1,
        initLoading: false,
        like_id: response.data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  destoryLike = async () => {
    this.setState({
      initLoading: true,
    });
    try {
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.delete(
        "https://101.200.52.246:8080/api/likes/" + this.state.like_id,
        config
      );
      this.setState({
        like: false,
        number: this.state.number - 1,
        initLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        {this.state.like ? (
          <Button
            type="primary"
            loading={this.state.initLoading}
            onClick={this.destoryLike}
          >
            <IconFont
              type="icon-iconfontzhizuobiaozhun023148"
              style={{ color: "#fff" }}
            />
            {"已赞同  " + this.state.number}
          </Button>
        ) : (
          <Button
            type="primary"
            ghost
            loading={this.state.initLoading}
            onClick={this.createLike}
          >
            <IconFont
              type="icon-iconfontzhizuobiaozhun023148-copy"
              style={{ color: "#fff" }}
            />
            {"点赞  " + this.state.number}
          </Button>
        )}
      </div>
    );
  }
}

export default LikeButton;
