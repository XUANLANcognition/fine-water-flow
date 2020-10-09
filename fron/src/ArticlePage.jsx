import React, { Component } from "react";
import {
  Row,
  Col,
  Layout,
  Form,
  Spin,
  Affix,
  Typography,
  BackTop,
  Statistic,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import "braft-editor/dist/output.css";

import Nav from "./Nav";
import Myfooter from "./Myfooter";
import AuthorShowCard from "./AuthorShowCard";
import Advertisement from "./Advertisement";
import AddComment from "./AddComment";
import AvatarF from "./AvatarF";
import LikeButton from "./components/LikeButton";
import CommentButton from "./components/CommentButton"

const { Paragraph } = Typography;
const { Title } = Typography;

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "loading...",
      content: "",
      id: "",
      url: "",
      translationList: [],
      visible: false,
      modalTitle: "",
      modalContent: "",
      loading: true,
      authorId: "",
      pubDate: "",
      views: 0,
      user: null,
      cover: "",
    };
  }

  componentDidMount = async (v) => {
    await this.getArticle();
  };

  getArticle = async (v) => {
    try {
      const response = await axios.get(
        "https://101.200.52.246:8080/api/articles/" + this.props.match.params.id
      );
      this.setState(function (state) {
        return {
          title: response.data.title,
          content: response.data.content,
          id: response.data.id,
          url: response.data.url,
          loading: false,
          authorId: response.data.user.id,
          pubDate: response.data.pub_date,
          views: response.data.views,
          user: response.data.user,
          cover: response.data.cover,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
        <Nav />
        <BackTop />
        <Row style={{ flex: "1 0", marginTop: "26px" }}>
          <Col
            xxl={{ span: 10, offset: 5 }}
            xl={{ span: 14, offset: 2 }}
            md={{ span: 15, offset: 1 }}
            xs={{ span: 22, offset: 1 }}
          >
            <div
              type="flex"
              style={{
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: "18px",
                  borderRadius: "10px",
                  backgroundColor:
                    this.state.cover === "" ? "#fff" : "hsla(2, 0%, 20%, 0.6)",
                }}
              >
                <div
                  style={{
                    backgroundColor:
                    this.state.cover === "" ? "#fff" : "hsla(2, 0%, 20%, 0.6)",
                    backgroundImage:
                      this.state.cover === ""
                        ? "#fff"
                        : `url(${this.state.cover})`,
                    position: "absolute",
                    filter: "blur(26px)",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 0,
                    backgroundSize: "100% 100%",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    borderRadius: "6px",
                    padding: this.state.cover === "" ? "6px 18px" : "36px 18px",
                    marginBottom: this.state.cover === "" ? "6px" : "28px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: "#000",
                      marginBottom: "8px",
                    }}
                  >
                    {this.state.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "18px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "16px",
                            marginRight: "8px",
                            fontWeight: "bold",
                          }}
                        >
                          作者 :{" "}
                        </div>
                        <AvatarF user={this.state.user}></AvatarF>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                        {"被浏览 " + this.state.views + " 次"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: "16px",
                  border: "1px solid #8c8c8c",
                  borderRadius: "8px",
                  padding: "16px 12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="braft-output-content"
                    style={{
                      overflow: "auto",
                    }}
                    dangerouslySetInnerHTML={{ __html: this.state.content }}
                  />
                </div>
                <Affix offsetBottom={0}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      background: "#fff",
                      padding: "16px 8px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      <LikeButton article_id={this.state.id}></LikeButton>
                      <CommentButton article_id={this.state.id} article_url={this.state.url} style={{marginRight: '20px'}}></CommentButton>
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {"发布于 " + dayjs(this.state.pubDate).fromNow()}
                    </div>
                  </div>
                </Affix>
              </div>
              <div style={{ textAlign: "center" }}>
                <Spin
                  spinning={this.state.loading}
                  size="large"
                  tip="loading..."
                />
              </div>
              <Title level={4} style={{ paddingTop: "20px" }}>
                评论 · · · · · ·
              </Title>
              <AddComment
                articleId={this.state.id}
                articleUrl={this.state.url}
              />
            </div>
          </Col>
          <Col
            xxl={{ span: 4, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            md={{ span: 7, offset: 0 }}
            xs={{ span: 22, offset: 1 }}
            style={{ paddingBottom: "20px", paddingLeft: "15px" }}
          >
            <Affix offsetTop={0}>
              <AuthorShowCard authorId={this.state.authorId} />
            </Affix>
            <Advertisement />
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    );
  }
}

export default Form.create()(ArticlePage);
