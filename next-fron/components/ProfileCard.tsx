import React, { Component } from "react";
import { Button, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { NextRouter, withRouter } from "next/router";

class ProfileCard extends Component<{
  router: NextRouter;
}> {
  state = {
    username: "",
    avatarUrl: "",
    bio: "",
  };

  onClickLogout = () => {
    window.localStorage.clear();
    document.cookie = "token=";
    document.cookie = "userId=";
    document.cookie = "userAvatar=";
    this.props.router.reload();
    message.success("退出登陆");
  };

  getUserProfile = async () => {
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
      window.localStorage.setItem("url", response.data.url);
      this.setState(function (state) {
        return {
          username: response.data.username,
          avatarUrl: response.data.last_name,
          bio: response.data.profile.bio,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    (async (v) => {
      await this.getUserProfile();
    })();
  };

  render() {
    return (
      <div>
        <div style={{ padding: "8px 20px", borderBottom: "1px solid #e1e4e8" }}>
          <div
            style={{ fontSize: "14px", color: "#8590a6", fontWeight: 600 }}
          >
            当前用户 :
          </div>
          <div
            style={{ fontSize: "16px", fontWeight: "bolder", color: "#8590a6" }}
          >
            {this.state.username}
          </div>
        </div>
        <Link href={"/profile/" + window.localStorage.getItem("user_id")}>
          <div
            style={{
              marginTop: "6px",
              backgroundColor: "white",
              padding: "4px 10px 4px 16px",
              display: "flex",
              justifyContent: "center",
              color: "#8590a6",
              fontWeight: 600,
            }}
          >
            我的主页
          </div>
        </Link>
        <Link href={"/notice/" + this.state.username}>
          <div
            style={{
              marginTop: "6px",
              backgroundColor: "white",
              padding: "4px 10px 4px 16px",
              display: "flex",
              justifyContent: "center",
              color: "#8590a6",
              fontWeight: 600,
            }}
          >
            关于
          </div>
        </Link>
        <Button
          type="link"
          onClick={this.onClickLogout}
          block
          style={{ fontWeight: 600, color: "#8590a6" }}
        >
          退出登陆
        </Button>
      </div>
    );
  }
}

export default withRouter(ProfileCard);
