import React from "react";
import Components from "../../components";
import Config from "./config";
import { useState, useEffect, useRef } from "react";
import { ConfigProvider, Modal, Col, Row } from "antd";
import { CollapsableSection } from "./subcomponents/subcomponents";

const { SearchWidget, Brand, NavBar } = Components;
export default function Dashboard() {
  const searchRef = useRef(null);
  const [ticker, setTicker] = useState("AMZN");
  const [tickerDescription, setTickerDescription] = useState("Amazon.com Inc.");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = ({ keyCode }) => {
      const isAlphabetChar = Config.isAlphabetChar(keyCode);
      const openModalIfNotOpen = isAlphabetChar && !isModalOpen;
      searchRef.current?.focus();
      if (openModalIfNotOpen) setIsModalOpen(isAlphabetChar);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.backgroundColor = Config.getBackgroundColor(isDarkMode);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDarkMode, ticker]);

  // Handlers
  const cancelModal = () => setIsModalOpen(false);
  const onSearch = ({ value, name }) => {
    if (Config.isTextValid(value))
      setIsModalOpen(false), setTicker(value), setTickerDescription(name);
  };
  const updateDarkMode = () => setDarkMode(!isDarkMode);

  // Spans
  const { tickerWidgetSpan, emptyColSpan, navBarSpan } = Config.getGridSpans();

  return (
    <ConfigProvider theme={Config.getThemeAlgorithm(isDarkMode)}>
      <>
        <Modal title="Symbol Search" open={isModalOpen} footer={null} onCancel={cancelModal}>
          <SearchWidget
            ticker={ticker}
            isModalOpen={isModalOpen}
            searchRef={searchRef}
            onSearch={onSearch}
          />
        </Modal>
        {/* Widgets */}
        <Row>
          <Col span={tickerWidgetSpan}>
            <CollapsableSection
              widgets={"small"}
              ticker={ticker}
              isDarkMode={isDarkMode}
              tickerDescription={tickerDescription}
            />
          </Col>
          <Col span={emptyColSpan} />
          <Col span={navBarSpan}>
            <NavBar updateDarkMode={updateDarkMode} />
          </Col>
        </Row>
        <CollapsableSection widgets={"large"} ticker={ticker} isDarkMode={isDarkMode} />
      </>
    </ConfigProvider>
  );
}
