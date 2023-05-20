import { useEffect, useState } from "react";
import { Table } from "antd";
import EquestInstance from "api/equestserver";
import Config from "./utils/config";
import * as defaults from "./utils/defaults";
import { v4 as uuidv4 } from "uuid";
const { dataSourceDef } = defaults;

export default function TableWidget({ updateLoading, ticker, sortBy }) {
  let [dataSource, setDataSource] = useState(dataSourceDef);

  useEffect(() => {
    // Make api request on ticker update
    const getData = async () => {
      updateLoading(true, 0);
      console.log("SEARCHED TICKER: ", ticker, "✅");
      const { articles, count } = await EquestInstance.getEverything(ticker, sortBy);

      if (count) setDataSource(articles);
      updateLoading(false, 215);
    };

    getData();
  }, [ticker, sortBy]);

  return <Table columns={Config.getColumns()} dataSource={dataSource} rowKey={() => uuidv4()} />;
}
