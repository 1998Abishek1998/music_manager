import { Col, Row } from 'antd'
import LoginImage from '../../pages/Auth/LoginImage'
import PropTypes from 'prop-types';

const AuthLayout = ({ children }) => {

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12} className='hidden sm:block'>
          <LoginImage />
        </Col>
        <Col xs={24} sm={16} md={12} lg={12} xl={12} xxl={12}>
          <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            {children}
          </Row>
        </Col>
      </Row>
    </>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
}

export default AuthLayout
