import { useEffect, useState } from "react";
import { Table } from "antd";
import EquestInstance from "../../api/equestserver";
import Config from "./utils/config";
import { dataSourceDef } from "./utils/defaults";
import { v4 as uuidv4 } from "uuid";
import React from "react";
export default function TableWidget({ ticker }) {
  const [dataSource, setDataSource] = useState(null);

  // Make api request on ticker update
  const getData = async () => {
    console.log("SEARCHED NEWS RECORDS: ", ticker, "✅");
    const { articles, count } = await EquestInstance.getNewsRecords(ticker);
    const newDataSource = count ? articles : dataSourceDef;
    setDataSource(newDataSource);
  };

  useEffect(() => {
    if (!dataSource) getData();

    return () => {
      getData();
    };
  }, [ticker]);

  return (
    <Table
      columns={Config.getColumns()}
      dataSource={dataSource}
      rowKey={() => uuidv4()}
      size="small"
      pagination={{ pageSize: 100 }}
    />
  );
}
