import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { SelectTravellersList, SelectBudgetOptions } from '../constants/options';
import { AI_PROMPT } from '../constants/options';
import { chatSession } from '../service/AIModal';  
import { AuthContext } from '../contexts/AuthContext';  
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';  
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';

function CreateTrip() {
  const { user, setUser } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [tripDays, setTripDays] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedTraveler, setSelectedTraveler] = useState('');
  const [formData, setFormData] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        navigate('/signin'); 
      }
    }
  }, [user, navigate, setUser]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const { data } = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json`,
          {
            params: {
              access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
              autocomplete: true,
              limit: 5,
            },
          }
        );
        setSuggestions(data.features || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setSelectedPlace(place);
    setQuery(place.place_name);
    setSuggestions([]);
    setFormData({ ...formData, location: place });
  };

  const handleDaysChange = (e) => {
    setTripDays(e.target.value);
    setFormData({ ...formData, noOfDays: e.target.value });
  };

  const OnGenerateTrip = async () => {
    if (isGenerating) return;
    if (!user) {
      return;
    }

    if (!formData.noOfDays || !formData.location || !formData.budget) {
      console.log("Please fill all details");
      return;
    }

    const SaveAiTrip = async (TripData) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId
      });

      navigate('/view-trip/' + docId);
    };

    setIsGenerating(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.place_name)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-5">
      <div className="w-full max-w-4xl bg-white p-10 rounded-xl shadow-md">
        <h2 className="font-bold text-3xl text-center">Plan Your Trip</h2>
        <p className="mt-3 text-gray-500 text-xl text-center">
          Provide your preferences, and we will create a personalized itinerary.
        </p>

        <div className="mt-10 flex flex-col gap-10 items-center w-full">
          {/* Destination */}
          <div className="w-full">
            <h2 className="text-xl font-medium text-center">Destination</h2>
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              className="border rounded-lg px-4 py-2 w-full text-center"
              placeholder="Search for a destination..."
            />
            {suggestions.length > 0 && (
              <ul className="bg-white border rounded-lg mt-2 shadow-lg w-full">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(suggestion)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Trip Duration */}
          <div className="w-full">
            <h2 className="text-xl font-medium text-center">Trip Duration</h2>
            <input
              type="number"
              value={tripDays}
              onChange={handleDaysChange}
              className="border rounded-lg px-4 py-2 w-full text-center"
              placeholder="Enter number of days"
            />
          </div>

          {/* Budget Selection */}
          <div className="w-full">
            <h2 className="text-xl font-medium text-center">What is Your Budget?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border rounded-lg text-center cursor-pointer hover:shadow-lg ${
                    selectedBudget === item.title ? 'border-black' : ''
                  }`}
                  onClick={() => {
                    setSelectedBudget(item.title);
                    setFormData({ ...formData, budget: item.title });
                  }}
                >
                  <h2 className="text-4xl mb-2">{item.icon}</h2>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        
        {/* Members Selection */}
          <div className="w-full">
  <h2 className="text-xl font-medium text-center">Who do you plan on traveling with?</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-5">
    {SelectTravellersList.map((item) => (
      <div
        key={item.id}
        className={`p-4 border rounded-lg text-center cursor-pointer hover:shadow-lg ${
          selectedTraveler === item.title ? 'border-black' : ''
        }`}
        onClick={() => {
          setSelectedTraveler(item.title);
          setFormData({ ...formData, traveler: item.title });
        }}
      >
        <h2 className="text-4xl mb-2">{item.icon}</h2>
        <h3 className="font-bold text-lg">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.desc}</p>
      </div>
    ))}
  </div>
</div>


          {/* Submit Button */}
          <div className="flex justify-center w-full">
            <button
              onClick={OnGenerateTrip}
              disabled={isGenerating}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {isGenerating ? 'Generating...' : 'Generate Trip'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
