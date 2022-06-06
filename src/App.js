import React, { useState } from "react";
import "./App.css";

import axios from "axios";

const endPoint = "https://opendata.resas-portal.go.jp";
const apiKey = process.env.REACT_APP_RESAS_API_KEY;

const App = () => {
  const [prefecture, setPrefecture] = useState([]);

  const getPrefectures = async () => {
    console.log("GET");
    const { data } = await axios.get(endPoint + "/api/v1/prefectures", {
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    setPrefecture(data.result);
  };

  console.log("array = ,", prefecture);
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getPrefectures}>GET</button>
        {prefecture.map((item) => {
          return <div key={`${item.prefName.toString()}`}>{item.prefName}</div>;
        })}
      </header>
    </div>
  );
};

export default App;
