import { Pagination } from 'antd';
import PropTypes from 'prop-types'


const CustomPagination = ({ showSizeChanger, onShowSizeChange, defaultCurrent, total }) => <>

  <Pagination
    showSizeChanger={showSizeChanger}
    onShowSizeChange={onShowSizeChange}
    defaultCurrent={defaultCurrent}
    total={total}
    style={{
      position: 'fixed',
      bottom: '5%',
      right: '40%',
      border: '1px solid #00b96b',
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: '#00b96b',
      fontSize: '12px',
      zIndex: 100
    }}
  />

</>

CustomPagination.propTypes = {
  onShowSizeChange: PropTypes.func,
  defaultCurrent: PropTypes.number,
  total: PropTypes.number,
  showSizeChanger: PropTypes.bool
}
export default CustomPagination;
