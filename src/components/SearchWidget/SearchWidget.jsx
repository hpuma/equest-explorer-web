import { AutoComplete, Input } from "antd";
import { useState } from "react";
import EquestInstance from "api/equestserver";
const { Search } = Input;

export default function SearchWidget({ onSearch, ticker, loading }) {
  const [bestMatchesData, setBestMatches] = useState(null);
  const [options, setOptions] = useState(null);
  const tickerSearch = async (value) => {
    const { bestMatches } = await EquestInstance.getTickerSearch(value);
    setBestMatches(bestMatches);
    setOptions(searchResult());
  };

  const searchResult = () =>
    bestMatchesData.map(({ symbol, name }) => ({
      value: symbol,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <span>
            <b>{symbol}</b>: {name}
          </span>
        </div>
      )
    }));
  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ width: 300 }}
      options={options}
      onSearch={tickerSearch}
    >
      <Search
        placeholder={ticker}
        enterButton="Search"
        size="large"
        loading={loading}
        onSearch={onSearch}
        style={{ width: 400 }}
        allowClear
      />
    </AutoComplete>
  );
}
