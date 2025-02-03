require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.WEATHER_KEY}&units=metric`;
// const CRYPTO_API = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";
// const NEWS_API = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_KEY}`;
// Free weather API (OpenWeatherMap alternative without API key)
const WEATHER_API = "https://wttr.in/London?format=%C+%t";

// Free crypto API (CoinGecko public API)
const CRYPTO_API = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

// Free news API (NewsAPI without API key, limited access)
const NEWS_API = "https://api.currentsapi.services/v1/latest-news?apiKey=public";

app.get("/dashboard", async (req, res) => {
  try {
    const [weather, crypto, news] = await Promise.all([
      axios.get(WEATHER_API),
      axios.get(CRYPTO_API),
      axios.get(NEWS_API),
    ]);

    res.json({
      weather: weather.data,
      crypto: crypto.data,
      news: news.data.articles.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(5000, () => console.log("Dashboard API running on port 5000"));
