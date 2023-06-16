import { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import TickerWidget from "components/TickerWidget/TickerWidget";
import SearchWidget from "components/SearchWidget/SearchWidget";
import TableWidget from "components/TableWidget/TableWidget";
// import ChartWidget from "components/ChartWidget/ChartWidget";
import Brand from "components/Brand/Brand";
import NavBar from "components/NavBar/NavBar";
import Config from "./utils/config";
import { ConfigProvider, Modal, Col, Row } from "antd";

export default function Dashboard() {
  const searchRef = useRef(null);
  const [ticker, setTicker] = useState("AMZN");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
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
    document.body.style.backgroundColor = Config.getTheme(isDarkMode)["backgroundColor"];
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDarkMode]);

  // Handlers
  const onSearch = (value) => {
    if (typeof value === "string" && value.length > 0) {
      setTicker(value);
      setIsModalOpen(false);
    } else if (!value) console.log("SEARCHED TICKER: EMPTY ❌");
  };
  const updateDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };
  // Spans
  const tickerWidgetSpan = 8;
  const emptyColSpan = tickerWidgetSpan + 4;
  const navBarSpan = 24 - (tickerWidgetSpan + emptyColSpan);
  return (
    <ConfigProvider theme={Config.getThemeAlgorithm(isDarkMode)}>
      <div id="dashboard-container">
        <Modal title="Symbol Search" open={isModalOpen} footer={null} onCancel={cancelModal}>
          <SearchWidget ticker={ticker} searchRef={searchRef} onSearch={onSearch} />
        </Modal>

        <Brand />
        {/* Widgets */}
        <Row>
          <Col span={tickerWidgetSpan}>
            <TickerWidget ticker={ticker} />
          </Col>

          <Col span={emptyColSpan}></Col>

          <Col span={navBarSpan}>
            <NavBar updateDarkMode={updateDarkMode} />
          </Col>
        </Row>

        {/* <ChartWidget ticker={ticker} isDarkMode={isDarkMode} /> */}
        <TableWidget ticker={ticker} />
      </div>
    </ConfigProvider>
  );
}
