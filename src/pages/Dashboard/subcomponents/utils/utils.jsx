import React from "react";
import { Card, Divider } from "antd";
import "./utils.css";

function PreviewField({ label = null, content = null }) {
  const formattedLabel = label == null ? null : <b>{label}:</b>;
  const formattedContent = label == "Source" ? <a href={content}>Link</a> : content;

  return (
    <>
      {formattedLabel} {formattedContent} <br />
    </>
  );
}

export function NewsPreview({
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

export function ChartSection({ dividerPosition, setResizing, record, newsTable }) {
  const handleMouseDown = () => setResizing(true);
  return (
    <div className="resizable-container">
      <div className="component-left" style={{ width: `${dividerPosition}%` }}>
        {newsTable}
      </div>
      <div className="resizable-divider" onMouseDown={handleMouseDown}>
        <div className="resizable-dots">
          <div className="resizable-dot"></div>
          <div className="resizable-dot"></div>
          <div className="resizable-dot"></div>
        </div>
      </div>
      <div
        className="component-right"
        style={{
          left: "61%",
          width: `${99 - dividerPosition}%`
        }}
      >
        <NewsPreview record={record} />
      </div>
    </div>
  );
}

export function getCollapseAttributes(size, components) {
  return {
    items: size == "small" ? components[0] : components[1],
    size: components == "small" ? "small" : "large",
    defaultActiveKey: components == "small" ? ["0"] : ["2"]
  };
}
