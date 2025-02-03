import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/dashboard");
      setData(response.data);
      setError(null); // Clear previous errors
    } catch (error) {
      setError("Error fetching data");
      setData(null); // Clear data if error occurs
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Dashboard</h1>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full mb-6"
          onClick={fetchData}
        >
          Refresh Data
        </button>

        {loading ? (
          <p className="text-center text-lg font-semibold text-gray-600">Loading data...</p>
        ) : error ? (
          <p className="text-center text-lg font-semibold text-red-600">{error}</p>
        ) : (
          <div className="space-y-6">
            {/* Weather Section */}
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-700">🌤 Weather</h2>
              <p className="text-lg mt-2">Condition: <span className="font-medium">{data.weather}</span></p>
            </div>

            {/* Cryptocurrency Section */}
            <div className="bg-green-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-700">💰 Cryptocurrency</h2>
              <p className="text-lg mt-2">Bitcoin: <span className="font-medium">${data.crypto.bitcoin.usd}</span></p>
              <p className="text-lg mt-2">Ethereum: <span className="font-medium">${data.crypto.ethereum.usd}</span></p>
            </div>

            {/* News Section */}
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-yellow-700">📰 News</h2>
              <ul className="space-y-3 mt-2">
                {data.news.map((article, i) => (
                  <li key={i} className="text-md font-medium text-gray-800">{article.title}</li>
                ))}
              </ul>
            </div>

            {/* Joke Section */}
            <div className="bg-purple-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-purple-700">😂 Joke</h2>
              <p className="text-lg mt-2">{data.joke.setup}</p>
              <p className="text-lg mt-2 font-bold">{data.joke.punchline}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;