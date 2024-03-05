import React, { useContext, useEffect } from "react";
import Components from "../../components";
import Theme from "../../configs/theme";
import { ThemeContext } from "../../index";
import { ConfigProvider, Col, Row } from "antd";

const { NavBar } = Components;
export function Analytics() {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {}, [isDarkMode]);
  return (
    <ConfigProvider theme={Theme.getAlgorithm(isDarkMode)}>
      <>
        <Row>
          <Col span={12}>TEST</Col>

          <Col span={12}>
            <NavBar />
          </Col>
        </Row>
      </>
    </ConfigProvider>
  );
}
