import React, { Component } from "react";
import { Layout, Row, Col, Icon } from "antd";
import axios from "axios";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import dayjs from "dayjs";

import Nav from "../Nav";
import Myfooter from "../Myfooter";
import { Link } from "react-router-dom";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_sziim5mcnop.js",
});

class Computer extends Component {
  state = {
    data: "",
    loading: false,
  };

  getData = async (v) => {
    let url =
      "https://101.200.52.246:8080/api/computers/" + this.props.match.params.id;
    const response = await axios.get(url);
    this.setState({
      data: response.data,
    });
  };

  componentDidMount = async (v) => {
    await this.getData();
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
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 1px 5px #777777",
                  borderRadius: "8px",
                  paddingTop: "28px",
                  paddingBottom: "56px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "66%",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {this.state.data.name}
                  </div>
                  <IconFont type="icon-bijiben" style={{ fontSize: "216px" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "66%",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "black",
                      marginRight: "36px",
                    }}
                  >
                    品牌 :{" "}
                  </div>
                  <IconFont
                    type={this.state.data && this.state.data.brand.icon}
                    style={{ fontSize: "32px", marginRight: "12px" }}
                  />
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {this.state.data && this.state.data.brand.name}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "66%",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "black",
                      marginRight: "36px",
                    }}
                  >
                    上市日期 :{" "}
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {dayjs(this.state.data.ttm).format("YYYY MM-DD")}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "66%",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "black",
                      marginRight: "36px",
                    }}
                  >
                    价格 :{" "}
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {this.state.data.price}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "66%",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "black",
                      marginRight: "36px",
                    }}
                  >
                    中央处理器 :{" "}
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "start",
                    }}
                  >
                    {this.state.data &&
                      this.state.data.cpu.map((c) => (
                        <Link to={"/cpu/" + c.id}>
                          <div
                            style={{
                              padding: "5px 10px",
                              borderRadius: "20px",
                            }}
                          >
                            {c.name} /
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "66%",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "black",
                      marginRight: "36px",
                    }}
                  >
                    图像处理器 :{" "}
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "start",
                    }}
                  >
                    {this.state.data &&
                      this.state.data.gpu.map((c) => (
                        <Link to={"/gpu/" + c.id}>
                          <div
                            style={{
                              padding: "5px 10px",
                              borderRadius: "20px",
                            }}
                          >
                            {c.name} /
                          </div>
                        </Link>
                      ))}
                  </div>
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

export default Computer;
