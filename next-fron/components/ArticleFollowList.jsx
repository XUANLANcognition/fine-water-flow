import React, { Component } from "react";
import { createFromIconfontCN, UserOutlined } from '@ant-design/icons';
import { List, Button, Skeleton, Avatar, Input } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";

const count = 8;
const briefLength = 100;
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_tb2emfivmbd.js",
});
const { Search } = Input;

class ArticleFollowList extends Component {
  page = 1;
  state = {
    data: [],
    cache: [],
    loading: false,
    initLoading: true,
  };

  componentDidMount = async (v) => {
    await this.getArticleData();
    this.setState({ initLoading: false });
  };

  extractText = (HTMLString) => {
    var span = document.createElement("span");
    span.innerHTML = HTMLString;
    return span.textContent || span.innerText;
  };

  extractBrief = (HTMLString) => {
    const text = this.extractText(HTMLString);
    if (text.length > briefLength) {
      return text.slice(0, briefLength) + "……";
    }
    return text;
  };

  getArticleData = async (v) => {
    try {
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        "https://101.200.52.246:8080/api/articles/follow/?format=json" +
          "&page=" +
          this.page +
          "&page_size=" +
          count,
        config
      );
      this.data = response.data.results;
      this.setState(function (state) {
        return { data: response.data.results, cache: response.data.results };
      });
    } catch (error) {
      console.log(error);
    }
  };

  onLoadMore = async (v) => {
    this.setState(function (state) {
      return {
        loading: true,
        data: this.data.concat(
          [...new Array(count)].map(() => ({ loading: true, name: {} }))
        ),
      };
    });
    try {
      this.state.page = this.state.page + 1;
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        "https://101.200.52.246:8080/api/articles/follow/?format=json" +
          "&page=" +
          this.page +
          "&page_size=" +
          count,
        config
      );
      if (response.status !== 404) {
        const cache = this.state.cache.concat(response.data.results);
        this.setState(
          function (state) {
            return { cache: cache, data: cache, loading: false };
          },
          () => {
            window.dispatchEvent(new window.Event("resize"));
          }
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { initLoading, loading, cache, data } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px",
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
          borderRadius: "1px",
        }}
      >
        <Search
          placeholder="请输入文章标题或内容含有的关键字"
          onSearch={(value) => this.search(value)}
          enterButton
        />
        <List
          itemLayout="vertical"
          dataSource={cache}
          loadMore={loadMore}
          loading={initLoading}
          renderItem={(item) => (
            <List.Item>
              <div
                style={
                  item.originality === "Y"
                    ? {
                        borderLeft: "8px solid",
                        borderColor: "#269f42",
                        paddingLeft: "15px",
                      }
                    : {}
                }
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={
                      <Link
                        href={
                          ((item.user && item.user.id) + "" ===
                          this.props.userId
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
                    avatar={
                      <Link
                        href={
                          ((item.user && item.user.id) + "" ===
                          this.props.userId
                            ? "/profile/"
                            : "/visit/") + (item.user && item.user.id)
                        }
                      >
                        <Avatar
                          shape="square"
                          icon={<UserOutlined />}
                          src={item.user && item.user.last_name}
                        />
                      </Link>
                    }
                    description={
                      item.pub_date && dayjs(item.pub_date).fromNow()
                    }
                  />
                  <Link target="_blank" href={"/article/" + item.id}>
                    <div>
                      <h3
                        style={{
                          color: "#1a1a1a",
                          fontWeight: 600,
                          fontSize: "18px",
                          fontStretch: "100%",
                        }}
                      >
                        {item.title}
                      </h3>
                      <div style={{ color: "#646464", fontSize: "15px" }}>
                        {this.extractBrief(item.content)}
                      </div>
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

export default ArticleFollowList;
