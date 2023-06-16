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
      const enterPressed = Config.isEnterPressed(keyCode);
      setIsModalOpen(enterPressed);
      if (enterPressed) searchRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.backgroundColor = Config.getTheme(isDarkMode)["backgroundColor"];
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDarkMode]);

  // Handlers
  const cancelModal = () => {
    setIsModalOpen(false);
  };
  const onSearch = (value) => {
    const textIsValid = Config.isTextValid(value);
    if (textIsValid) {
      setTicker(value);
      setIsModalOpen(false);
    }
  };
  const updateDarkMode = () => {
    setDarkMode(!isDarkMode);
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
