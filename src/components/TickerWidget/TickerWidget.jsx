import React from "react";
import EquestInstance from "../../api/equestserver";
import { useEffect, useState } from "react";
import { Card, Typography, Row } from "antd";
import { tickerWidgetDef } from "./defaults";
import { CreateColumn } from "./subcomponent";
import "./TickerWidget.css";

const { Title } = Typography;
export default function TickerWidget({ ticker }) {
  const [quote, setTickerQuote] = useState(tickerWidgetDef);

  useEffect(() => {
    const getData = async () => {
      const quoteData = await EquestInstance.getGlobalQuote(ticker);

      if (quoteData.message) return setTickerQuote(tickerWidgetDef);
      setTickerQuote(quoteData);
    };
    getData();
  }, [ticker]);

  const rowGutter = { xs: 8, sm: 16, md: 24, lg: 32 };

  return (
    <Card style={{ textAlign: "center" }} size="small">
      <Row gutter={rowGutter}>
        <CreateColumn
          fields={[
            "price",
            "open",
            "volume",
            "previousClose",
            "latestTradingDay",
            "change",
            "changePercent"
          ]}
          quote={quote}
        />
      </Row>
    </Card>
  );
}
