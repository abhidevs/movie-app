import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import { Link } from 'react-router-dom'
import './Sections/Navbar.css';
const Logo = require('../../../assets/images/Logo.png');

function NavBar() {
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="menu__logo">
        <Link onClick={() => setActiveTab(0)} to="/"><img src={Logo} alt="Logo" style={{ width: '100%', marginTop: '-5px' }} /></Link>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu setActiveTab={setActiveTab} activeTab={activeTab} mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu setActiveTab={setActiveTab} activeTab={activeTab} mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar