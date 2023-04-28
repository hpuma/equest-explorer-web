import { useEffect, useState } from "react";
import { Table } from "antd";
import EquestInstance from "api/equestserver";
import Config from "./utils/config";
import * as defaults from "./utils/defaults";

const { dataSourceDef } = defaults;

export default function TableWidget({ updateLoading, ticker, sortBy }) {
  let [dataSource, setDataSource] = useState(dataSourceDef);

  useEffect(() => {
    // Make api request on ticker update
    const getData = () => {
      updateLoading(true, 0);
      console.log("SEARCHED TICKER: ", ticker, "✅");
      const { articles, count } = EquestInstance.getEverything(ticker, sortBy);
      if (count) setDataSource(articles);
      updateLoading(false, 215);
    };

    getData();
  }, [ticker, sortBy]);

  return <Table dataSource={dataSource} columns={Config.getColumns()} />;
}
