import React, { Component } from "react";
import cookie from "cookie";
import { } from 'antd';

import Login from "./components/Login.jsx"
import Myfooter from "./components/Myfooter"
import Nav from "./components/Nav"

class Home extends Component {

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Nav></Nav>
        <div style={{flex: '1', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <div style={{fontSize: '64px'}}>FWF</div>
            <Login></Login>
        </div>
        <Myfooter></Myfooter>
      </div>
    );
  }
}

class THome extends Component {

  render() {
    return (
      <div>Thome</div>
    );
  }
}

const Index = (props) => {
  const { token } = props;
  if (token) {
    return <THome {...props}></THome>;
  } else {
    return <Home {...props}></Home>;
  }
};

export const getServerSideProps = async ({ req }) => {
  const userId = cookie.parse(req.headers.cookie || "")["userId"] || null;
  const token = cookie.parse(req.headers.cookie || "")["token"] || null;
  const userAvatar =
    cookie.parse(req.headers.cookie || "")["userAvatar"] || null;
  return {
    props: { userId, token, userAvatar },
  };
};

export default Index;