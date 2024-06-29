import { DatePicker, Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import { gender } from '../../../assets/constants'

const EditArtistForm = ({ form, onFinish }) => {


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
        label="Name"
        name="name"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input
          placeholder='Enter name'
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
        name="firstReleaseYear"
        label="Release Date"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please select Release Date!',
          },
        ]}
      >
        <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'} />
      </Form.Item>
    </Form>
  )
}

EditArtistForm.propTypes = {
  form: PropTypes.any.isRequired,
  onFinish: PropTypes.func.isRequired,
}

export default EditArtistForm
