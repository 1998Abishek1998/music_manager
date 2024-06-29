import { useCallback, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  YoutubeFilled,
  TeamOutlined,
  HomeFilled
} from '@ant-design/icons';
import useCanAccess from '../../hooks/useCanAccess';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const canAccess = useCanAccess()

  const items = [
    { key: 'home', label: 'Home', icon: <HomeFilled />, path: '/dashboard', },
    canAccess(1) && { key: 'users', label: 'Users', icon: <UserOutlined />, path: '/dashboard/users' },
    canAccess(1, 2) && { key: 'artists', label: 'Artists', icon: <TeamOutlined />, path: '/dashboard/artists' },
    canAccess(1, 2, 3) && { key: 'songs', label: 'Songs', icon: <YoutubeFilled />, path: '/dashboard/songs' },
  ];

  const selectedKey = items.find(item => location.pathname === item.path)?.key;

  const handleMenuClick = useCallback((e) => {
    navigate(e.item.props.path)
  }, [navigate])

  return (
    <Sider
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto',
      }}
      theme='light'
      collapsible
      collapsed={collapsed}
      onCollapse={(value) =>
        setCollapsed(value)}
    >
      <Menu theme='light' selectedKeys={[selectedKey]} mode="inline" items={items} onSelect={handleMenuClick} />
    </Sider>
  );
};

export default Sidebar;
