import React, { Component, FC } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "cookie";
import { route } from "next/dist/next-server/server/router";

const FormItem = Form.Item;

const Login: FC<{
  form: any;
}> = (props) => {
  const router = useRouter();
  const doLogin = async (v: any) => {
    try {
      const response = await axios.post(
        "https://101.200.52.246:8080/api-token-auth/",
        {
          username: v.username,
          password: v.password,
        }
      );

      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("user_id", response.data.user_id);
      window.localStorage.setItem("user_avatar", response.data.user_avatar);

      document.cookie = cookie.serialize("token", response.data.token);
      document.cookie = cookie.serialize("userId", response.data.user_id);
      document.cookie = cookie.serialize(
        "userAvatar",
        response.data.user_avatar
      );

      message.success("欢迎 " + response.data.user_name + " 进入 FWF");
      router.reload();
    } catch (error) {
      message.error("账号或密码错误");
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        doLogin(values);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <FormItem>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your username!" }],
        })(
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }],
        })(
          <Input
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("remember", {
          valuePropName: "checked",
          initialValue: true,
        })(<Checkbox>自动登陆</Checkbox>)}
        <Link href="/reset_password" >
          <a className="login-form-forgot" style={{ float: "right" }}>忘记密码？</a>
        </Link>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ width: "100%" }}
        >
          登陆
        </Button>
        没有账号？<Link href="/join">注册</Link>
      </FormItem>
    </Form>
  );
};

const Login1 = Form.create()(Login);

export default Login1;
