import React, { useState } from 'react';
import axios from 'axios'

function Operation() {
  const [type, setType] = useState('');
  const [cost, setCost] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const handleAddOperation = async (e) => {
    e.preventDefault();
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/operation/create',  {
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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Add Operation</h2>
      <form onSubmit={handleAddOperation} className="mb-4">
        <label className="block mb-2">
         Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)}  className="form-input mt-1 block w-full" />
        </label>
        <label className="block mb-2">
         Cost:
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)}  className="form-input mt-1 block w-full" />
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