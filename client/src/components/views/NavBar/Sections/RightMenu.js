/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const Upload = require('../../../../assets/images/upload.png');

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail" style={{ borderBottom: `${props.activeTab === 2 ? '2px solid #1890ff' : 'none'}` }}>
          <Link onClick={() => props.setActiveTab(2)} style={{ color: `${ props.activeTab === 2 ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}` }} to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app" style={{ borderBottom: `${props.activeTab === 3 ? '2px solid #1890ff' : 'none'}` }}>
          <Link onClick={() => props.setActiveTab(3)} style={{ color: `${ props.activeTab === 3 ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}` }} to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

