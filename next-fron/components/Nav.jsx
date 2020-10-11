import React from "react";
import { createFromIconfontCN, UserOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Popover, Divider } from "antd";
import Link from "next/link";

import ProfileCard from "./ProfileCard";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_7sypq2as9i4.js",
});

const Card = (
  <div style={{ width: "176px", boxShadow: "0px 2px 5px #888888" }}>
    <ProfileCard />
  </div>
);

const SignInOrOn = (
  <div
    style={{
      display: "flex",
      flexGrow: "1",
      flexDirection: "row-reverse",
      alignItems: "center",
    }}
  >
    <Link href="/sign_in">登陆</Link>
    <Divider type="vertical" />
    <Link href="/join">注册</Link>
  </div>
);

const Nav = (props) => {
  const Signed = (
    <div
      style={{
        display: "flex",
        flexGrow: "1",
        flexDirection: "row-reverse",
        alignItems: "center",
      }}
    >
      <div>
        <Link href="#">
          <Popover content={Card} placement="bottomRight" trigger="click">
            <Avatar
              shape="square"
              size="default"
              icon={<UserOutlined />}
              src={props.userAvatar}
            />
          </Popover>
        </Link>
      </div>
    </div>
  );

  return (
    <Row style={{ backgroundColor: "#fff", boxShadow: "0px 2px 2px #888888" }}>
      <Col
        xxl={{ span: 14, offset: 5 }}
        xl={{ span: 20, offset: 2 }}
        xs={{ span: 22, offset: 1 }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            color: "#fff",
            lineHeight: "56px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              paddingRight: "24px",
              display: "flex",
              alignItems: "center",
              marginLeft: "-10px",
            }}
          >
            <Link href="/">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  src="/icon.png"
                  style={{ width: "60px", height: "60px" }}
                />
                <div style={{ fontWeight: "700", fontSize: "18px" }}>
                  Fine Water Flow
                </div>
              </div>
            </Link>
          </div>

          <Link href="/">
            <div
              style={{
                width: "96px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconFont
                type="icon-yingyongzhongxin"
                style={{ fontSize: "24px" }}
              />
              <div
                style={{
                  color: "#1890ff",
                  paddingLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                主页
              </div>
            </div>
          </Link>

          <Link href="/book">
            <div
              style={{
                width: "96px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconFont type="icon-tushu" style={{ fontSize: "24px" }} />
              <div
                style={{
                  color: "#1890ff",
                  paddingLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                读书
              </div>
            </div>
          </Link>

          <Link href="/movie">
            <div
              style={{
                width: "96px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconFont type="icon-dianyingpiao" style={{ fontSize: "24px" }} />
              <div
                style={{
                  color: "#1890ff",
                  paddingLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                观影
              </div>
            </div>
          </Link>

          <Link href="/notice">
            <div
              style={{
                width: "96px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconFont type="icon-xinxi" style={{ fontSize: "24px" }} />
              <div
                style={{
                  color: "#1890ff",
                  paddingLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                消息
              </div>
            </div>
          </Link>
          {props.userId ? Signed : SignInOrOn}
        </div>
      </Col>
    </Row>
  );
};

export default Nav;
