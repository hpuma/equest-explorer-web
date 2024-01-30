import React from "react";
import Components from "../../components";
import { Row, Col, Card, Divider, Collapse } from "antd";

const { TableWidget, ChartWidget, TickerWidget } = Components;
function PreviewField({ label = null, content = null }) {
  const formattedLabel = label == null ? null : <b>{label}:</b>;
  const formattedContent = label == "Source" ? <a href={content}>Link</a> : content;

  return (
    <>
      {formattedLabel} {formattedContent} <br />
    </>
  );
}

function NewsPreview({
  record: { title, author, url, urlToImage, content, description, updatedAt }
}) {
  return (
    <Card hoverable title={title} cover={<img src={urlToImage} />}>
      <PreviewField label={"Author"} content={author} />
      <PreviewField label={"Source"} content={url} />
      <PreviewField label={"Updated At"} content={updatedAt} />
      <Divider />
      <PreviewField content={description} />
      <PreviewField content={content} />
    </Card>
  );
}

export function CollapsableSection({
  widgets = "",
  ticker = "",
  isDarkMode = false,
  record = {},
  setRecord
}) {
  const smallWidgets = [
    {
      key: "0",
      label: "Quote",
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
        <Row>
          <Col span={18}>
            <TableWidget
              ticker={ticker}
              key={ticker}
              getTableRow={(newsRecord) => setRecord(newsRecord)}
            />
          </Col>
          <Col span={6}>
            <NewsPreview record={record} />
          </Col>
        </Row>
      )
    }
  ];
  const items = widgets == "small" ? smallWidgets : largeWidgets;
  const defaultActiveKey = widgets == "small" ? [] : ["1", "2"];

  return (
    <Collapse
      size={"small"}
      expandIconPosition="end"
      items={items}
      defaultActiveKey={defaultActiveKey}
    />
  );
}
