// sampleData.js

const SAMPLE_MARKET = {
  id: "munsan-free-market",
  name: "문산자유시장",
  mapUrl: "/MunsanMarketMap.png",
  shops: [
    {
      id: "101",
      name: "산타파",
      category: "식당",
      status: "입점",
      x: 3.3,
      y: 15.5,
      w: 5.5,
      h: 4.2,
      memo: "좌상단 독립 점포"
    },
    {
      id: "102",
      name: "육덕",
      category: "정육",
      status: "공실",
      x: 10.2,
      y: 6.8,
      w: 4.5,
      h: 3.2
    },
    {
      id: "141",
      name: "창고",
      category: "창고",
      status: "보수중",
      x: 12.9,
      y: 54.6,
      w: 6,
      h: 10.5
    }
  ]
};

export default SAMPLE_MARKET;
