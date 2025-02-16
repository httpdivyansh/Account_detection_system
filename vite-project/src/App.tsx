'use client';
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    profile_pic: "",
    ratio_numlen_username: "",
    len_fullname: "",
    ratio_numlen_fullname: "",
    sim_name_username: "",
    len_desc: "",
    extern_url: "",
    private: "",
    num_posts: "",
    num_followers: "",
    num_following: ""
  });

  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || 0, // Ensure numerical input
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setPrediction("");
    setError("");

    // Check if all inputs are zero or empty
    const isEmpty = Object.values(formData).every(value => value === 0 || value === '');

    if (isEmpty) {
      window.alert("⚠️ Please enter some data before checking!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);

      if (response.data.fake_account !== undefined) {
        setPrediction(response.data.fake_account ? '🚨 Fake Account Detected!' : '✅ Real Account');
      } else {
        setError('Error: Invalid response from server.');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      setError('Error: Could not reach the server.');
    }
  };

  return (
    <div className="bg-[#27445D] min-h-screen flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Fake Account Detection</h1>

      <div className="bg-[#71BBB2] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="w-full">
              <label className="block">
                {key.replace(/_/g, ' ').toUpperCase()}:
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="text-black border p-2 w-full rounded-md"
                />
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Check Account
          </button>
        </div>

        {prediction && <h3 className="mt-4 text-lg font-bold text-center">{prediction}</h3>}
        {error && <h3 className="mt-4 text-lg font-bold text-red-500 text-center">{error}</h3>}
      </div>
    </div>
  );
};

export default App;
