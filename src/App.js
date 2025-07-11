import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import axios from 'axios';
import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import './App.css';

import Search from './components/search';


function App() {
  const [empId, setEmpId] = useState('');
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // NEW


const [page, setPage] = useState(0);
const [size, setSize] = useState(5);
const [sortField, setSortField] = useState("date");
const [sortDir, setSortDir] = useState("desc");
const [totalPages, setTotalPages] = useState(1);
const [totalElements, setTotalElements] = useState(0);



  // Automatically choose local or deployed backend
  const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api/emp'
    : 'https://employee-check-in-out-be.onrender.com/api/emp';

  
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: 'px-4 py-2 rounded-md bg-[#0077cc] text-white hover:bg-[#005fa3]',
        cancelButton: 'px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400',
        actions: 'flex gap-4 justify-center'  // <-- THIS adds spacing!
      },
      buttonsStyling: false
    });
    
    
    

  // const handleCheckIn = async () => {
  //   const cleanId = empId.trim().toUpperCase();
  //   if (!cleanId) {
  //     alert("Please enter the Employee ID.");
  //     return;
  //   }
    
  //   try {
  //     // ✅ Send employeeId not id
  //     const res = await axios.post(`${API_URL}/checkIn`, { employeeId: cleanId });
  //     alert(`Checked In: ${JSON.stringify(res.data)}`);
  //     fetchAll();
  //   } catch (err) {
  //     console.error(err);
  //     alert(`Error: ${err.message}`);
  //   }
  // };

  // const handleCheckOut = async () => {
  //   const cleanId = empId.trim().toUpperCase();
  //   if (!cleanId) {
  //     alert("Please enter the Employee ID.");
  //     return;
  //   }
    
  //   try {
  //     // ✅ Send employeeId not id
  //     const res = await axios.post(`${API_URL}/checkOut`, { employeeId: cleanId });
  //     alert(`Checked Out: ${JSON.stringify(res.data)}`);
  //     fetchAll();
  //   } catch (err) {
  //     console.error(err);
  //     alert(`Error: ${err.message}`);
  //   }
  // };



  const handleCheckIn = async () => {
    const cleanId = empId.trim().toUpperCase();
    if (!cleanId) {
      Swal.fire({ 
        icon: 'warning',
        title: 'Missing ID',
        text: 'Please enter the Employee ID.',
        customClass: {
          popup: 'rounded-[15px] p-8 font-sans',
          title: 'text-[#0077cc] font-bold',
          htmlContainer: 'text-[16px] text-gray-800',
          confirmButton: 'bg-[#0077cc] text-white rounded-md px-5 py-2 !important'
        }
        
      });
      return;
    }
  
    try {
      const res = await axios.post(`${API_URL}/checkIn`, { employeeId: cleanId });
      // Show SweetAlert with ID & Check-In time
      Swal.fire({
        icon: 'success',
        title: 'Check-In Successful!',
        html: `<b>Employee ID:</b> ${res.data.employeeId}<br>
              <b>Check-In Time:</b> ${res.data.checkIn}`,
              customClass: {
                popup: 'rounded-[15px] p-8 font-sans',
                title: 'text-[#0077cc] font-bold',
                htmlContainer: 'text-[16px] text-gray-800',
                confirmButton: 'bg-[#0077cc] text-white rounded-md px-5 py-2 !important'
              }
              
      });
      fetchAll();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });
    }
  };
  
  const handleCheckOut = async () => {
    const cleanId = empId.trim().toUpperCase();
    if (!cleanId) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing ID',
        text: 'Please enter the Employee ID.',
        customClass: {
          popup: 'rounded-[15px] p-8 font-sans',
          title: 'text-[#0077cc] font-bold',
          htmlContainer: 'text-[16px] text-gray-800',
          confirmButton: 'bg-[#0077cc] text-white rounded-md px-5 py-2 !important'
        }
        
      });
      return;
    }
  
    try {
      const res = await axios.post(`${API_URL}/checkOut`, { employeeId: cleanId });
      // Show SweetAlert with ID & Check-Out time
      Swal.fire({
        icon: 'success',
        title: 'Check-Out Successful!',
        html: `<b>Employee ID:</b> ${res.data.employeeId}<br>
              <b>Check-Out Time:</b> ${res.data.checkOut}`,
              customClass: {
                popup: 'rounded-[15px] p-8 font-sans',
                title: 'text-[#0077cc] font-bold',
                htmlContainer: 'text-[16px] text-gray-800',
                confirmButton: 'bg-[#0077cc] text-white rounded-md px-5 py-2 !important'
              }
              
      });
      fetchAll();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });
    }
  };
  

  // const fetchAll = useCallback(async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/findAll`);
  //     setEmployees(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [API_URL]); // include any used vars
  
  // useEffect(() => {
  //   fetchAll();
  // }, [fetchAll]);


  const fetchAll = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/findAll`, {
        params: { page, size, sortField, sortDir, searchTerm }
      });
      setEmployees(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements); // ✅ Add this
    } catch (err) {
      console.error(err);
    }
  }, [API_URL, page, size, sortField, sortDir, searchTerm]);


  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // const handleDelete = async (id) => {
    
  //   if (window.confirm("Are you sure?")) {
  //     try {
  //       await axios.delete(`${API_URL}/delete/${id}`);
  //       fetchAll();
  //     } catch (err) {
  //       console.error(err);
  //       alert("Delete failed");
  //     }
  //   }
  // };

  const handleDelete = async (id) => {
    const emp = employees.find(e => e.id === id);
    const empIdToDelete = emp ? emp.employeeId : 'Unknown';
  
    swalWithTailwindButtons.fire({
      title: 'Are you sure?',
      html: `You are about to delete <b>Employee ID:</b> ${empIdToDelete}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-[15px] p-8 font-sans',         // Rounded + padding + font
        title: 'text-[#0077cc] font-bold',             // Blue title
        htmlContainer: 'text-[16px] text-gray-800',    // Content text
        actions: 'flex gap-4 justify-center',          // Space between buttons
        confirmButton: 'px-4 py-2 rounded-md bg-[#0077cc] text-white hover:bg-[#005fa3]',
        cancelButton: 'px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400'
      },
      buttonsStyling: false
      
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/delete/${id}`);
          fetchAll();
          swalWithTailwindButtons.fire({
            icon: 'success',
            title: 'Deleted!',
            html: `Employee ID: <b>${empIdToDelete}</b> has been deleted.`,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            customClass: {
              popup: 'rounded-[15px] p-8 font-sans',
              title: 'text-[#0077cc] font-bold',
              htmlContainer: 'text-[16px] text-gray-800',
              confirmButton: 'px-4 py-2 rounded-md bg-[#0077cc] text-white hover:bg-[#005fa3]'
            }
          });
        } catch (err) {
          console.error(err);
          swalWithTailwindButtons.fire({
            icon: 'error',
            title: 'Delete failed',
            text: err.message,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            customClass: {
              popup: 'rounded-[15px] p-8 font-sans',
              title: 'text-[#0077cc] font-bold',
              htmlContainer: 'text-[16px] text-gray-800',
              confirmButton: 'px-4 py-2 rounded-md bg-[#0077cc] text-white hover:bg-[#005fa3]'
            }
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithTailwindButtons.fire({
          icon: 'error',
          title: 'Cancelled',
          text: 'Deletion cancelled.',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          customClass: {
            popup: 'rounded-[15px] p-8 font-sans',
            title: 'text-[#0077cc] font-bold',
            htmlContainer: 'text-[16px] text-gray-800',
            confirmButton: 'px-4 py-2 rounded-md bg-[#0077cc] text-white hover:bg-[#005fa3]'
          }
        });
      }
    });
  };
  
  
  
 // NEW: filter employees by search term
//  const filteredEmployees = employees.filter(emp =>
//   emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
// );

  return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center mb-6">
            Employee Check In/Out
          </h2>
    
          {/* Actions: input + buttons + search */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-5">
            <input 
              type="text" 
              placeholder="Enter Employee ID" 
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              required
              className="px-4 py-2 w-full sm:w-48 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleCheckIn}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Check In
            </button>
            <button 
              onClick={handleCheckOut}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Check Out
            </button>
            <Search 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full sm:w-auto"
            />
          </div>
    
          <h3 className="text-lg font-semibold mb-3">All Records:</h3>
    
          {/* Table with horizontal scroll on small screens */}
          <div className="overflow-x-auto max-h-[400px] border rounded-md">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-4 border">Employee ID</th>
                  {/* <th className="py-3 px-4 border">Date</th> */}
                  
                <th
  className="py-3 px-4 border cursor-pointer hover:bg-blue-700"
  onClick={() => {
    if (sortField === "date") {
      setSortDir(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField("date");
      setSortDir("asc"); // default when changing field
    }
  }}
>
  Date
  {sortField === "date" && (
    <span className="ml-1">{sortDir === "asc" ? "⬆️" : "⬇️"}</span>
  )}
</th>

                  <th className="py-3 px-4 border">Check In</th> 
                  <th className="py-3 px-4 border">Check Out</th>
                  <th className="py-3 px-4 border">Status</th>
                  <th className="py-3 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={`${emp.id}-${emp.date}`} className="even:bg-gray-100">
                    <td className="py-2 px-4 border">{emp.employeeId}</td>
                    <td className="py-2 px-4 border">{emp.date}</td>
                    <td className="py-2 px-4 border">{emp.checkIn}</td>
                    <td className="py-2 px-4 border">{emp.checkOut}</td>
                    <td className="py-2 px-4 border">
                      {emp.checkOut ? (
                        <span className="text-red-600 font-semibold">Checked Out</span>
                      ) : (
                        <span className="text-green-600 font-semibold">In Office</span>
                      )}
                    </td>
                    <td className="py-2 px-4 border">
                      <button 
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                        onClick={() => handleDelete(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


         {/* Pagination Controls */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
  
  {/* Left: Pagination Buttons */}
  <div className="flex items-center gap-3 justify-center sm:justify-start">
    <button
      disabled={page === 0}
      onClick={() => setPage(prev => Math.max(prev - 1, 0))}
      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      ⬅ Prev
    </button>
    <span className="text-gray-700 font-medium">
      Page <span className="text-blue-600">{page + 1}</span> of <span className="text-blue-600">{totalPages}</span>
    </span>
    <button
      disabled={page >= totalPages - 1}
      onClick={() => setPage(prev => prev + 1)}
      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      Next ➡
    </button>
  </div>

  {/* Right: Page Size + Total Count */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-end">
    <div className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-sm text-gray-700">Rows per page:</label>
      <select
        id="pageSize"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
    <div className="text-sm text-gray-600 text-center sm:text-right">
      Total: <span className="font-semibold text-blue-600">{totalElements}</span> records
    </div>
  </div>
</div>

        </div>
      </div>
    );
    
}

export default App;
