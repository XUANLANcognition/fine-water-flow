import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  Tabs,
  List,
  Menu,
  Icon,
  message,
  Button,
} from "antd";
import axios from "axios";
import "rc-texty/assets/index.css";
import dayjs from "dayjs";

import Nav from "../Nav";
import Myfooter from "../Myfooter";
import AvatarF from "../AvatarF";

class OwnerCollectionPage extends Component {
  state = {
    data: "",
    loading: false,
    articles: [],
    id: "",
    name: "",
    authorId: "",
    views: 0,
    pubDate: "",
    key: "",
    article: "",
  };

  getData = async (v) => {
    try {
      let url =
        "https://101.200.52.246:8080/api/owner_collections/" +
        this.props.match.params.id;
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(url, config);
      this.setState(function (state) {
        return {
          name: response.data.name,
          articles: response.data.article,
          id: response.data.id,
          url: response.data.url,
          loading: false,
          authorId: response.data.user.id,
          pubDate: response.data.pub_date,
          views: response.data.views,
          key:
            response.data.article.length > 0 ? response.data.article[0].id : "",
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  getArticle = async (v) => {
    try {
      let url = "https://101.200.52.246:8080/api/owner_articles/" + v;
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(url, config);
      this.setState({
        article: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async (v) => {
    await this.getData();
    await this.getArticle(this.state.key);
  };

  handleClick = async (value) => {
    this.setState({
      key: value,
    });
    this.getArticle(value);
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
              style={{ marginBottom: "30px" }}
            >
              <div
                style={{ fontSize: "26px", fontWeight: "bold", color: "black" }}
              >
                {this.state.name}
              </div>
            </Col>
            <Col
              xxl={{ span: 3, offset: 5 }}
              xl={{ span: 3, offset: 2 }}
              xs={{ span: 22, offset: 1 }}
            >
              <div>
                {this.state.articles &&
                  this.state.articles.map((item) => (
                    <div
                      onClick={() => this.handleClick(item.id)}
                      className="box"
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: this.state.key == item.id ? "red" : "gray",
                        padding: "18px",
                        background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                        marginBottom: "6px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid gray",
                      }}
                    >
                      <div>{item.title}</div>
                    </div>
                  ))}
              </div>
            </Col>
            <Col
              xxl={{ span: 10, offset: 1 }}
              xl={{ span: 14, offset: 1 }}
              xs={{ span: 22, offset: 1 }}
            >
              <div
                style={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  marginBottom: "26px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {this.state.article && this.state.article.title}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "28px 0",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {"发布于 " + dayjs(this.state.article.pub_date).format('YYYY MM-DD')}
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{fontSize: '16px', marginRight: '8px', fontWeight: 'bold'}}>作者 : </div>
                  <AvatarF user={this.state.article && this.state.article.user}></AvatarF>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.article && this.state.article.content,
                }}
              ></div>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}

export default OwnerCollectionPage;
