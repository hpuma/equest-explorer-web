import { Col, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import React from "react";

function getFieldValues(field = "", quoteValue = "") {
  const hasSuffix = field == "changePercent"
  const isOverZero = parseFloat(quoteValue) > 0
  return {
    value: hasSuffix ? quoteValue.replace("%", "") : quoteValue,
    valueStyle: isOverZero ? { color: '#3f8600'} : { color: '#cf1322'},
    prefix : isOverZero ? <ArrowUpOutlined /> : <ArrowDownOutlined />,
    suffix: hasSuffix ? "%" : "",
  }
}

const formatter = (title) => title.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (match) => match.toUpperCase())

export function CreateColumn({ fields = [], quote={}}) {
  const colSpan = 6;
  const fontSize = 12;

  return fields.map((field) => {
    const formattedTitle = formatter(field)
    switch (field) {
      case "change":
      case "changePercent":
        const { value, valueStyle, prefix, suffix } = getFieldValues(field, quote[field])
        return (
          <Col span={colSpan}  key={field}>
            <Statistic
                title={formattedTitle}
                value={value}
                precision={2}
                valueStyle={{...valueStyle, fontSize}}
                prefix={prefix}
                suffix={suffix}
            />
          </Col>);
      default:
        return <Col span={colSpan} key={field}><Statistic title={formattedTitle} value={quote[field]} valueStyle={{ fontSize }}/></Col>
    }
  })
}
