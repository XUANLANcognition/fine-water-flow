import React, { Component } from "react";
import { List, Button, Skeleton, Avatar, Icon, Input } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import AvatarF from "./AvatarF";

const count = 6;
const briefLength = 100;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_vfurgm6ec3b.js"
});
const { Search } = Input;

class ArticleList extends Component {
  state = {
    data: [],
    cache: [],
    loading: false,
    initLoading: true,
    page: 1,
    next: ""
  };

  componentDidMount = async v => {
    await this.getArticleData();
    this.setState({ initLoading: false });
  };

  extractText = HTMLString => {
    var span = document.createElement("span");
    span.innerHTML = HTMLString;
    return span.textContent || span.innerText;
  };

  extractBrief = HTMLString => {
    const text = this.extractText(HTMLString);
    if (text.length > briefLength) {
      return text.slice(0, briefLength) + "……";
    }
    return text;
  };

  getArticleData = async v => {
    try {
      const response = await axios.get(
        "https://101.200.52.246:8080/api/articles/?format=json" +
          "&page=" +
          this.state.page +
          "&page_size=" +
          count
      );
      this.setState({
        data: response.data.results,
        cache: response.data.results,
        next: response.data.next
      });
    } catch (error) {
      console.log(error);
    }
  };

  onLoadMore = async v => {
    this.setState({
      loading: true,
      cache: this.state.data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {} }))
      )
    });
    try {
      this.setState({
        page: this.state.page + 1
      });
      const response = await axios.get(
        "https://101.200.52.246:8080/api/articles/?format=json" +
          "&page=" +
          this.state.page +
          "&page_size=" +
          count
      );
      this.setState({
        next: response.data.next
      });
      const temp1 = this.state.data;
      if (response.status === 200) {
        const temp = this.state.data.concat(response.data.results);
        this.setState({ data: temp, cache: temp, loading: false }, () => {
          window.dispatchEvent(new window.Event("resize"));
        });
      } else {
        this.setState({
          cache: temp1
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  search = async value => {
    this.setState({
      initLoading: true
    });
    try {
      const response = await axios.get(
        "https://101.200.52.246:8080/api/articles/?format=json" +
          "&page=" +
          this.page +
          "&page_size=" +
          count +
          "&search=" +
          value
      );
      this.setState({
        data: response.data.results,
        cache: response.data.results,
        initLoading: false,
        next: response.data.next
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { initLoading, loading, cache, data, next } = this.state;
    const loadMore =
      !initLoading && !loading && next ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px"
          }}
        >
          {data.length > 0 && (
            <Button onClick={this.onLoadMore}>
              <IconFont type="icon-more1-copy-copy" />
              加载更多
            </Button>
          )}
        </div>
      ) : null;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 1px 3px rgba(26,26,26,.1)",
          borderRadius: "1px"
        }}
      >
        <Search
          placeholder="请输入文章标题或内容含有的关键字"
          onSearch={value => this.search(value)}
          enterButton
        />
        <List
          itemLayout="vertical"
          dataSource={cache}
          loadMore={loadMore}
          loading={initLoading}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  style={{
                    color: "#76839b",
                    backgroundColor: "transparent",
                    display: "inline-block",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                  type="link"
                >
                  {" "}
                  <IconFont
                    type="icon-eye-fill"
                    style={{ paddingLeft: "5px", color: "#76839b" }}
                  />{" "}
                  浏览 {item.views} 次
                </Button>
              ]}
            >
              <div
                style={
                  item.originality === "Y"
                    ? {
                        borderLeft: "8px solid",
                        borderColor: "#269f42",
                        paddingLeft: "15px"
                      }
                    : {}
                }
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={
                      <Link
                        to={
                          ((item.user && item.user.id) + "" ===
                          window.localStorage.getItem("user_id")
                            ? "/profile/"
                            : "/visit/") + (item.user && item.user.id)
                        }
                      >
                        <div>
                          {item.user && item.user.username}
                          {(item.user &&
                            item.user.profile.media_editor_auth) ===
                          "审核通过" ? (
                            <IconFont
                              type="icon-renzhenghuizhang"
                              style={{ paddingLeft: "10px" }}
                            />
                          ) : null}
                        </div>
                      </Link>
                    }
                    avatar={<AvatarF user={item.user}></AvatarF>}
                    description={
                      item.pub_date && dayjs(item.pub_date).fromNow()
                    }
                  />
                  <Link to={"/article/" + item.id}>
                    <h3
                      style={{
                        color: "#1a1a1a",
                        fontWeight: "600",
                        fontSize: "18px",
                        fontStretch: "100%"
                      }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ color: "#646464", fontSize: "15px" }}>
                      {this.extractBrief(item.content)}
                    </div>
                  </Link>
                </Skeleton>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ArticleList;
