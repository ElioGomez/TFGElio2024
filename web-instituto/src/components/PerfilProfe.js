import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 
import { useUserState } from '../context/UserContext';

const PerfilProfesor = () => {
  const { userId, userType } = useUserState();
  console.log(userId,userType)
  const [alumnos, setAlumnos] = useState([
    { Nombre: 'Juan Pérez', Asignatura: 'Matemáticas', Dni: '90123456I', Nota: 5 },
    { Nombre: 'María López', Asignatura: 'Historia', Dni: '90123457J', Nota: 7 },
    { Nombre: 'Carlos García', Asignatura: 'Ciencias', Dni: '90123458K', Nota: 9 },
    { Nombre: 'Ana Torres', Asignatura: 'Geografía', Dni: '90123459L', Nota: 8 },
    { Nombre: 'Luis Martínez', Asignatura: 'Literatura', Dni: '90123460M', Nota: 6 },
  ]);
  useEffect(() => {
    getUsers();
   },[])
    const getUsers = async ( ) => {
  
      try {
        const response = await fetch('http://192.168.0.23:8080/escuela/carga_alumnos.jsp', {
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
    const addUsers = async (body) => {
  
      try {
        const response = await fetch('http://192.168.0.23:8080/escuela/crear_alumnos.jsp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            dni: userId,
            tipo_usuario: userType,
            ...body
          })
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          if (data["resultado"] === 1)
          {
            getUsers();
          }
         
        } else {
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  const editarNota = async (alumnoEditado) => {
    try {
      // Simulación de una llamada a la API para editar el alumno
      // const response = await axios.get('http://localhost:8080/escuela/PerfilProfesor/edita_nota.jsp', { params: alumnoEditado });
      // alert(response.data);

      // Actualizar el estado localmente para reflejar los cambios
      setAlumnos((prevAlumnos) =>
        prevAlumnos.map((alumno) =>
          alumno.Dni === alumnoEditado.Dni ? { ...alumnoEditado } : alumno
        )
      );
    } catch (error) {
      alert(`Status: ${error.response.status}, Error: ${error.message}`);
    }
  };

  const handleEdit = () => {
    const dni = prompt("Ingrese el DNI del alumno que desea editar:");
    const alumno = alumnos.find((al) => al.Dni === dni);
    if (alumno) {
      const nombre = prompt("Ingrese el nuevo nombre:", alumno.Nombre);
      const asignatura = prompt("Ingrese la nueva asignatura:", alumno.Asignatura);
      const nota = parseInt(prompt("Ingrese la nueva nota:", alumno.Nota), 10);
      editarNota({ ...alumno, Nombre: nombre, Asignatura: asignatura, Nota: nota });
    } else {
      alert("Alumno no encontrado.");
    }
  };

  const handleDelete = () => {
    const dni = prompt("Ingrese el DNI del alumno que desea eliminar:");
    const alumno = alumnos.find((al) => al.Dni === dni);
    if (alumno) {
      setAlumnos((prevAlumnos) => prevAlumnos.filter((al) => al.Dni !== dni));
      alert(`Alumno con DNI ${dni} eliminado.`);
    } else {
      alert("Alumno no encontrado.");
    }
  };

  const handleCreate = () => {
    const dni = prompt("Ingrese el DNI del nuevo alumno:");
    const nombre = prompt("Ingrese el nombre del nuevo alumno:");
    const asignatura = prompt("Ingrese la asignatura del nuevo alumno:");
    const nota = parseInt(prompt("Ingrese la nota del nuevo alumno:"), 10);
    if (dni && nombre && asignatura && !isNaN(nota)) {
      const nuevoAlumno = { user_dni: dni, user_name: nombre, user_subject: asignatura, user_note: nota };
      addUsers(nuevoAlumno)
      
      //setAlumnos((prevAlumnos) => [...prevAlumnos, nuevoAlumno]);
      alert(`Alumno con DNI ${dni} creado.`);
    } else {
      alert("Información incorrecta.");
    }
  };

  return (
    <div className="container">
      <div className="button-group">
        <button className="button" type="button" onClick={handleEdit}>Editar Alumno</button>
        <button className="button" type="button" onClick={handleDelete}>Eliminar Alumno</button>
        <button className="button" type="button" onClick={handleCreate}>Crear Alumno</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Asignatura</th>
            <th>DNI</th>
            <th>Nota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.Dni}>
              <td>{alumno.Nombre}</td>
              <td>{alumno.Asignatura}</td>
              <td>{alumno.Dni}</td>
              <td>{alumno.Nota}</td>
              <td>
                <button className="button" type="button" onClick={() => handleEdit(alumno.Dni)}>Editar Nota</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerfilProfesor;
