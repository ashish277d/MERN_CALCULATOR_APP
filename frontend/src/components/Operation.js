import React, { useState } from 'react';
import axios from 'axios'
import {API_BASE_URL} from '../Config'

function Operation() {
  const [type, setType] = useState('');
  const [cost, setCost] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
 
  const handleAddOperation = async (e) => {
    e.preventDefault();
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/operation/create`,  {
        type: type,
        cost: cost,
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }});
        setResult(response.data.type);
    } catch (error) {
        setError(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="text-2xl font-bold mb-4">Add Operation</h2>
      <form onSubmit={handleAddOperation} className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
         Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)}  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </label>
        <label className="block text-sm font-medium text-gray-700">
         Cost:
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)}  className="fappearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </label>
        <button className="btn btn-primary" type="submit">Add Operation</button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {result && (
            <div className="text-green-500 font-bold mb-4">
              Result: Operation Added successfully
            </div>
          )}
    </div>
  );
}

export default Operation;