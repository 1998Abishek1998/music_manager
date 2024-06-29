import { Button } from 'antd';
import PropTypes from 'prop-types';

const PlainButton = ({ children, type = 'default', htmlType = 'button', ...props }) => {
  return (
    <Button type={type} htmlType={htmlType} {...props}>
      {children || 'Submit'}
    </Button>
  );
};

PlainButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.oneOf(['primary', 'secandary', 'default', 'dashed', 'link', 'text']),
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default PlainButton;
