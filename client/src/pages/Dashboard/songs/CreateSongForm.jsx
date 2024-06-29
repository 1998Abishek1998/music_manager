import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import { genre } from '../../../assets/constants'

const CreateSongForm = ({ form, onFinish }) => {

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
        label="Title"
        name="title"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please input your title!',
          },
        ]}
      >
        <Input
          placeholder='Enter title'
        />
      </Form.Item>
      <Form.Item
        label="Album"
        name="album_name"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please input your album!',
          },
        ]}
      >
        <Input
          placeholder='Enter album'
        />
      </Form.Item>

      <Form.Item
        name="genre"
        label="Genre"
        labelAlign='left'
        rules={[
          {
            required: true,
            message: 'Please select genre!',
          },
        ]}
      >
        <Select placeholder="select your genre">
          {
            genre.map((itm) => <Select.Option key={itm.value} value={itm.value}>{itm.key}</Select.Option>)
          }
        </Select>
      </Form.Item>
    </Form>
  )
}

CreateSongForm.propTypes = {
  form: PropTypes.any.isRequired,
  onFinish: PropTypes.func.isRequired,
}

export default CreateSongForm
