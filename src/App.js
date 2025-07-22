import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
   // State to hold the YouTube URL input by the user
  const [youtubeUrl, setYoutubeUrl] = useState('');
  // State to hold the extracted car data (will be populated from backend)
  const [carData, setCarData] = useState([]);
  // State to manage loading status during API calls
  const [isLoading, setIsLoading] = useState(false);
  // State to hold any error messages
  const [error, setError] = useState(null);

  // Function to handle changes in the YouTube URL input field
  const handleUrlChange = (event) => {
    setYoutubeUrl(event.target.value);
  };

  // Function to handle the "Crawl Information" button click
  const handleCrawlClick = async () => {
    // Clear previous errors and set loading state
    setError(null);
    setIsLoading(true);
    setCarData([]); // Clear previous data

    // Basic validation for YouTube URL
    if (!youtubeUrl || !youtubeUrl.includes('youtube.com/watch?v=')) {
      setError('Please enter a valid YouTube video URL.');
      setIsLoading(false);
      return;
    }

    try {
      // In a real application, you would replace this with your Google Cloud Function URL
      // For now, we'll simulate a fetch operation.
      console.log(`Attempting to crawl: ${youtubeUrl}`);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // --- Placeholder for actual API call to your Google Cloud Function ---
      // const response = await fetch('YOUR_GOOGLE_CLOUD_FUNCTION_URL', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ url: youtubeUrl }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to crawl information.');
      // }

      // const data = await response.json();
      // setCarData(data.cars); // Assuming the backend returns an object with a 'cars' array

      // --- Mock data for demonstration ---
      const mockData = [
        {
          id: 'car1',
          name: 'Toyota Avanza',
          year: 2015,
          price: 'Rp 114,900,000',
          tax: 'Included',
          source: {
            name: 'Kacung Motor',
            location: 'Tulungagung',
            description: 'Affordable used cars',
            phone_number: '081234567890',
          },
        },
        {
          id: 'car2',
          name: 'Honda Brio',
          year: 2018,
          price: 'Rp 135,000,000',
          tax: 'Not specified',
          source: {
            name: 'Kacung Motor',
            location: 'Tulungagung',
            description: 'Affordable used cars',
            phone_number: '081234567890',
          },
        },
        {
          id: 'car3',
          name: 'Suzuki Ertiga',
          year: 2020,
          price: 'Rp 195,000,000',
          tax: 'Tax off',
          source: {
            name: 'Kacung Motor',
            location: 'Tulungagung',
            description: 'Affordable used cars',
            phone_number: '081234567890',
          },
        },
      ];
      setCarData(mockData);
      // --- End Mock data ---

    } catch (err) {
      console.error("Crawl error:", err);
      setError(`Error: ${err.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Main container with responsive layout
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex flex-col md:flex-row">
      {/* Sidebar for filters and preferences */}
      <aside className="w-full md:w-1/4 bg-white p-6 shadow-lg rounded-lg m-4 md:mr-0 flex-shrink-0">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 border-b-2 border-indigo-200 pb-2">
          Filter Cars
        </h2>
        <div className="space-y-4">
          {/* Year Filter */}
          <div>
            <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Year:
            </label>
            <input
              type="number"
              id="year-filter"
              placeholder="e.g., 2015"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Name/Model Filter */}
          <div>
            <label htmlFor="name-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Model Name:
            </label>
            <input
              type="text"
              id="name-filter"
              placeholder="e.g., Avanza"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Make/Merk Filter */}
          <div>
            <label htmlFor="merk-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Make/Merk:
            </label>
            <input
              type="text"
              id="merk-filter"
              placeholder="e.g., Toyota"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range (Rp):
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                id="price-from"
                placeholder="From"
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                id="price-to"
                placeholder="To"
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          {/* Apply Filters Button */}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
            onClick={() => console.log('Apply Filters Clicked')} // Placeholder for filter logic
          >
            Apply Filters
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-4 md:p-6">
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-800 mb-4">
            YouTube Car Information Extractor
          </h1>
          <p className="text-gray-600 mb-6">
            Paste a YouTube video URL below to extract car listings and their details.
          </p>

          {/* URL Input and Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Paste YouTube video URL here (e.g., https://www.youtube.com/watch?v=FOAY5Q8DXpo)"
              className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              value={youtubeUrl}
              onChange={handleUrlChange}
            />
            <button
              onClick={handleCrawlClick}
              disabled={isLoading}
              className={`px-6 py-3 rounded-md font-semibold text-white shadow-md transition duration-300 ease-in-out
                ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isLoading ? 'Crawling...' : 'Crawl Information'}
            </button>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
              <p className="ml-4 text-lg text-indigo-700">Extracting data, please wait...</p>
            </div>
          )}

          {/* Car Listings Grid View */}
          {!isLoading && carData.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-2">
                Extracted Car Listings
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {carData.map((car) => (
                  <div key={car.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name} ({car.year})</h3>
                    <p className="text-lg text-indigo-600 font-semibold mb-2">{car.price}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Tax:</span> {car.tax || 'N/A'}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Source:</span> {car.source.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Location:</span> {car.source.location}
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Contact:</span> {car.source.phone_number || 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && carData.length === 0 && !error && (
            <div className="text-center py-8 text-gray-500">
              <p>No car information extracted yet. Paste a YouTube URL and click "Crawl Information" to begin!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

// You would typically include this in your public/index.html or a similar entry file
// to load Tailwind CSS and set up the viewport meta tag.
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Car Extractor</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        font-family: 'Inter', sans-serif;
      }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
</body>
</html>
*/