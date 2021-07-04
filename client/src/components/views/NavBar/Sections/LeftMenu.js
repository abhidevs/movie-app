import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite" style={{ borderBottom: `${props.activeTab === 1 ? '2px solid #1890ff' : 'none'}` }}>
        <Link onClick={() => props.setActiveTab(1)} style={{ color: `${ props.activeTab === 1 ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}` }} to="/favorite">Favorite</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu