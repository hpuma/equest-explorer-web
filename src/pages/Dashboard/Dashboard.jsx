import { useState } from "react";
import "./Dashboard.css";
import TickerWidget from "components/TickerWidget/TickerWidget";
import SearchWidget from "components/SearchWidget/SearchWidget";
import TableWidget from "components/TableWidget/TableWidget";
import ChartWidget from "components/ChartWidget/ChartWidget";

import { Col, Row, Divider } from "antd";
export default function Dashboard() {
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
  const colSpan = 12;
  return (
    <div id="dashboard-container">
      <h1>Dashboard</h1>
      <Row>
        <Col span={colSpan}>
          <TickerWidget ticker={ticker} />
        </Col>
        <Col span={colSpan}>
          <SearchWidget ticker={ticker} loading={loading} onSearch={onSearch} />
        </Col>
      </Row>

      <ChartWidget ticker={ticker} />

      <TableWidget ticker={ticker} updateLoading={updateLoading} />
    </div>
  );
}
