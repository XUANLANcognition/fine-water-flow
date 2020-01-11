import React, { Component } from "react";
import { Layout, Row, Col } from "antd";

import Login from "./Login";
import Nav from "./Nav";
import Myfooter from "./Myfooter";

class SignIn extends Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <div
          style={{
            flex: "1 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Nav></Nav>
          <Row style={{margin: '30px 0'}}>
            <Col
              xxl={{ span: 6, offset: 9 }}
              xl={{ span: 8, offset: 8 }}
              xs={{ span: 22, offset: 1 }}
            >
              <div style={{ background: "white", padding: "20px", display:'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems:'center' }}>
                <div
                  style={{
                    paddingRight: "24px",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "-10px",
                    lineHeight: "56px",
                    marginBottom: '20px'
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      src="/icon.png"
                      style={{ width: "60px", height: "60px" }}
                    />
                    <div style={{ fontWeight: "700", fontSize: "18px" }}>
                      Fine Water Flow
                    </div>
                  </div>
                </div>
                <Login></Login>
              </div>
            </Col>
          </Row>
          <Myfooter></Myfooter>
        </div>
      </Layout>
    );
  }
}

export default SignIn;
