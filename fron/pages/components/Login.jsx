import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import cookie from 'cookie'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

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

      router.push('/pages/page2')
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/pages/page2')
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
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default Login
