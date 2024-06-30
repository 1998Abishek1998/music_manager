`${url}/v1/artists/export-csv`

import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { url } from '../../../api/apiClient';
import PropTypes from 'prop-types'

const CsvUploader = ({ reload, setReload }) => (
  <Upload
    name='file'
    action={`${url}//v1/artists/import-csv`}
    accept='text/csv'
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
    <Button icon={<UploadOutlined />}>Click to Upload Csv File</Button>
  </Upload >
);

CsvUploader.propTypes = {
  id: PropTypes.number,
  setReload: PropTypes.func,
  reload: PropTypes.bool
}
export default CsvUploader;
