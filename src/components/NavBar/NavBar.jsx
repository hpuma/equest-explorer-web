import React, { useState } from "react";

import { HomeOutlined, DashboardOutlined, SettingOutlined, LoginOutlined } from "@ant-design/icons";

import { Menu, Switch } from "antd";

export default function NavBar({ updateDarkMode, enableChart }) {
  const [current, setCurrent] = useState("mail");

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
      icon: <SettingOutlined />,
      children: [
        {
          label: "Theme",
          key: "theme",
          icon: <Switch onChange={updateDarkMode} size="small" />
        },
        {
          label: "Chart",
          key: "chart",
          icon: <Switch onChange={enableChart} size="small" />
        },
        {
          label: "Log In",
          key: "login",
          icon: <LoginOutlined />
        }
      ]
    }
  ];

  const onClick = (e) => {
    console.log("Click ✅", e.key);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} items={items} mode="horizontal" />;
}
