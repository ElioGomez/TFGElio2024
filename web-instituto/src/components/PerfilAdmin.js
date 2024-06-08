import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminForm = () => {
  const [padres, setPadres] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [selectedPadre, setSelectedPadre] = useState('');
  const [selectedAsignatura1, setSelectedAsignatura1] = useState('');
  const [selectedAsignatura2, setSelectedAsignatura2] = useState('');

  useEffect(() => {
    // Fetch padres DNIs
    axios.get('http://localhost:4567/api/padres')
      .then(response => {
        setPadres(response.data);
      })
      .catch(error => {
        console.error('Error fetching padres:', error);
      });

    // Fetch asignaturas
    axios.get('http://localhost:4567/api/asignaturas')
      .then(response => {
        setAsignaturas(response.data);
      })
      .catch(error => {
        console.error('Error fetching asignaturas:', error);
      });
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      
      <div>
        <label htmlFor="padres">Select Padre DNI:</label>
        <select
          id="padres"
          value={selectedPadre}
          onChange={e => setSelectedPadre(e.target.value)}
        >
          <option value="">Select DNI</option>
          {padres.map((dni, index) => (
            <option key={index} value={dni}>
              {dni}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="asignaturas1">Select Asignatura 1:</label>
        <select
          id="asignaturas1"
          value={selectedAsignatura1}
          onChange={e => setSelectedAsignatura1(e.target.value)}
        >
          <option value="">Select Asignatura</option>
          {asignaturas.map((asignatura, index) => (
            <option key={index} value={asignatura}>
              {asignatura}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="asignaturas2">Select Asignatura 2:</label>
        <select
          id="asignaturas2"
          value={selectedAsignatura2}
          onChange={e => setSelectedAsignatura2(e.target.value)}
        >
          <option value="">Select Asignatura</option>
          {asignaturas.map((asignatura, index) => (
            <option key={index} value={asignatura}>
              {asignatura}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AdminForm;
