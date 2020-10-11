import React, { Component } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover, Tag } from "antd";
import Link from "next/link";

const Content = props => (
  <div style={{ display: "flex", flexDirection: "column", width: "360px" }}>
    <div
      style={{
        backgroundImage: `url(${props.user.profile.cover})`,
        backgroundSize: "cover",
        height: "100px"
      }}
    ></div>
    <div style={{ display: "flex" }}>
      <Avatar
        icon={<UserOutlined />}
        shape="square"
        size={72}
        src={props.user.last_name}
        style={{ marginTop: "-24px", marginLeft: "30px", border: '3px solid white' }}
      ></Avatar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "12px",
          marginTop: "2px"
        }}
      >
        <div
          style={{
            fontWeight: "bolder",
            fontSize: "18px"
          }}
        >
          {props.user.username}
        </div>
        <div>
          {props.user.profile.bio &&
            props.user.profile.bio.slice(0, 14) + "..."}
        </div>
      </div>
    </div>
    <div style={{ padding: "20px 30px" }}>
      {props.user.profile.profession && (
        <Tag color="#f50" style={{ height: "26px", fontSize: "16px" }}>
          {props.user.profile.profession}
        </Tag>
      )}
    </div>
  </div>
);

class AvatarF extends Component {
  state = {
    follow: false,
    loading: false
  };

  render() {
    return (
      <Popover
        content={<Content {...this.props}></Content>}
        trigger="hover"
        placement="topLeft"
      >
        <div>
          <Link
            href={
              ((this.props.user && this.props.user.id) + "" ===
              window.localStorage.getItem("user_id")
                ? "/profile/"
                : "/visit/") + (this.props.user && this.props.user.id)
            }
          >
            <Avatar
              shape="square"
              icon={<UserOutlined />}
              src={this.props.user && this.props.user.last_name}
            />
          </Link>
        </div>
      </Popover>
    );
  }
}

export default AvatarF;
