import React, { useState } from "react";

import { HomeOutlined, DashboardOutlined, SettingOutlined, LoginOutlined } from "@ant-design/icons";

import { Menu } from "antd";

const items = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />
  },
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <DashboardOutlined />
  },
  {
    label: "Settings",
    key: "settings",
    icon: <SettingOutlined />
  },
  {
    label: "Log In",
    key: "login",
    icon: <LoginOutlined />
  }
];

export default function NavBar() {
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}
