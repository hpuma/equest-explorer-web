import { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import TickerWidget from "../../components/TickerWidget/TickerWidget";
import SearchWidget from "../../components/SearchWidget/SearchWidget";
import TableWidget from "../../components/TableWidget/TableWidget";
import ChartWidget from "../../components/ChartWidget/ChartWidget";
import Brand from "../../components/Brand/Brand";
import NavBar from "../../components/NavBar/NavBar";
import Config from "./utils/config";
import React from "react";
import { ConfigProvider, Modal, Col, Row } from "antd";

export default function Dashboard() {
  const searchRef = useRef(null);
  const [ticker, setTicker] = useState("AMZN");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [isChartEnabled, setChartEnabled] = useState(false);

  useEffect(() => {
    const handleKeyDown = ({ keyCode }) => {
      const isAlphabetChar = Config.isAlphabetChar(keyCode);
      const openModalIfNotOpen = isAlphabetChar && !isModalOpen;
      searchRef.current?.focus();
      if (openModalIfNotOpen) setIsModalOpen(isAlphabetChar);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.backgroundColor = Config.getTheme(isDarkMode)["backgroundColor"];
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDarkMode, ticker]);

  // Handlers
  const cancelModal = () => setIsModalOpen(false);
  const onSearch = (value) => {
    const textIsValid = Config.isTextValid(value);
    if (textIsValid) {
      setIsModalOpen(false);
      setTicker(value);
    }
  };
  const updateDarkMode = () => setDarkMode(!isDarkMode);
  const enableChart = () => setChartEnabled(!isChartEnabled);

  // Spans
  const { tickerWidgetSpan, emptyColSpan, navBarSpan } = Config.getGridSpans();
  return (
    <ConfigProvider theme={Config.getThemeAlgorithm(isDarkMode)}>
      <div id="dashboard-container">
        <Modal title="Symbol Search" open={isModalOpen} footer={null} onCancel={cancelModal}>
          <SearchWidget
            ticker={ticker}
            isModalOpen={isModalOpen}
            searchRef={searchRef}
            onSearch={onSearch}
          />
        </Modal>

        <Brand isDarkMode={isDarkMode} />
        {/* Widgets */}
        <Row>
          <Col span={tickerWidgetSpan}>
            <TickerWidget ticker={ticker} />
          </Col>

          <Col span={emptyColSpan} />
          <Col span={navBarSpan}>
            <NavBar updateDarkMode={updateDarkMode} enableChart={enableChart} />
          </Col>
        </Row>

        {isChartEnabled ? <ChartWidget ticker={ticker} isDarkMode={isDarkMode} /> : null}
        <TableWidget ticker={ticker} key={ticker} />
      </div>
    </ConfigProvider>
  );
}
