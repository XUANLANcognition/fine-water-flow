import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  List,
  Descriptions,
  BackTop,
  Input,
  Affix,
  Collapse,
  Icon,
  Tag
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

import Nav from "../Nav";
import Myfooter from "../Myfooter";
import Advertisement from "../Advertisement";
import CategoryList from "../CategoryList";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_lapfux51pxk.js"
});

const CheckableTag = Tag.CheckableTag;
const count = 6;
const { Title } = Typography;
const { Search } = Input;
const tip = ["全库", "搜索结果"];
const Panel = Collapse.Panel;
const customPanelStyle = {
  background: "#fff",
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: "hidden"
};

class MoviePage extends Component {
  page = 1;
  state = {
    cache: [],
    selectedTags: [],
    loading: true,
    count: 0,
    tip: tip[0],
    search: "",
    tags: [],
    fliterTag: ""
  };

  componentDidMount = async v => {
    await this.getData();
    this.setState({ loading: false });
  };

  getData = async v => {
    try {
      let url = "";
      if (this.state.fliterTag.length === 0) {
        url =
          "https://101.200.52.246:8080/api/movies/?format=json" +
          "&page=" +
          this.page +
          "&page_size=" +
          count +
          "&search=" +
          this.state.search;
      } else {
        url =
          "https://101.200.52.246:8080/api/movies/?format=json" +
          "&page=" +
          this.page +
          "&page_size=" +
          count +
          "&search=" +
          this.state.search +
          "&tag=" +
          this.state.fliterTag;
      }
      const response = await axios.get(url);
      const temp = [];
      for (let index = 0; index < response.data.count; index++) {
        temp.push({ title: "", cover: "", author: "", id: index });
      }
      this.setState({
        cache: temp
      });
      for (let index = 0; index < response.data.results.length; index++) {
        temp[index] = response.data.results[index];
      }
      this.setState({
        cache: temp,
        count: response.data.count
      });
      if (this.state.selectedTags.length === 0) {
        const responseTag = await axios.get(
          "https://101.200.52.246:8080/api/movieblocks/?format=json"
        );
        this.setState({ tags: responseTag.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleMovie = async page => {
    this.setState({
      loading: true
    });
    try {
      let url = "";
      if (this.state.fliterTag.length === 0) {
        url =
          "https://101.200.52.246:8080/api/movies/?format=json" +
          "&page=" +
          page +
          "&page_size=" +
          count +
          "&search=" +
          this.state.search;
      } else {
        url =
          "https://101.200.52.246:8080/api/movies/?format=json" +
          "&page=" +
          page +
          "&page_size=" +
          count +
          "&search=" +
          this.state.search +
          "&tag=" +
          this.state.fliterTag;
      }
      const response = await axios.get(url);
      let temp = this.state.cache;
      let i = (page - 1) * count;
      for (let index = 0; index < response.data.results.length; index++) {
        temp[i] = response.data.results[index];
        i++;
      }
      this.setState({
        cache: temp,
        loading: false
      });
      console.log(this.state.cache);
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = async (tag, checked) => {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    await this.setState({
      selectedTags: nextSelectedTags,
      loading: true
    });
    const temp = [];
    for (let i of nextSelectedTags) {
      temp.push(i.id);
    }
    const fliterTag = temp.join("&tag=");
    await this.setState({
      fliterTag: fliterTag
    });
    this.getData();
    this.setState({
      loading: false
    });
  };

  search = async value => {
    await this.setState({
      loading: true,
      search: value
    });
    this.getData();
    const temp = tip[1] + "  : { " + value + " }";
    this.setState({
      loading: false,
      tip: temp
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Nav />
        <BackTop />
        <div style={{ flex: "1 0 ", backgroundColor: "#ffffff" }}>
          <Affix offsetTop={this.state.top}>
            <Row
              style={{
                padding: "10px 20px",
                marginBottom: "20px",
                background: "#fff",
                boxShadow: "0px 2px 2px #888888"
              }}
            >
              <Col
                xxl={{ span: 5, offset: 5 }}
                xl={{ span: 6, offset: 2 }}
                md={{ span: 7, offset: 1 }}
                xs={{ span: 22, offset: 1 }}
              >
                <div style={{ display: "flex" }}>
                  <IconFont type="icon-movie" style={{ fontSize: "36px" }} />
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "black",
                      paddingLeft: "15px"
                    }}
                  >
                    FWF 观影
                  </div>
                </div>
              </Col>
              <Col
                xxl={{ span: 8, offset: 1 }}
                xl={{ span: 13, offset: 1 }}
                md={{ span: 13, offset: 1 }}
                xs={{ span: 22, offset: 1 }}
              >
                <Search
                  placeholder="请输入影名含有的关键字"
                  onSearch={value => this.search(value)}
                  enterButton
                />
              </Col>
            </Row>
          </Affix>
          <Row style={{ paddingTop: "0px", paddingBottom: "30px" }}>
            <Col
              xxl={{ span: 10, offset: 5 }}
              xl={{ span: 13, offset: 2 }}
              md={{ span: 14, offset: 1 }}
              xs={{ span: 22, offset: 1 }}
              style={{ paddingTop: "0px", paddingBottom: "30px" }}
            >
              <Title
                level={4}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#096dd9",
                  color: "#ffffff",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  fontSize: "18px"
                }}
              >
                {this.state.tip} ({this.state.count})
              </Title>
              <List
                itemLayout="vertical"
                loading={this.state.loading}
                grid={{
                  gutter: 28,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1
                }}
                pagination={{
                  pageSize: count,
                  total: this.state.count,
                  showQuickJumper: true,
                  onChange: this.handleMovie
                }}
                size="large"
                dataSource={this.state.cache}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <div
                      style={{
                        padding: "20px",
                        background: "#fff",
                        borderRadius: "15px",
                        boxShadow: "0 1px 3px #777777"
                      }}
                    >
                      <Link to={"/movie/" + item.id}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                fontSize: "18px",
                                color: "#3377aa",
                                marginBottom: "15px",
                                fontWeight: "600"
                              }}
                            >
                              {item.title}
                            </div>
                            <Descriptions border column={1}>
                              <Descriptions.Item label="集数">
                                {item.number}
                              </Descriptions.Item>
                              <Descriptions.Item label="单集片长">
                                {item.runtime}
                              </Descriptions.Item>
                              <Descriptions.Item label="制片国家/地区">
                                {item.region}
                              </Descriptions.Item>
                            </Descriptions>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                margin: "10px 0"
                              }}
                            >
                              {item.tag &&
                                item.tag.map(tag => (
                                  <Tag
                                    key={tag.title}
                                    color="#343a40"
                                    style={{ color: "white", margin: "5px" }}
                                  >
                                    {tag.title}
                                  </Tag>
                                ))}
                            </div>
                          </div>
                          <img
                            alt={item.title}
                            src={item.cover}
                            style={{
                              width: "135px",
                              maxHeight: "200px",
                              border: "2px solid #343a40",
                              borderRadius: "8px"
                            }}
                          />
                        </div>
                      </Link>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          paddingTop: "5px"
                        }}
                      >
                        {item.overview && item.overview.slice(0, 96) + "......"}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Col>
            <Col
              xxl={{ span: 4, offset: 0 }}
              xl={{ span: 7, offset: 0 }}
              md={{ span: 7, offset: 1 }}
              xs={{ span: 22, offset: 1 }}
              style={{ paddingLeft: "15px" }}
            >
              <CategoryList />
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
                style={{ paddingTop: "10px" }}
              >
                <Panel
                  header={<Title level={4}>全部标签</Title>}
                  key="1"
                  style={customPanelStyle}
                >
                  <List
                    size="small"
                    dataSource={this.state.tags}
                    renderItem={item => (
                      <List.Item>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                            alignItems: "center"
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: "#ff5c38",
                              borderRadius: "16px 0 16px 16px",
                              padding: "5px 15px",
                              color: "white",
                              margin: "0 24px 0 0"
                            }}
                          >
                            {item.title}
                          </span>
                          {item.tags.map(tag => (
                            <CheckableTag
                              style={{
                                padding: "5px 10px",
                                borderRadius: "20px"
                              }}
                              key={tag}
                              checked={
                                this.state.selectedTags.indexOf(tag) > -1
                              }
                              onChange={checked =>
                                this.handleChange(tag, checked)
                              }
                            >
                              {tag.title}
                            </CheckableTag>
                          ))}
                        </div>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
              <Advertisement />
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}
export default MoviePage;
