import { Modal } from 'antd';
import PropTypes from 'prop-types';

const CustomModal = ({ title, isOpen, handleOk, handleCancel, children }) => {

  return (
    <>
      <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
};

CustomModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default CustomModal;
