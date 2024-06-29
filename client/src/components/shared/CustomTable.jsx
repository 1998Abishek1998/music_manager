import { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

const CustomTable = ({ columns, apiCall, callAgain, params }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    },
  });

  const fetchData = useCallback(() => {
    setLoading(true);
    apiCall({
      ...params,
      limit: tableParams.pagination.pageSize,
      offset: tableParams.pagination.current === 1 ? 0 : (tableParams.pagination.current - 1) * tableParams.pagination.pageSize,
    })
      .then((results) => {
        setData(results.data.data);
        setLoading(false);
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: results.data.meta.total || 0,
          },
        }));
      });
  }, [apiCall, tableParams.pagination.current, tableParams.pagination.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData, callAgain]);

  const handleTableChange = (pagination, filters) => {
    setTableParams({
      pagination,
      filters,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  apiCall: PropTypes.func.isRequired,
  callAgain: PropTypes.bool,
  params: PropTypes.object
};

export default CustomTable;
