import { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import "./TickerWidget.css";
import EquestInstance from "../../api/equestserver";
import { tickerWidgetDef } from "./defaults";
import React from "react";
const { Title } = Typography;

export default function TickerWidget({ ticker }) {
  const [quote, setTickerQuote] = useState(tickerWidgetDef);
  const gridStyle = {
    textAlign: "left",
    width: "14.28%",
    padding: 1
  };
  const titleStyle = {
    textAlign: "center"
  };
  useEffect(() => {
    const getData = async () => {
      const quoteData = await EquestInstance.getGlobalQuote(ticker);

      if (quoteData.message) return setTickerQuote(tickerWidgetDef);
      setTickerQuote(quoteData);
    };

    getData();
  }, [ticker]);

  return (
    <Card style={titleStyle} title={<Title level={2}>{ticker}</Title>}>
      {["price", "open", "volume", "high", "previousClose", "low", "latestTradingDay"].map(
        function (field) {
          return (
            <Card.Grid style={gridStyle} key={field}>
              <b>{field}: </b> <br />
              {quote[field]}
            </Card.Grid>
          );
        }
      )}
    </Card>
  );
}
