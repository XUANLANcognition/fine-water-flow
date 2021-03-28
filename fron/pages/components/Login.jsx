import { useEffect } from 'react'
import axios from 'axios'
import cookie from 'cookie'
import { useRouter } from 'next/router'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import "../../styles/Login.module.css"

const Login = () => {
    const router = useRouter()
    const onFinish = async (values) => {
    try {
      
      const response = await axios.post(
        'https://101.200.52.246:8080/api-token-auth/',
        {
          username: values.username,
          password: values.password
        }
      )
      window.localStorage.setItem('token', response.data.token)
      window.localStorage.setItem('user_id', response.data.user_id)
      window.localStorage.setItem('user_avatar', response.data.user_avatar)
      window.localStorage.setItem('user_name', response.data.user_name)
      
      document.cookie = cookie.serialize('token', response.data.token)
      document.cookie = cookie.serialize('user_id', response.data.user_id)
      document.cookie = cookie.serialize('user_avatar', response.data.user_avatar)
      document.cookie = cookie.serialize('user_name', response.data.user_name)

      router.push('/pages/page2')
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/')
  }, [])

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入你的用户名!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入你的密码!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">立刻注册</a>
      </Form.Item>
    </Form>
  );
};

export default Login
