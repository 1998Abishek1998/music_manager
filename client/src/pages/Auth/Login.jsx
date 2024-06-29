
import { useCallback, useEffect, useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import { appNames } from '../../config/constants';
import LoginForm from './LoginForm';
import PlainButton from '../../components/forms/Button';
import RegisterForm from './RegisterForm';
import { useNavigate } from 'react-router-dom';
import { bearerTest, register } from '../../api/apiClient';
import { Form } from 'antd';
import { useSuccessNotify } from '../../hooks/useSuccess';
import { useErrorNotify } from '../../hooks/useError';

const Login = () => {
  const [isLoginForm, setAuthType] = useState(true)
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const handleClick = useCallback(() => {
    setAuthType(!isLoginForm);
  }, [isLoginForm]);

  const successNotify = useSuccessNotify();
  const errorNotify = useErrorNotify();


  const onFinish = (values) => {

    register({
      ...values,
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      phone: values.phone,
      dob: values.dateOfBirth.format('YYYY-MM-DD'),
      role_id: 1,
      status: "active",
      gender: values.gender,
      address: values.address,
    })
      .then(() => {
        successNotify({
          description: ' Created new user.'
        })
        form.resetFields();
        handleClick()
      })
      .catch(err => {
        errorNotify({
          description: err.message,
          error: err
        })
      })
  };

  useEffect(() => {
    bearerTest()
      .then(() => navigate('/dashboard'))
      .catch(() => {
        navigate('/')
      })

    return () => bearerTest()
  }, [navigate])

  return (
    <div style={{ overflow: 'hidden' }}>
      <AuthLayout>
        <div className='flex flex-col items-center justify-between bg-slate-50 p-12 border-solid rounded-lg'>
          <span className='font-bold text-center mb-8'>Welcome to {appNames.value} </span>
          <div>
            {
              isLoginForm ?
                <LoginForm /> : <RegisterForm form={form} onFinish={onFinish} />
            }
          </div>
          {
            isLoginForm ? 'Do not have an account yet ? ' : 'Already Have an Account ? '
          }
          <PlainButton type='link' onClick={handleClick}>
            {isLoginForm ?
              'Register' : 'Login'
            }
          </PlainButton>
        </div>
      </AuthLayout >
    </div >
  )
}

export default Login;
