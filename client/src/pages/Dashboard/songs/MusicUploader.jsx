import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { musicUploadUrl } from '../../../api/apiClient';
import PropTypes from 'prop-types'

const MusicUploader = ({ id, reload, setReload }) => (
  <Upload
    name='file'
    action={musicUploadUrl(id)}
    type='drag'
    accept='audio/mpeg'
    headers={{
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'x-user': localStorage.getItem("roleId")
    }}
    onChange={(info) => {

      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
        setReload(!reload)
      } else if (info.file.status === 'error') {
        console.error(`${info.file.name} file upload failed.`);
      }
    }}
  >
    <Button icon={<UploadOutlined />}>Click or Drag to Upload Music</Button>
  </Upload >
);

MusicUploader.propTypes = {
  id: PropTypes.number,
  setReload: PropTypes.func,
  reload: PropTypes.bool
}
export default MusicUploader;
