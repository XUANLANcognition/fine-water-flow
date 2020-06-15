import React, { Component } from "react";
import { Layout, Row, Col, Button, Icon } from "antd";
import axios from "axios";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import { Link } from "react-router-dom";

import Nav from "../Nav";
import Myfooter from "../Myfooter";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_yq6wiyw7sw.js",
});

class ChartPage extends Component {
  state = {
    loading: false,
  };

  componentDidMount = async (v) => {};

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
                Adobe
              </div>
              <div
                style={{
                  display: "flex",
                  fontWeight: "600",
                  fontSize: "22px",
                  marginBottom: "24px",
                }}
              >
                更加白嫖的模式（开发中...）
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "36px",
                  marginTop: '48px',
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <a href="https://chartcube.alipay.com/make">
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
                    }}
                  >
                    <IconFont
                      type="icon-tubiaozhizuomoban-01"
                      style={{ fontSize: "56px", marginRight: "18px" }}
                    />
                    Ps
                  </div>
                </a>
                <a href="https://chartcube.alipay.com/make">
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
                    }}
                  >
                    <IconFont
                      type="icon-tubiaozhizuomo3-01"
                      style={{ fontSize: "56px", marginRight: "18px" }}
                    />
                    Pr
                  </div>
                </a>
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
                  }}
                >
                  <IconFont
                    type="icon-tubiaozhizuomoban4-01"
                    style={{ fontSize: "56px", marginRight: "18px" }}
                  />
                  Xd
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}

export default ChartPage;
