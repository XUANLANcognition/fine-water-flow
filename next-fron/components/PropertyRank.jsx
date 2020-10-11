import React, { Component } from "react";
import { UserOutlined } from '@ant-design/icons';
import { List, Avatar, Typography } from "antd";
import axios from "axios";
import Link from "next/link";

const { Title } = Typography;

class PropertyRank extends Component {
  state = {
    data: [],
    initLoading: true,
  };

  componentDidMount = async (v) => {
    await this.getData();
    this.setState({ initLoading: false });
  };

  getData = async (v) => {
    try {
      const response = await axios.get(
        "https://101.200.52.246:8080/api/property_rank/?format=json"
      );
      this.setState({ data: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div
        style={{
          padding: "20px 20px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 1px 3px rgba(26,26,26,.1)",
        }}
      >
        <List
          header={<Title level={4}>积分榜</Title>}
          itemLayout="horizontal"
          dataSource={this.state.data}
          split={false}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Link
                    href={
                      (item.id + "" === this.props.userId
                        ? "/profile/"
                        : "/visit/") + item.id
                    }
                  >
                    <Avatar shape="square" icon={<UserOutlined />} src={item.last_name} />
                  </Link>
                }
                title={item.username}
              />
              {item.property}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default PropertyRank;
