import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';

function App() {
  const [empId, setEmpId] = useState('');
  const [employees, setEmployees] = useState([]);

  // Automatically choose local or deployed backend
  const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api/emp'
    : 'https://employee-check-in-out-be.onrender.com/api/emp';

  const handleCheckIn = async () => {
    try {
      // ✅ Send employeeId not id
      const res = await axios.post(`${API_URL}/checkIn`, { employeeId: empId });
      alert(`Checked In: ${JSON.stringify(res.data)}`);
      fetchAll();
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleCheckOut = async () => {
    try {
      // ✅ Send employeeId not id
      const res = await axios.post(`${API_URL}/checkOut`, { employeeId: empId });
      alert(`Checked Out: ${JSON.stringify(res.data)}`);
      fetchAll();
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  const fetchAll = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/findAll`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [API_URL]); // include any used vars
  
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

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
            <th>_id</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={`${emp.id}-${emp.date}`}>
              <td>{emp.id}</td>
              <td>{emp.employeeId}</td>
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
