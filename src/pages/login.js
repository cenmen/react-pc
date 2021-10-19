import React from 'react'
import { Form, Input, Button } from 'antd'
import css from 'styled-jsx/css'
import api from '../api/index'
import background from '../assets/login-background.gif'

const LoginForm = ({ onSuccess }) => {
  const onFinish = async (values) => {
    const { username, password } = values
    await api.login({
      username,
      password
    })
    onSuccess()
  }

  const onFinishFailed = (fail) => {
    console.log('Failed:', fail)
  }

  return (
    <Form
      name="basic"
      initialValues={{
        username: 'admin',
        password: 'admin'
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ({ onSuccess }) => {
  return (
    <div className="login-container">
      <div className="form">
        <LoginForm onSuccess={onSuccess}></LoginForm>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

const styles = css`
  .login-container {
    height: 100vh;
    width: 100vw;
    background: url(${background}) center/100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form {
    background: #ffffff;
    border-radius: 10px;
    padding: 20px;
  }
`
