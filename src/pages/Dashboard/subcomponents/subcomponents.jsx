import React, { useState, useEffect } from "react";
import Components from "../../../components";
import { Collapse, Typography } from "antd";
import { ChartSection, getCollapseAttributes } from "./utils/utils";
import "./subcomponents.css";

const { TableWidget, ChartWidget, TickerWidget } = Components;
const { Title } = Typography;
export function CollapsableSection({
  widgets = "",
  ticker = "",
  isDarkMode = false,
  record = {},
  setRecord,
  tickerDescription = ""
}) {
  const [isResizing, setResizing] = useState(false);
  const [dividerPosition, setDividerPosition] = useState(60);

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

  const smallWidgets = [
    {
      key: "0",
      label: (
        <Title level={2}>
          {ticker} - {tickerDescription}
        </Title>
      ),
      children: <TickerWidget ticker={ticker} />
    }
  ];
  const largeWidgets = [
    {
      key: "1",
      label: "Chart",
      children: <ChartWidget ticker={ticker} isDarkMode={isDarkMode} />
    },
    {
      key: "2",
      label: "Table",
      children: (
        <ChartSection
          ticker={ticker}
          dividerPosition={dividerPosition}
          setRecord={setRecord}
          setResizing={setResizing}
          record={record}
          tableWidget={
            <TableWidget
              ticker={ticker}
              key={ticker}
              getTableRow={(newsRecord) => setRecord(newsRecord)}
            />
          }
        />
      )
    }
  ];

  const { items, size, defaultActiveKey } = getCollapseAttributes(widgets, [
    smallWidgets,
    largeWidgets
  ]);

  return (
    <Collapse
      size={size}
      expandIconPosition="end"
      items={items}
      defaultActiveKey={defaultActiveKey}
    />
  );
}
