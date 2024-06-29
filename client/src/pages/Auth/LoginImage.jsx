import { Row } from 'antd';

const LoginImage = () => {
  const backgroundStyle = {
    backgroundImage: `url('/img_login.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
  };


  return (
    <Row justify="center" align="middle" style={backgroundStyle}>
      <div className="absolute inset-0 bg-green-500 bg-opacity-30 z-10"></div>
      <div className="relative z-20">
      </div>
    </Row>
  )
}

export default LoginImage
