import { Layout, theme } from 'antd';
import Sidebar from './Sidebar'
import PlainButton from '../forms/Button';
import { Suspense, useCallback, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';
import Loading from '../shared/Loading';
import BreadCrumb from './BreadCrumb';

const { Header, Content, Footer } = Layout;

const DashboardLayout = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { handleClearAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    handleClearAuth()
    navigate('/')
  }, [handleClearAuth, navigate])

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,

          }}
          content='asd'
          // eslint-disable-next-line react/no-children-prop
          children={
            <div className='flex justify-end'>
              <PlainButton type='primary' style={{ margin: '10px' }} onClick={handleClick}>Logout</PlainButton>
            </div>
          }
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <BreadCrumb />
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Music Manager ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
