/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { CheckBox } from "./components/CheckBox";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const endPoint = "https://opendata.resas-portal.go.jp";
const apiKey = process.env.REACT_APP_RESAS_API_KEY;

interface Prefectures {
  prefCode: number;
  prefName: string;
}

const App = () => {
  const [prefecture, setPrefecture] = useState<Prefectures[]>([]);

  useEffect(() => {
    const getPrefectures = async () => {
      if (!apiKey) return;
      const { data } = await axios.get(endPoint + "/api/v1/prefectures", {
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      setPrefecture(data.result);
    };
    getPrefectures();
  }, []);

  const options = {
    title: {
      text: "My chart",
    },
    series: [
      {
        name: "Jane",
        data: [1, 0, 4],
      },
      {
        name: "John",
        data: [5, 7, 3],
      },
    ],
  };

  return (
    <div css={{ margin: "20px" }}>
      <header>
        <h2>Title</h2>
      </header>
      <div className="App-body">
        <div
          css={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {prefecture.map((item: Prefectures) => {
            return (
              <CheckBox
                key={`${item.prefName.toString()}`}
                prefName={item.prefName}
              ></CheckBox>
            );
          })}
        </div>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          ></HighchartsReact>
        </div>
      </div>
    </div>
  );
};

export default App;
