import { Form, Input } from 'antd'
import { useCallback, useContext } from 'react';

import PlainButton from '../../components/forms/Button'
import { useErrorNotify } from '../../hooks/useError';
import { useSuccessNotify } from '../../hooks/useSuccess';
import { login } from '../../api/apiClient';
import { AuthContext } from '../../store/AuthContext'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const successNotify = useSuccessNotify();
  const errorNotify = useErrorNotify();
  const navigate = useNavigate()

  const { handleSetAuth } = useContext(AuthContext)

  const onFinish = useCallback((values) => {
    login({
      username: values.email,
      password: values.password
    })
      .then((data) => {
        successNotify({
          description: data.message
        })

        handleSetAuth(data.token, data.data.roleId, data.data.userId, data.data.artist)
        navigate('/dashboard')
      })
      .catch(err => {
        errorNotify({
          description: err.message,
          error: err
        })
      })
  }, [errorNotify, navigate, handleSetAuth, successNotify]);

  return (
    <Form
      name="login"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        label="E-mail"
        labelAlign='left'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password
          placeholder='Enter your password.'
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
        }}
      >
        <PlainButton type="primary" htmlType="submit">
          Login
        </PlainButton>
      </Form.Item>

    </Form>
  )
}

export default LoginForm
