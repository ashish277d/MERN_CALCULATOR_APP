import { useState } from "react";
import axios from 'axios'
import {API_BASE_URL} from '../Config'

const Body= ()=> {

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');

    const [currentOperation, setCurrentOperation] = useState('addition');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [squareRoot, setSquareRoot] = useState(null);
    const [randomString, setRandomString] = useState(null);
  
    const performOperation = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/operation/${currentOperation}`, {
          num1: input1,
          num2: input2,
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
        setOutput(response.data.result);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    const handleSquareRoot = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(`${API_BASE_URL}/api/operation/square_root`, {
            num: event.target.number.value,
          },{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }});
          setSquareRoot(response.data.result);
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleRandomString = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(`${API_BASE_URL}/api/operation/random`,{},{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }});
          setRandomString(response.data.result);
        } catch (error) {
          console.error(error);
        }
      };
  
    return (
      <div className="bg-white rounded-sm shadow-sm p-6 w-30">
        <h1 className="text-4xl font-bold mb-4">Calculator</h1>
        <div className="flex items-center space-x-4 mb-4">
          <input
            className="w-24 p-2 rounded border border-gray-400"
            type="number"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <select
            className="w-24 p-2 rounded border border-gray-400"
            value={currentOperation}
            onChange={(e) => setCurrentOperation(e.target.value)}
          >
            <option value="addition">+</option>
            <option value="substraction">-</option>
            <option value="multiplication">*</option>
            <option value="division">/</option>
          </select>
          <input
            className="w-24 p-2 rounded border border-gray-400"
            type="number"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <button
            className="p-2 rounded bg-blue-500 text-white"
            onClick={performOperation}
          >
            Perform Operation
          </button>
        </div>
        <div className="flex flex-col">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {output && (
            <div className="text-green-500 font-bold mb-4">
              Result: {output}
            </div>
          )}
        </div>
    <div className="p-2 mb-4">
      <h1 className="text-4xl font-bold mb-4" >Square Root Calculator</h1>
      <form onSubmit={handleSquareRoot}>
        <input className="w-24 p-2 rounded border border-gray-400" type="number" name="number" />
        <button className="p-2 rounded bg-blue-500 text-white" type="submit">Calculate</button>
      </form>
      {squareRoot && (
      <div className="text-green-500 font-bold mb-4">
      Square Root: {squareRoot}
      </div>
      )}

      <h1 className="text-4xl font-bold mb-4" >Random String Generator</h1>
      <button className="W-24 p-2 rounded bg-blue-500 text-white" onClick={handleRandomString}>Generate</button>
      {squareRoot && (
      <div className="text-green-500 font-bold mb-4">
      Random String: {randomString}
      </div>
      )}
    </div>
      </div>
    );

}

export default Body;