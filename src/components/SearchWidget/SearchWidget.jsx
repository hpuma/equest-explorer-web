import { Input } from "antd";
const { Search } = Input;
export default function SearchWidget({ onSearch, ticker, loading }) {
  return (
    <Search
      placeholder={ticker}
      enterButton="Search"
      size="large"
      loading={loading}
      onSearch={onSearch}
      style={{ width: 400 }}
      allowClear
    />
  );
}
