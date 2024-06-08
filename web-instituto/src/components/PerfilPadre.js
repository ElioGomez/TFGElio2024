import React, { useState, useEffect } from 'react';
import '../App.css';
import { useUserState } from '../context/UserContext';


const PerfilPadre = () => {
  const { userId, userType } = useUserState();

  const [alumnos, setAlumnos] = useState([
    { Nombre: 'Juan Pérez', Asignatura: 'Matemáticas', Dni: '90123456I', Nota: 5 },
    { Nombre: 'María López', Asignatura: 'Historia', Dni: '90123457J', Nota: 7 },
    { Nombre: 'Carlos García', Asignatura: 'Ciencias', Dni: '90123458K', Nota: 9 },
    { Nombre: 'Ana Torres', Asignatura: 'Geografía', Dni: '90123459L', Nota: 8 },
    { Nombre: 'Luis Martínez', Asignatura: 'Literatura', Dni: '90123460M', Nota: 6 },
  ]);
  const [sortOption, setSortOption] = useState('Nombre');
  const [viewOption, setViewOption] = useState('Todos');

 useEffect(() => {
  getUsers();
 },[])
  const getUsers = async ( ) => {

    try {
      const response = await fetch('http://192.168.0.23:8080/escuela/carga_hijos.jsp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dni: userId,
          tipo_usuario: userType
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        if (data["resultado"] === 1)
        {
              
        }
       
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const sortAlumnos = (a, b) => {
    if (sortOption === 'Nota') {
      return b.Nota - a.Nota;
    } else if (sortOption === 'Asignatura') {
      return a.Asignatura.localeCompare(b.Asignatura);
    } else {
      return a.Nombre.localeCompare(b.Nombre);
    }
  };

  const handleView = () => {
    const dni = prompt("Ingrese el DNI del alumno que desea ver:");
    if (dni) {
      setViewOption(dni);
    } else {
      alert("DNI no proporcionado.");
    }
  };

  const filteredAlumnos = viewOption === 'Todos' 
    ? alumnos.sort(sortAlumnos) 
    : alumnos.filter(alumno => alumno.Dni === viewOption);

  return (
    <div className="container">
      <div className="button-group">
        <button className="button" type="button" onClick={() => setViewOption('Todos')}>Ver Todos los Alumnos</button>
        <button className="button" type="button" onClick={handleView}>Ver Alumno por DNI</button>
      </div>
      <div className="sort-group">
        <label htmlFor="sort">Ordenar por:</label>
        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="Nombre">Nombre</option>
          <option value="Asignatura">Asignatura</option>
          <option value="Nota">Nota</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Asignatura</th>
            <th>DNI</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlumnos.map((alumno) => (
            <tr key={alumno.Dni}>
              <td>{alumno.Nombre}</td>
              <td>{alumno.Asignatura}</td>
              <td>{alumno.Dni}</td>
              <td>{alumno.Nota}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerfilPadre;
