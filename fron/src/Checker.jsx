import React, { Component } from "react";
import { Icon, Typography } from "antd";

class Checker extends Component {
  state = {
    value: 1,
    radius: '30px',
    color: 'white'
  };

  render () {
    return (
        <div>
            <div style={{background: '#262626', width: '2px', height: '30px', marginLeft: '30px'}}></div>
            <div style={{display: 'flex', justifyContent: 'row'}}>
                <div style={{background: '#262626', width: '30px', height: '2px'}}></div>
                <div style={{background: 'black', borderRadius: '20px'}}></div>
                <div style={{background: '#262626', width: '30px', height: '2px'}}></div>
            </div>
            <div style={{background: '#262626', width: '2px', height: '30px', marginLeft: '30px'}}></div>
        </div>
    )
  }
}

export default Checker;
