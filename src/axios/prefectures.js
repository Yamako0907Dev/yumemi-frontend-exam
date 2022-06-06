import axios from "axios";

const endPoint = "https://opendata.resas-portal.go.jp";
const apiKey = process.env.REACT_APP_RESAS_API_KEY;

// interface Prefectures {
//   message?: string;
//   result: ResultProps[];
// }

// interface ResultProps {
//   prefCode: number;
//   prefName: string;
// }

export const getPrefectures = async () => {
  console.log("GET");
  const { data } = await axios.get(endPoint + "/api/v1/prefectures", {
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return data;
};
