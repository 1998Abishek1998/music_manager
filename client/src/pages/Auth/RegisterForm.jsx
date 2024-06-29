import { DatePicker, Form, Input, Select } from 'antd'
import PlainButton from '../../components/forms/Button'
import PropTypes from 'prop-types'
import { gender, roles } from '../../assets/constants'

const RegisterForm = ({ form, showButton = true, onFinish, showRole = false, showArtistReleaseDate = false, artistReleaseDateValidation = false }) => {


  return (
    <Form
      form={form}
      name="basic"
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
        <Input placeholder='Enter email.' />
      </Form.Item>
      <Form.Item
        label="First Name"
        name="firstName"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
          },
        ]}
      >
        <Input
          placeholder='Enter first name'
        />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please input your last Name!',
          },
        ]}
      >
        <Input
          placeholder='Enter last name'
        />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please input your phone!',
          },
        ]}
      >
        <Input
          placeholder='Enter phone'
        />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please input your address!',
          },
        ]}
      >
        <Input
          placeholder='Enter address'
        />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select placeholder="select your gender">

          {
            gender.map(itm => <Select.Option key={itm.value} value={itm.value}>{itm.key}</Select.Option>)
          }
        </Select>
      </Form.Item>

      {
        showRole && <Form.Item
          name="role_id"
          label="Role"
          labelAlign='left'
          rules={[
            {
              required: true,
              message: 'Please select role!',
            },
          ]}
        >
          <Select placeholder="select role">
            {
              roles.map(itm => <Select.Option key={itm.value} value={itm.value}>{itm.key}</Select.Option>)
            }
          </Select>
        </Form.Item>
      }
      <Form.Item
        name="dateOfBirth"
        label="Date Of Birth"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please select dob!',
          },
        ]}
      >
        <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'} />
      </Form.Item>
      {
        showArtistReleaseDate && <Form.Item
          name="firstReleaseYear"
          label="Release Date"
          labelAlign='left'
          rules={artistReleaseDateValidation ? [
            {
              required: true,
              message: 'Please select dob!',
            },
          ] : []
          }
        >
          <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'} />
        </Form.Item>
      }
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
          placeholder='Enter password.'
        />
      </Form.Item>

      <Form.Item
        label="Re- Password"
        name="confirmPassword"
        labelAlign='left'
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          placeholder='Confirm password!'
        />
      </Form.Item>

      {
        showButton ?
          <Form.Item
            wrapperCol={{
              offset: 8,
            }}
          >
            <PlainButton type="primary" htmlType="submit">
              Register
            </PlainButton>
          </Form.Item>
          : <></>
      }

    </Form>
  )
}

RegisterForm.propTypes = {
  form: PropTypes.any.isRequired,
  showButton: PropTypes.bool,
  onFinish: PropTypes.func.isRequired,
  showRole: PropTypes.bool,
  showArtistReleaseDate: PropTypes.bool,
  artistReleaseDateValidation: PropTypes.bool
}

export default RegisterForm
