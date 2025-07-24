import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';

// Firebase configuration loaded from environment variables
// This is the standard practice for a React app developed outside the Canvas.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// For the Canvas environment, the appId and initialAuthToken are provided globally.
// If you are running this code within the Canvas, you should prefer the global variables
// as they are automatically injected and managed by the environment.
// The __app_id is used for Firestore pathing and is distinct from firebaseConfig.appId.
const appId = typeof __app_id !== 'undefined' ? __app_id : firebaseConfig.appId; // Use Canvas appId if available, else from .env
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Main App component
function App() {
  // Firebase state variables
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false); // To ensure auth is ready before Firestore ops

  // State for raw car data from Firestore
  const [carListings, setCarListings] = useState([]);
  // State for displaying filtered car data
  const [filteredCarData, setFilteredCarData] = useState([]);

  // UI state variables
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Set to true initially for Firebase loading
  const [error, setError] = useState(null);

  // Filter states for the sidebar
  const [filterYear, setFilterYear] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterMerk, setFilterMerk] = useState('');
  const [filterPriceFrom, setFilterPriceFrom] = useState('');
  const [filterPriceTo, setFilterPriceTo] = useState('');

  // 1. Initialize Firebase and Authenticate
  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const firebaseAuth = getAuth(app);

      setDb(firestore);
      setAuth(firebaseAuth);

      // Listen for auth state changes
      const unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          // Sign in anonymously if no user is authenticated
          try {
            if (initialAuthToken) {
              await signInWithCustomToken(firebaseAuth, initialAuthToken);
            } else {
              await signInAnonymously(firebaseAuth);
            }
            setUserId(firebaseAuth.currentUser?.uid || crypto.randomUUID()); // Fallback for anonymous
          } catch (authError) {
            console.error("Firebase authentication error:", authError);
            setError(`Authentication failed: ${authError.message}`);
          }
        }
        setIsAuthReady(true); // Auth process is complete
      });

      return () => unsubscribeAuth(); // Cleanup auth listener
    } catch (initError) {
      console.error("Firebase initialization error:", initError);
      setError(`Firebase initialization failed: ${initError.message}`);
      setIsLoading(false);
    }
  }, []);

  // 2. Fetch data from Firestore once authentication is ready
  useEffect(() => {
    if (db && isAuthReady) {
      const carListingsCollectionRef = collection(db, `artifacts/${appId}/public/data/carListings`);
      const q = query(carListingsCollectionRef);

      const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
        const listings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCarListings(listings);
        setIsLoading(false); // Data loaded
      }, (firestoreError) => {
        console.error("Firestore data fetch error:", firestoreError);
        setError(`Failed to load car listings: ${firestoreError.message}`);
        setIsLoading(false);
      });

      return () => unsubscribeFirestore(); // Cleanup Firestore listener
    }
  }, [db, isAuthReady, appId]); // Depend on db and isAuthReady

  // 3. Apply filters whenever filter states or carListings change
  useEffect(() => {
    applyFilters();
  }, [carListings, filterYear, filterName, filterMerk, filterPriceFrom, filterPriceTo]);

  // Function to clean and convert price string to a number for comparison
  const parsePrice = (priceString) => {
    if (!priceString || priceString === 'Price Not Specified' || priceString === 'Price Negotiable') {
      return null;
    }
    // Remove "Rp", dots, commas, and "juta", "ribu" then convert to number
    let cleanedPrice = priceString.replace(/Rp\s*/i, '').replace(/\./g, '').replace(/,/g, '');
    if (cleanedPrice.toLowerCase().includes('juta')) {
      cleanedPrice = parseFloat(cleanedPrice.replace(/juta/i, '').trim()) * 1_000_000;
    } else if (cleanedPrice.toLowerCase().includes('ribu')) {
      cleanedPrice = parseFloat(cleanedPrice.replace(/ribu/i, '').trim()) * 1_000;
    } else {
      cleanedPrice = parseFloat(cleanedPrice);
    }
    return isNaN(cleanedPrice) ? null : cleanedPrice;
  };

  // Function to apply filters to the carListings data
  const applyFilters = () => {
    let tempFilteredData = [...carListings]; // Start with all loaded data

    // Filter by Year
    if (filterYear) {
      const yearNum = parseInt(filterYear);
      if (!isNaN(yearNum)) {
        tempFilteredData = tempFilteredData.filter(car => car.year === yearNum);
      }
    }

    // Filter by Name (case-insensitive partial match)
    if (filterName) {
      const lowerFilterName = filterName.toLowerCase();
      tempFilteredData = tempFilteredData.filter(car =>
        car.name && car.name.toLowerCase().includes(lowerFilterName)
      );
    }

    // Filter by Merk (case-insensitive partial match)
    if (filterMerk) {
      const lowerFilterMerk = filterMerk.toLowerCase();
      tempFilteredData = tempFilteredData.filter(car =>
        car.merk && car.merk.toLowerCase().includes(lowerFilterMerk)
      );
    }

    // Filter by Price Range
    const priceFromNum = parsePrice(filterPriceFrom);
    const priceToNum = parsePrice(filterPriceTo);

    if (priceFromNum !== null) {
      tempFilteredData = tempFilteredData.filter(car => {
        const carPrice = parsePrice(car.price);
        return carPrice !== null && carPrice >= priceFromNum;
      });
    }
    if (priceToNum !== null) {
      tempFilteredData = tempFilteredData.filter(car => {
        const carPrice = parsePrice(car.price);
        return carPrice !== null && carPrice <= priceToNum;
      });
    }

    setFilteredCarData(tempFilteredData);
  };

  // Function to handle changes in the YouTube URL input field
  const handleUrlChange = (event) => {
    setYoutubeUrl(event.target.value);
  };

  // Function to handle the "Crawl Information" button click
  const handleCrawlClick = async () => {
    setError(null);
    // In a real application, this would trigger a backend function (e.g., Google Cloud Function)
    // to actually crawl the YouTube video and save the extracted data to Firestore.
    // For this demonstration, we'll just simulate a loading state and then re-apply filters
    // to show the current data in Firestore.
    setIsLoading(true);
    console.log(`Simulating crawl for: ${youtubeUrl}`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    applyFilters(); // Re-apply filters to reflect any potential new data from a real crawl
    setIsLoading(false);
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
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
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
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
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
              value={filterMerk}
              onChange={(e) => setFilterMerk(e.target.value)}
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
                value={filterPriceFrom}
                onChange={(e) => setFilterPriceFrom(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                id="price-to"
                placeholder="To"
                value={filterPriceTo}
                onChange={(e) => setFilterPriceTo(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          {/* Apply Filters Button (triggers useEffect via state changes) */}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
        {userId && (
          <p className="mt-4 text-xs text-gray-500 break-all">
            User ID: {userId}
          </p>
        )}
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-4 md:p-6">
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-800 mb-4">
            YouTube Car Information Extractor
          </h1>
          <p className="text-gray-600 mb-6">
            Paste a YouTube video URL here. Data is now loaded from Firestore.
            **Note: Direct data extraction from YouTube requires a backend service (e.g., Google Cloud Function)
            to interact with the YouTube Data API and save to Firestore.**
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
              {isLoading ? 'Loading Data...' : 'Simulate Crawl & View Data'}
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
              <p className="ml-4 text-lg text-indigo-700">Loading car listings from Firestore...</p>
            </div>
          )}

          {/* Car Listings Grid View */}
          {!isLoading && filteredCarData.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-2">
                Available Car Listings ({filteredCarData.length} results)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCarData.map((car) => (
                  <div key={car.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name} ({car.year || 'N/A'})</h3>
                    <p className="text-lg text-indigo-600 font-semibold mb-2">{car.price}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Merk:</span> {car.merk || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Tax:</span> {car.tax || 'N/A'}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Source:</span> {car.source?.name || 'N/A'}
                      </p>
                      {car.youtube_video_link && (
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Video:</span> <a href={car.youtube_video_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">
                            {car.youtube_video_link.includes('v=') ? car.youtube_video_link.split('v=')[1].substring(0, 10) + '...' : car.youtube_video_link.substring(0, 10) + '...'}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && filteredCarData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No car information found matching your filters.</p>
              {carListings.length === 0 && !error && (
                <p className="mt-2">The database is currently empty. You would need a backend service to populate it with data from YouTube videos.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;