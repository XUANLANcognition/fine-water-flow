import { Form } from '@ant-design/compatible';
import { BackTop, Button, Col, Layout, Row, Tabs, Typography } from "antd";
import cookie from "cookie";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { Component, FC } from "react";
import Advertisement from "../components/Advertisement.jsx"
import ArticleFollowList from "../components/ArticleFollowList";
import ArticleList from "../components/ArticleList";
import CategoryList from "../components/CategoryList";
import PubCollectionList from "../components/PubCollectionList";
import Login from "../components/Login";
import MicroList from "../components/MicroList";
import Myfooter from "../components/Myfooter";
import Nav from "../components/Nav";
import PropertyRank from "../components/PropertyRank";

const { Title } = Typography;

class Home extends Component<IndexProps> {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
        <div style={{ height: "100vh", background: "#55b9f3" }}>
          <Nav userId={this.props.userId} />
          <div>
            <Row
              align="middle"
              style={{ flex: "1 0", height: "80vh" }}
            >
              <Col
                xxl={{ span: 11, offset: 4 }}
                xl={{ span: 13, offset: 2 }}
                xs={{ span: 22, offset: 1 }}
              >
                <Title
                  style={{
                    color: "#f5f5f5",
                    fontSize: "52px",
                    fontWeight: "bold",
                  }}
                >
                  Fine Water Flow
                </Title>
                <Title
                  style={{ color: "#f5f5f5", fontWeight: "bold" }}
                  level={3}
                >
                  细水长流
                </Title>
              </Col>
              <Col
                xxl={{ span: 5, offset: 1 }}
                xl={{ span: 6, offset: 1 }}
                xs={{ span: 22, offset: 1 }}
              >
                <div
                  style={{
                    padding: "86px 20px",
                    backgroundColor: "#55b9f3",
                    borderRadius: "22px",
                    boxShadow:
                      "41px 41px 82px #479bcc, -41px -41px 82px #55b9f3",
                  }}
                >
                  <Login />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Row
          justify="center"
          align="middle"
          style={{
            height: "100vh",
            backgroundColor: "#2b3137",
            flexDirection: "column",
          }}
        >
          <Col xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
            <p style={{ fontSize: "45px", color: "#fff" }}>SHARE</p>
            <p style={{ fontSize: "25px", color: "#fff" }}>
              A better way to share together
            </p>
          </Col>
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{ height: "100vh", flexDirection: "column" }}
        >
          <p style={{ fontSize: "45px", color: "black" }}>Join us</p>
          <a href="https://github.com/XUANLANcognition/fine-water-flow">
            <Button size="large" type="primary" ghost>
              Learn about us -&gt;
            </Button>
          </a>
        </Row>
        <Myfooter />
      </Layout>
    );
  }
}

const TabPane = Tabs.TabPane;

class THome extends Component<IndexProps> {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
        <Nav userId={this.props.userId} userAvatar={this.props.userAvatar} />
        <BackTop />
        <Row style={{ flex: "1 0", padding: "15px 0" }}>
          <Col
            xxl={{ span: 10, offset: 5 }}
            xl={{ span: 13, offset: 2 }}
            md={{ span: 15, offset: 1 }}
            xs={{ span: 24, offset: 0 }}
            style={{
              marginBottom: "20px",
              backgroundColor: "#fff",
              padding: "20px 20px",
              boxShadow: "0 1px 3px rgba(26,26,26,.1)",
              borderRadius: "1px",
            }}
          >
            <Tabs defaultActiveKey="1" type="card">
              <TabPane
                tab={
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      padding: "0 12px",
                    }}
                  >
                    全 部
                  </div>
                }
                key="1"
              >
                <ArticleList />
              </TabPane>
              <TabPane
                tab={
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      padding: "0 12px",
                    }}
                  >
                    关 注
                  </div>
                }
                key="2"
              >
                <ArticleFollowList />
              </TabPane>
              <TabPane
                tab={
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      padding: "0 12px",
                    }}
                  >
                    集 合
                  </div>
                }
                key="3"
              >
                <PubCollectionList />
              </TabPane>
            </Tabs>
          </Col>
          <Col
            xxl={{ span: 4, offset: 0 }}
            xl={{ span: 7, offset: 0 }}
            md={{ span: 7, offset: 0 }}
            xs={{ span: 22, offset: 1 }}
            style={{ paddingLeft: "15px" }}
          >
            <CategoryList />
            <MicroList />
            <PropertyRank />
            <Advertisement />
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    );
  }
}

const THomer = Form.create()(THome);

interface IndexProps {
  userId?: string;
  token?: string;
  userAvatar?: string;
}
const Index: FC<IndexProps> = (props) => {
  const { token } = props;
  if (token) {
    return <THomer {...props}></THomer>;
  } else {
    return <Home {...props}></Home>;
  }
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userId = cookie.parse(req.headers.cookie || "")["userId"] || null;
  const token = cookie.parse(req.headers.cookie || "")["token"] || null;
  const userAvatar =
    cookie.parse(req.headers.cookie || "")["userAvatar"] || null;
  return {
    props: { userId, token, userAvatar },
  };
};

export default Index;
