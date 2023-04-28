import { useEffect, useState } from "react";
import { Descriptions } from "antd";
import "./TickerWidget.css";
import EquestInstance from "api/equestserver";
export default function TickerWidget({ ticker }) {
  const [quote, setTickerQuote] = useState({});

  useEffect(() => {
    const getData = async () => {
      const quoteData = await EquestInstance.getGlobalQuote(ticker);
      setTickerQuote(quoteData);
    };

    getData();
  }, [ticker]);

  return (
    <Descriptions title={ticker} bordered column={2} size="small">
      <Descriptions.Item label="Price">{quote.change}</Descriptions.Item>
      <Descriptions.Item label="Open">{quote.open}</Descriptions.Item>
      <Descriptions.Item label="Volume">{quote.volume}</Descriptions.Item>
      <Descriptions.Item label="High">{quote.high}</Descriptions.Item>
      <Descriptions.Item label="Previous Close">{quote.previousClose}</Descriptions.Item>
      <Descriptions.Item label="Low">{quote.low}</Descriptions.Item>
      <Descriptions.Item label="Last Updated">{quote.latestTradingDay}</Descriptions.Item>
    </Descriptions>
  );
}
