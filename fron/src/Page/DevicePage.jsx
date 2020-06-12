import React, { Component } from "react";
import { Layout, Row, Col, List, Icon } from "antd";
import axios from "axios";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import { Link } from "react-router-dom";

import Nav from "../Nav";
import Myfooter from "../Myfooter";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_nvmtyl5b1y.js",
});

class DevicePage extends Component {
  state = {
    total_device: [
      {
        title: "PC",
        icon: "icon-diannao",
        href: '123'
      },
      {
        title: "耳机",
        icon: "icon-diannao",
        href: '123'
      },
      {
        title: "Apple",
        icon: "icon-diannao",
        href: '123'
      },
      {
        title: "Apple",
        icon: "icon-diannao",
        href: '123'
      },
      {
        title: "Apple",
        icon: "icon-diannao",
        href: '123'
      },
      {
        title: "Apple",
        icon: "icon-diannao",
        href: '123'
      },
      {
        title: "Apple",
        icon: "icon-diannao",
        href: '123'
      },
      {
        title: "Apple",
        icon: "icon-diannao",
        href: '123'
      },
    ],
  };

  componentDidMount = async (v) => {

  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Nav />
        <div
          style={{ flex: "1 0", minHeight: "100vh", backgroundColor: "#fff" }}
        >
          <Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <Col
              xxl={{ span: 14, offset: 5 }}
              xl={{ span: 20, offset: 2 }}
              xs={{ span: 22, offset: 1 }}
            >
              <div
                style={{
                  display: "flex",
                  color: "#000",
                  fontWeight: "600",
                  fontSize: "32px",
                  marginBottom: "24px",
                }}
              >
                数码
              </div>
              <div
                style={{
                  display: "flex",
                  fontWeight: "600",
                  fontSize: "22px",
                  marginBottom: "24px",
                }}
              >
                选择适合自己的
              </div>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={this.state.total_device}
                renderItem={(item) => (
                  <List.Item>
                    <Link to={item.href}>
                      <div
                        style={{
                          backgroundColor: "white",
                          borderRadius: "6px",
                          width: "210px",
                          height: "80px",
                          boxShadow: "0 5px 30px #777777",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "black",
                          marginBottom: '36px',
                          fontSize: "18px",
                          fontWeight: "bold"
                        }}
                      >
                        {item.title}
                        <IconFont
                          type={item.icon}
                          style={{ fontSize: "56px", marginLeft: "8px" }}
                        />
                      </div>
                    </Link>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}

export default DevicePage;
