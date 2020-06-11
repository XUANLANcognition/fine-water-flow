import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  Input,
  Slider,
  InputNumber,
  Popover,
  Button,
} from "antd";
import "rc-texty/assets/index.css";
import { SketchPicker } from "react-color";

import Nav from "../Nav";
import Myfooter from "../Myfooter";

var QRCode = require("qrcode.react");

class QRcodePage extends Component {
  state = {
    data: "",
    loading: false,
    size: 256,
    bgColor: "#ffffff",
    fgColor: "#000000",
    value: "https://101.200.52.246:444/",
  };

  componentDidMount = async (v) => {};

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onChangeSize = (e) => {
    this.setState({
      size: e,
    });
  };

  handleChangebg = (color) => {
    this.setState({ bgColor: color.hex });
  };

  handleChangefg = (color) => {
    this.setState({ fgColor: color.hex });
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
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#000",
                  fontWeight: "600",
                  marginBottom: "24px",
                  fontSize: "28px",
                }}
              >
                二维码生成器
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "stretch",
                  margin: "24px 0",
                  width: "640px",
                }}
              >
                <Input
                  size="large"
                  addonBefore="站点地址"
                  placeholder="Basic usage"
                  value={this.state.value}
                  onChange={this.onChange}
                  style={{marginBottom: '24px'}}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "640px",
                    marginBottom: '24px'
                  }}
                >
                  <Slider
                    min={20}
                    max={800}
                    onChange={this.onChangeSize}
                    value={this.state.size}
                    style={{ width: "640px" }}
                  />
                  <InputNumber
                    min={20}
                    max={800}
                    style={{ }}
                    value={this.state.size}
                    onChange={this.onChangeSize}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "640px",
                    marginBottom: '24px'
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    背景色
                  </div>
                  <Popover
                    content={
                      <SketchPicker
                        color={this.state.bgColor}
                        onChangeComplete={this.handleChangebg}
                      />
                    }
                    title="Title"
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "35px",
                        boxShadow: "0 5px 30px #777777",
                        backgroundColor: this.state.bgColor,
                      }}
                    ></div>
                  </Popover>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "640px",
                    marginBottom: '24px'
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    前景色
                  </div>
                  <Popover
                    content={
                      <SketchPicker
                        color={this.state.fgColor}
                        onChangeComplete={this.handleChangefg}
                      />
                    }
                    title="Title"
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "35px",
                        boxShadow: "0 5px 30px #777777",
                        backgroundColor: this.state.fgColor,
                      }}
                    ></div>
                  </Popover>
                </div>
              </div>
              <div style={{ boxShadow: "0 3px 3px #777777" }}>
                <QRCode
                  value={this.state.value}
                  size={this.state.size}
                  bgColor={this.state.bgColor}
                  fgColor={this.state.fgColor}
                  includeMargin={true}
                />
              </div>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}

export default QRcodePage;
