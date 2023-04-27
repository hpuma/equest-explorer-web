import { Table } from "antd";
import Config from "./utils/config";
import * as defaults from "./utils/defaults";


const { dataSourceDef } = defaults;

export default function TableWidget({ dataSource = dataSourceDef }) {
  
  return (<Table dataSource={dataSource} columns={Config.getColumns()} />);
}