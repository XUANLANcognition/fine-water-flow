import React, { Component } from "react";
import { Layout, Row, Col, Input, Table, Button, Slider, List } from "antd";
import axios from "axios";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import dayjs from "dayjs";

import Nav from "../Nav";
import Myfooter from "../Myfooter";

const { Search } = Input;

const count = 8;

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "发布时间",
    dataIndex: "pub_date",
    key: "pub_date",
    render: text => <div>{dayjs(text).format("YYYY MM-DD")}</div>,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: text => <div>{text == '2' ? '发布' : '草稿'}</div>,
  },
  {
    title: "原创",
    dataIndex: "originality",
    key: "originality",
    render: text => <div>{text == '2' ? '是' : '否'}</div>,
  },
  {
    title: "观看数",
    dataIndex: "views",
    key: "views"
  }
];

class CollectionPage extends Component {
  page = 1;
  state = {
    data: [],
    cache: [],
    loading: false,
    initLoading: true,
    page: 1,
    next: "",
    status: 1,
    number: 0,
    search: "",
    selectedRowKeys: [],
    y: 360
  };

  getData = async (v) => {
    try {
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        "https://101.200.52.246:8080/api/owner_articles/?format=json" +
          "&page=" +
          this.page +
          "&page_size=" +
          count +
          "&search=" +
          this.state.search,
        config
      );
      const temp = [];
      for (let index = 0; index < response.data.count; index++) {
        temp.push({ title: "", cover: "", author: "", id: index });
      }
      this.setState({
        cache: temp,
      });
      for (let index = 0; index < response.data.results.length; index++) {
        temp[index] = response.data.results[index];
      }
      this.setState({
        cache: temp,
        count: response.data.count,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async (v) => {
    await this.getData();
    this.setState(function (state) {
      return { initLoading: false };
    });
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  clearSelection = async () => {
      this.setState({
        selectedRowKeys: []
      })
  }

  handArticle = async (page) => {
    await this.setState({
      loading: true,
    });
    try {
      let config = {
        headers: {
          Authorization: "Token " + window.localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        "https://101.200.52.246:8080/api/owner_articles/?format=json" +
          "&page=" +
          page +
          "&page_size=" +
          count +
          "&search=" +
          this.state.search,
        config
      );
      let temp = this.state.cache;
      let i = (page - 1) * count;
      for (let index = 0; index < response.data.results.length; index++) {
        temp[i] = response.data.results[index];
        i++;
      }
      this.setState({
        cache: temp,
        loading: false,
      });
      console.log(this.state.cache);
    } catch (error) {
      console.log(error);
    }
  };

  search = async (value) => {
    await this.setState({
      loading: true,
      search: value,
    });
    this.getData();
    this.setState({
      loading: false,
    });
  };

  sliderChange = value => {
    if (isNaN(value)) {
      return;
    }
    this.setState({
      y: value,
    });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Nav />
        <div
          style={{ flex: "1 0", minHeight: "100vh", backgroundColor: "#fff" }}
        >
          <Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                marginBottom: "26px",
              }}
            >
              创建你的合集
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "52px",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "26px",
                  marginRight: "18px",
                }}
              >
                合集名称
              </div>
              <Input
                size="large"
                placeholder="请输入合集名称"
                style={{ maxWidth: "620px", marginRight: "18px" }}
              />
              <Button type="primary" size='large'>创建</Button>
            </div>
            <Col
              xxl={{ span: 10, offset: 5 }}
              xl={{ span: 13, offset: 2 }}
              md={{ span: 15, offset: 1 }}
              xs={{ span: 24, offset: 0 }}
              style={{ paddingLeft: "15px" }}
            >
              <Search
                placeholder="请输入搜索关键字"
                onSearch={(value) => this.search(value)}
                style={{ width: 200, marginBottom: "26px" }}
              />
              <Slider min={360} max={648} onChange={this.sliderChange} value={this.state.y}/>
              <Table
                size='large'
                columns={columns}
                rowSelection={rowSelection}
                dataSource={this.state.cache}
                loading={this.state.loading}
                scroll={{ y: this.state.y }}
                bordered
                rowKey={(record) => record.id}
                tableLayout='fixed'
                expandedRowRender={(record) => (
                  <div
                    dangerouslySetInnerHTML={{ __html: record.content }}
                  ></div>
                )}
                pagination={{
                  onChange: this.handArticle,
                  pageSize: count,
                  total: this.state.cache.length,
                  showQuickJumper: true,
                }}
              />
            </Col>
            <Col
              xxl={{ span: 4, offset: 0 }}
              xl={{ span: 7, offset: 0 }}
              md={{ span: 7, offset: 0 }}
              xs={{ span: 22, offset: 1 }}
              style={{ paddingLeft: "15px" }}
            >
              <List
                size="large"
                header={
                  <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <div style={{fontSize: '18px', fontWeight: 'bold'}}>已添加的文章</div>
                    <Button type='danger' onClick={this.clearSelection}>清空</Button>
                  </div>
                }
                bordered
                dataSource={this.state.selectedRowKeys}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}

export default CollectionPage;
