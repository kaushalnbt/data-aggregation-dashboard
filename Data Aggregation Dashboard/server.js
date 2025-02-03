const express = require('express');
const axios = require('axios');
const cors = require('cors');
const parseString = require('xml2js').parseString;

const app = express();
app.use(cors());

// Weather API (wttr.in)
const WEATHER_API = "https://wttr.in/London?format=%C+%t";

// Cryptocurrency API (CoinGecko)
const CRYPTO_API = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

// News API via RSS Feed (BBC News RSS feed)
const NEWS_API = "http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml";

// Joke API (Official Joke API)
const JOKE_API = "https://official-joke-api.appspot.com/random_joke";

app.get("/dashboard", async (req, res) => {
  try {
    const weatherPromise = axios.get(WEATHER_API).catch(error => {
      console.error('Error fetching weather data:', error);
      return { data: 'Error fetching weather data' };
    });
    const cryptoPromise = axios.get(CRYPTO_API);
    const newsPromise = axios.get(NEWS_API);
    const jokePromise = axios.get(JOKE_API);

    // Parse RSS feed for news data
    const [weather, crypto, newsResponse, joke] = await Promise.all([
      weatherPromise,
      cryptoPromise,
      newsPromise,
      jokePromise,
    ]);

    parseString(newsResponse.data, { mergeAttrs: true }, (err, result) => {
      if (err) {
        console.error('Error parsing news:', err);
        return res.status(500).json({ error: 'Error parsing news' });
      }

      const articles = result.rss.channel[0].item.slice(0, 5); // Get the first 5 articles

      res.json({
        weather: weather.data,
        crypto: crypto.data,
        news: articles,
        joke: joke.data,
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(5000, () => console.log("Dashboard API running on port 5000"));