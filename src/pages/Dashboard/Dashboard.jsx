import React, { useState, useEffect, useRef, useContext } from "react";
import Components from "../../components";
import Theme from "../../configs/theme";
import { ThemeContext } from "../../index";
import { ConfigProvider, Modal, Col, Row } from "antd";
import { CollapsableSection } from "./subcomponents/subcomponents";

const { SearchWidget, Brand, NavBar } = Components;
export function Dashboard() {
  const { isDarkMode } = useContext(ThemeContext);
  const [ticker, setTicker] = useState("AMZN");
  const [tickerDescription, setTickerDescription] = useState("Amazon.com, Inc.");
  const searchRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = ({ keyCode }) => {
      const isAlphabetChar = Theme.isAlphabetChar(keyCode);
      const openModalIfNotOpen = isAlphabetChar && !isModalOpen;
      searchRef.current?.focus();
      if (openModalIfNotOpen) setIsModalOpen(isAlphabetChar);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.backgroundColor = Theme.getBackgroundColor(isDarkMode);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDarkMode, ticker]);

  // Handlers
  const cancelModal = () => setIsModalOpen(false);
  const onSearch = ({ value, name }) => {
    if (Theme.isTextValid(value))
      setIsModalOpen(false), setTicker(value), setTickerDescription(name);
  };

  // Spans
  return (
    <ConfigProvider theme={Theme.getAlgorithm(isDarkMode)}>
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
          <Col span={12}>
            <CollapsableSection
              widgets={"small"}
              ticker={ticker}
              isDarkMode={isDarkMode}
              tickerDescription={tickerDescription}
            />
          </Col>

          <Col span={12}>
            <NavBar />
          </Col>
        </Row>
        <CollapsableSection widgets={"large"} ticker={ticker} isDarkMode={isDarkMode} />
      </>
    </ConfigProvider>
  );
}
