import { useState, useCallback } from "react";
import getCofnig from "next/config";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { CloudOutlined } from "@ant-design/icons";

import axios from "axios";

import Link from "next/link";
import { Button, Layout, Input, Avatar, Tooltip, Dropdown, Menu } from "antd";

import { logout } from "../store/store";
import Container from "./Container";
const { Header, Content, Footer } = Layout;

const { publicRuntimeConfig } = getCofnig();
import "./css/Layout.css";

const OnedriveIconStyle = {
  color: "white",
  fontSize: 40,
  display: "block",
  paddingTop: 10,
  marginRight: 20
};

function MyLayout({ children, user,logout }) {
  console.log("user", user);
  console.log("logout", logout);
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleLogout}>
          登 出
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <CloudOutlined style={OnedriveIconStyle} />
              </Link>
              aaa
            </div>
            <div>
              <Input.Search placeholder="搜索仓库" />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  {/* <a href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon="user" />
                  </a> */}
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>{children}</Content>
      <Footer></Footer>
    </Layout>
  );
}

export default connect( ( function mapState(state) {
  return {
    user: state.user,
  }
},
    function mapReducer(dispatch) {
      return {
        logout: () => dispatch(logout())
      };
    }
  ))(MyLayout);
