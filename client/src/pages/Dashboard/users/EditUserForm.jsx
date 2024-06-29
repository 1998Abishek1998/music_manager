import { DatePicker, Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import { gender } from '../../../assets/constants'

const EditUserForm = ({ form, onFinish }) => {

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
    </Form>
  )
}

EditUserForm.propTypes = {
  form: PropTypes.any.isRequired,
  onFinish: PropTypes.func.isRequired,
}

export default EditUserForm
