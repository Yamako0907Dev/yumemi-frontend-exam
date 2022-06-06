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
        data: [1, 2, 3],
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        {prefecture.map((item: Prefectures) => {
          return (
            <CheckBox
              key={`${item.prefName.toString()}`}
              prefName={item.prefName}
            ></CheckBox>
          );
        })}
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          ></HighchartsReact>
        </div>
      </header>
    </div>
  );
};

export default App;
