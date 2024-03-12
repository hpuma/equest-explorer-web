import React, { useEffect, useState } from "react";
import EquestInstance from "../../api/equestserver";
import { Card, Row } from "antd";
import { tickerDef } from "../defaults";
import { CreateColumn } from "./subcomponent";

export default function Ticker({ ticker }) {
  const [quote, setTickerQuote] = useState(tickerDef);

  useEffect(() => {
    const getData = async () => {
      const quoteData = await EquestInstance.getGlobalQuote(ticker);

      if (quoteData.message) return setTickerQuote(tickerDef);
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
