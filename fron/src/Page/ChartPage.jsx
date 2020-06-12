import React, { Component } from "react";
import { Layout, Row, Col, Button, Icon } from "antd";
import axios from "axios";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import { Link } from "react-router-dom";

import Nav from "../Nav";
import Myfooter from "../Myfooter";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_nvmtyl5b1y.js",
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
                图表绘
              </div>
              <div
                style={{
                  display: "flex",
                  fontWeight: "600",
                  fontSize: "22px",
                  marginBottom: "24px",
                }}
              >
                更加简洁的绘图模式（开发中...）
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
                    柱形图
                    <IconFont
                      type="icon-fsux_tubiao_zhuzhuangtu1"
                      style={{ fontSize: "56px", marginLeft: "8px" }}
                    />
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
                    折线图
                    <IconFont
                      type="icon-fsux_zhexiantu"
                      style={{ fontSize: "56px", marginLeft: "8px" }}
                    />
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
                  饼图
                  <IconFont
                    type="icon-fsux_tubiao_bingtu1"
                    style={{ fontSize: "56px", marginLeft: "8px" }}
                  />
                </div>
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
                  散点图
                  <IconFont
                    type="icon-fsux_tubiao_sandiantu"
                    style={{ fontSize: "56px", marginLeft: "8px" }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
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
                  矩形树图
                  <IconFont
                    type="icon-fsux_tubiao_juxingshutu"
                    style={{ fontSize: "56px", marginLeft: "8px" }}
                  />
                </div>
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
                  条形图
                  <IconFont
                    type="icon-fsux_tubiao_zhuzhuangtu"
                    style={{ fontSize: "56px", marginLeft: "8px" }}
                  />
                </div>
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
                  气泡图
                  <IconFont
                    type="icon-fsux_tubiao_qipaotu"
                    style={{ fontSize: "56px", marginLeft: "8px" }}
                  />
                </div>
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
                  词云
                  <IconFont
                    type="icon-fsux_tubiao_ciyun"
                    style={{ fontSize: "56px", marginLeft: "8px" }}
                  />
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
