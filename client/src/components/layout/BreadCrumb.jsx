import { Breadcrumb } from 'antd';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BreadcrumbComponent = () => {
  const location = useLocation();

  const breadcrumbs = location.pathname.split('/').filter(Boolean).map((segment, index, array) => {
    let path = '';

    if (index < array.length - 1) {
      path = `/${array.slice(0, index + 1).join('/')}`;
    }

    return {
      title: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: path,
      isClickable: index < array.length - 1
    };
  });

  const breadcrumbItems = useMemo(() =>
    breadcrumbs.map((crumb) => ({
      title: crumb.isClickable ? <Link to={crumb.path}>{crumb.title}</Link> : <span>{crumb.title}</span>,
    })), [breadcrumbs])

  return (
    <Breadcrumb items={breadcrumbItems} style={{ margin: "10px" }} />
  );
};

export default BreadcrumbComponent;
