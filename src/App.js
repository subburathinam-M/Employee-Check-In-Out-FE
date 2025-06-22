import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [empId, setEmpId] = useState('');
  const [employees, setEmployees] = useState([]);

  // const API_URL = 'http://localhost:8080/api/emp'; // adjust port if needed

  const API_URL = 'https://employee-check-in-out-be.onrender.com/api/emp';


  const handleCheckIn = async () => {
    try {
      const res = await axios.post(`${API_URL}/checkIn`, { id: empId });
      alert(`Checked In: ${JSON.stringify(res.data)}`);
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await axios.post(`${API_URL}/checkOut`, { id: empId });
      alert(`Checked Out: ${JSON.stringify(res.data)}`);
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAll = async () => {
    try {
      const res = await axios.get(`${API_URL}/findAll`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Check In/Out</h2>
      <input 
        type="text" 
        placeholder="Enter Employee ID" 
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
      />
      <button onClick={handleCheckIn}>Check In</button>
      <button onClick={handleCheckOut}>Check Out</button>

      <h3>All Records:</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={`${emp.id}-${emp.date}`}>
              <td>{emp.id}</td>
              <td>{emp.date}</td>
              <td>{emp.checkIn}</td>
              <td>{emp.checkOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
