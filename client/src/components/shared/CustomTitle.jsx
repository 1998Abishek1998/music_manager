import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;

const CustomTitle = ({ props }) => {
  return (
    <Title {...props}></Title>
  )
}

export default CustomTitle
