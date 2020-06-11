import React, { Component } from "react";
import { Layout, Row, Col, Button, List, Typography, Divider } from "antd";
import axios from "axios";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";

import Nav from "../Nav";
import Myfooter from "../Myfooter";

const init = [..."A23456789", "10", ..."JQK"][Math.floor(Math.random() * 13)];

class PokerPage extends Component {
  state = {
    data: init,
    dire: "left",
    cur_list: [init],
    show: true
  };

  componentDidMount = async (v) => {};

  select = (v) => {
    const temp = [..."A23456789", "10", ..."JQK"][
      Math.floor(Math.random() * 13)
    ];
    const temp_list = this.state.cur_list;
    temp_list.push(temp);
    this.setState({
      data: temp,
      cur_list: temp_list
    });
  };

  clear = (v) => {
    const init = [..."A23456789", "10", ..."JQK"][Math.floor(Math.random() * 13)];
    this.setState({
      data: init,
      cur_list: [init]
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Nav />
        <div
          style={{ flex: "1 0", minHeight: "100vh", backgroundColor: "#fff" }}
        >
          <Row style={{ flex: "1 0", padding: "15px 0" }}>
            <Col
              xxl={{ span: 6, offset: 5 }}
              xl={{ span: 9, offset: 2 }}
              md={{ span: 15, offset: 1 }}
              xs={{ span: 24, offset: 0 }}
              style={{}}
            >
              <List
                size="large"
                style={{marginTop: '36px'}}
                header={
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: "black"
                    }}
                  >
                    播报列表
                  </div>
                }
                bordered
                dataSource={this.state.cur_list}
                renderItem={(item) => (
                  <List.Item style={{ fontSize: "24px", fontWeight: "bolder" }}>
                    {item}
                  </List.Item>
                )}
              />
            </Col>
            <Col
              xxl={{ span: 7, offset: 1 }}
              xl={{ span: 10, offset: 1 }}
              md={{ span: 7, offset: 0 }}
              xs={{ span: 22, offset: 1 }}
              style={{
                paddingLeft: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  fontSize: "180px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  color: "black",
                  width: '320px',
                  minHeight: "460px",
                  alignItems: "center",
                  marginBottom: "24px",
                  boxShadow: "0 5px 30px #777777",
                  marginTop: '36px'
                }}
              >
                <Texty type='scaleBig'>{this.state.show && this.state.data}</Texty>
              </div>
              <Button
                type="primary"
                size="large"
                onClick={this.select}
                loading={this.state.loading}
                style={{ margin: "36px 36px" }}
                block
              >
                抽，抽大个的
              </Button>
              <Button
                type="danger"
                size="large"
                onClick={this.clear}
                loading={this.state.loading}
                style={{ margin: "0 36px" }}
                block
              >
                重新开局
              </Button>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}

export default PokerPage;
