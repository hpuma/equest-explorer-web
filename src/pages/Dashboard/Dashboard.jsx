import { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import TickerWidget from "components/TickerWidget/TickerWidget";
import SearchWidget from "components/SearchWidget/SearchWidget";
import TableWidget from "components/TableWidget/TableWidget";
import ChartWidget from "components/ChartWidget/ChartWidget";
import Brand from "components/Brand/Brand";
import NavBar from "components/NavBar/NavBar";
import { Modal, Col, Row } from "antd";

export default function Dashboard() {
  const [ticker, setTicker] = useState("AMZN");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = ({ keyCode }) => {
      if (keyCode === 13) setIsModalOpen(false); // Enter Pressed
      else if (keyCode >= 65 && keyCode <= 90) {
        // Alphabetical is pressed
        searchRef.current?.focus();
        setIsModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Search non empty search bars only
  const onSearch = (value) => {
    if (typeof value === "string" && value.length > 0) {
      setTicker(value);
      setIsModalOpen(false);
    } else if (!value) console.log("SEARCHED TICKER: EMPTY ❌");
  };

  // Spans
  const tickerWidgetSpan = 8;
  const emptyColSpan = tickerWidgetSpan + 4;
  const navBarSpan = 24 - (tickerWidgetSpan + emptyColSpan);

  return (
    <div id="dashboard-container">
      <Modal
        title="Symbol Search"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <SearchWidget onSearch={onSearch} ticker={ticker} searchRef={searchRef} />
      </Modal>

      <Brand />
      {/* Widgets */}
      <Row>
        <Col span={tickerWidgetSpan}>
          <TickerWidget ticker={ticker} />
        </Col>

        <Col span={emptyColSpan}></Col>

        <Col span={navBarSpan}>
          <NavBar />
        </Col>
      </Row>

      {/* <ChartWidget ticker={ticker} /> */}
      <TableWidget ticker={ticker} />
    </div>
  );
}
