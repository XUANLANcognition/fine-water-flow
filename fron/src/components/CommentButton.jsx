import React, { Component } from "react";
import { Icon, Row, Col, Avatar, Popover, Divider, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

import AddComment from "../AddComment";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_d9hnbhljnr.js",
});

class CommentButton extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    return (
      <div style={this.props.style}>
        <Modal
          title="评论区"
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
          width='680px'
        >
          <div style={{height: '380px', overflowY: 'auto'}}>
            <AddComment
              articleId={this.props.article_id}
              articleUrl={this.props.article_url}
            ></AddComment>
          </div>
        </Modal>
        <Button
          type="link"
          onClick={() => this.setModalVisible(true)}
          style={{ color: "#8590a6", fontWeight: 'bold' }}
        >
          <IconFont type="icon-pinglun"></IconFont>
          评论
        </Button>
      </div>
    );
  }
}

export default CommentButton;
