import { useState } from "react";
import "./Dashboard.css";
import TickerWidget from "components/TickerWidget/TickerWidget";
import SearchWidget from "components/SearchWidget/SearchWidget";
import TableWidget from "components/TableWidget/TableWidget";
import ChartWidget from "components/ChartWidget/ChartWidget";
import NavBar from "components/NavBar/NavBar";

import { Col, Row } from "antd";
export default function Dashboard() {
  const BrandComponent = () => {
    return (
      <div>
        <img
          id="search-widget-equest-logo"
          src={require("components/SearchWidget/images/SentiSys2.jpg")}
        />
      </div>
    );
  };

  let [ticker, setTicker] = useState("AMZN");
  let [loading, setLoading] = useState(false);

  // Search non empty search bars only
  const onSearch = (value) => {
    if (value) setTicker(value.toUpperCase());
    else console.log("SEARCHED TICKER: EMPTY ❌");
  };

  // Loading animation for widgets
  const updateLoading = (isLoading, delay) => {
    setTimeout(() => {
      setLoading(isLoading);
    }, delay);
  };

  return (
    <div id="dashboard-container">
      <Row>
        <Col span={2}>
          <BrandComponent />
        </Col>
        <Col span={2}>TM</Col>
        <Col span={8}>
          <SearchWidget />
        </Col>
        <Col span={8}> </Col>
        <Col span={4}>
          <NavBar />
        </Col>
      </Row>
      <Row>
        {/*Ticker */}
        <Col span={4}>
          <TickerWidget ticker={ticker} />
        </Col>
        {/*COL SPACING */}
        <Col span={20}>SPACING</Col>
      </Row>

      <ChartWidget ticker={ticker} />
      <TableWidget ticker={ticker} updateLoading={updateLoading} />
    </div>
  );
}
