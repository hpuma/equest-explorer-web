import React, { useState, useContext } from "react";
import {
  AreaChartOutlined,
  DashboardOutlined,
  SettingOutlined,
  LoginOutlined
} from "@ant-design/icons";

import { Menu, Switch } from "antd";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../index";
export default function NavBar() {
  const [current, setCurrent] = useState("mail");
  const { isDarkMode, setDarkMode } = useContext(ThemeContext);
  const items = [
    {
      label: "Analytics",
      key: "analytics",
      icon: <Link to="/analytics">{<AreaChartOutlined />}</Link>
    },
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <Link to="/">{<DashboardOutlined />}</Link>
    },
    {
      label: "Settings",
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        {
          label: "Theme",
          key: "theme",
          icon: <Switch onChange={setDarkMode} checked={isDarkMode} size="small" />
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
