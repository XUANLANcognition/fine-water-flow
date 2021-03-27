import React, { Component } from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";

import Login from "./components/Login.jsx"
import Myfooter from "./components/Myfooter"

class Home extends Component {

  render() {
    return (
      <div style={{flex: '1 0'}}>
        <Login></Login>
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