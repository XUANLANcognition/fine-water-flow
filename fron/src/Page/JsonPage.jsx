import React, { useState, useEffect, useMemo, useRef } from "react";
import { Layout, Row, Col, Button, Input, message } from "antd";
import axios from "axios";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import ReactJson from "react-json-view";

import Nav from "../Nav";
import Myfooter from "../Myfooter";

const { TextArea } = Input;

const success = () => {
  message.success("已更新");
};

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
const errorObj = { error: "你这个输入是在为难为师啊" };
const JsonPage = () => {
  const [input, $input] = useState("");
  const debouncedInput = useDebounce(input, 500);
  const jsonView = useMemo(() => {
    try {
      const ret = JSON.parse(debouncedInput);
      if (typeof ret === "object") {
        return ret;
      } else {
        return errorObj;
      }
    } catch (e) {
      return errorObj;
    }
  }, [debouncedInput]);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (jsonView !== errorObj) {
        success();
      }
    }
  }, [jsonView]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Nav />
      <div style={{ flex: "1 0", minHeight: "100vh", backgroundColor: "#fff" }}>
      <Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <Col
              xxl={{ span: 14, offset: 5 }}
              xl={{ span: 20, offset: 2 }}
              xs={{ span: 22, offset: 1 }}
            >
              <div
                style={{
                  display: "flex",
                  color: "#000",
                  fontWeight: "600",
                  fontSize: "32px",
                  marginBottom: "24px",
                }}
              >
                JSON查看器
              </div>
              <div
                style={{
                  display: "flex",
                  fontWeight: "600",
                  fontSize: "22px",
                  marginBottom: "14px",
                }}
              >
                更加简洁的JSON查看器
              </div>
            </Col>
          </Row>
        <Row style={{ flex: "1 0", padding: "15px 0" }}>
          <Col
            xxl={{ span: 6, offset: 5 }}
            xl={{ span: 9, offset: 2 }}
            md={{ span: 15, offset: 1 }}
            xs={{ span: 24, offset: 0 }}
            style={{}}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: "24px",
                paddingBottom: "18px",
                fontWeight: "bold",
              }}
            >
              JSON 字符
            </div>
            <Button
              type="primary"
              onClick={() => {
                $input("");
                message.success("已清空");
              }}
              style={{ marginBottom: "18px" }}
            >
              清空
            </Button>
            <TextArea
              rows={18}
              value={input}
              onChange={(e) => $input(e.target.value)}
            />
          </Col>
          <Col
            xxl={{ span: 7, offset: 1 }}
            xl={{ span: 10, offset: 1 }}
            md={{ span: 7, offset: 0 }}
            xs={{ span: 22, offset: 1 }}
            style={{ paddingLeft: "15px" }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: "24px",
                paddingBottom: "18px",
                fontWeight: "bold",
              }}
            >
              JSON 解析
            </div>
            <ReactJson src={jsonView} />
          </Col>
        </Row>
      </div>
      <Myfooter />
    </Layout>
  );
};

export default JsonPage;
