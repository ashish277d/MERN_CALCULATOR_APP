import { useEffect, useState } from "react";
import axios from "axios";

const Record = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/records/getRecords`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRecords(response.data.operations);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecords();
  }, []);


  const handleDelete = (recordId) => {
    axios
      .delete(`http://localhost:5001/api/records/${recordId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        // Remove the record from the records list
        setRecords(records.filter((record) => record.id !== recordId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Operaion</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Balance</th>
            <th className="px-4 py-2">Response</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="border px-4 py-2">{record.id}</td>
              <td className="border px-4 py-2">{record.type}</td>
              <td className="border px-4 py-2">{record.amount}</td>
              <td className="border px-4 py-2">{record.user_balance}</td>
              <td className="border px-4 py-2">{record.operation_response}</td>
              <td className="border px-4 py-2">{record.date}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(record.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Record;
