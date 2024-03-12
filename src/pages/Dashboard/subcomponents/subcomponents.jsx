import React, { useState, useEffect } from "react";
import Components from "../../../components";
import { Collapse, Typography } from "antd";
import { ChartSection, getCollapseAttributes } from "./utils/utils";
import "./subcomponents.css";

const { NewsTable, Chart, Ticker } = Components;
const { Title } = Typography;
export function CollapsableSection({
  componentSize = "",
  ticker = "",
  isDarkMode = false,
  tickerDescription = ""
}) {
  const [isResizing, setResizing] = useState(false);
  const [dividerPosition, setDividerPosition] = useState(60);
  const [record, setRecord] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) =>
      isResizing ? setDividerPosition((e.clientX / window.innerWidth) * 100) : () => {};
    const handleMouseUp = () => setResizing(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isResizing]);

  const small = [
    {
      key: "0",
      label: (
        <Title level={2}>
          {ticker} - {tickerDescription}
        </Title>
      ),
      children: <Ticker ticker={ticker} />
    }
  ];
  const large = [
    {
      key: "1",
      label: "Chart",
      children: <Chart ticker={ticker} isDarkMode={isDarkMode} />
    },
    {
      key: "2",
      label: "Table",
      children: (
        <ChartSection
          dividerPosition={dividerPosition}
          setResizing={setResizing}
          record={record}
          newsTable={
            <NewsTable ticker={ticker} getTableRow={(newsRecord) => setRecord(newsRecord)} />
          }
        />
      )
    }
  ];

  const { items, size, defaultActiveKey } = getCollapseAttributes(componentSize, [small, large]);

  return (
    <Collapse
      size={size}
      expandIconPosition="end"
      items={items}
      defaultActiveKey={defaultActiveKey}
    />
  );
}
