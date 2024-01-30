import { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import SearchWidget from "../../components/SearchWidget/SearchWidget";
import Brand from "../../components/Brand/Brand";
import NavBar from "../../components/NavBar/NavBar";
import Config from "./utils/config";
import React from "react";
import { CollapsableSection } from "./subcomponents";
import { ConfigProvider, Modal, Col, Row } from "antd";

export default function Dashboard() {
  const searchRef = useRef(null);
  const [ticker, setTicker] = useState("AMZN");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [record, setRecord] = useState({});

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
    if (textIsValid) setIsModalOpen(false), setTicker(value);
  };
  const updateDarkMode = () => setDarkMode(!isDarkMode);

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
            <CollapsableSection widgets={"small"} ticker={ticker} isDarkMode={isDarkMode} />
          </Col>
          <Col span={emptyColSpan} />
          <Col span={navBarSpan}>
            <NavBar updateDarkMode={updateDarkMode} />
          </Col>
        </Row>

        <CollapsableSection
          widgets={"large"}
          ticker={ticker}
          isDarkMode={isDarkMode}
          setRecord={setRecord}
          record={record}
        />
      </div>
    </ConfigProvider>
  );
}
