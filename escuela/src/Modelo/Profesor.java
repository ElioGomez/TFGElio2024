package Modelo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import javafx.util.Pair;

public class Profesor extends Persona
{
    
    public Profesor(int e, String nombre, String dni)
    {
    	super(e, nombre, dni);
    }

    public Profesor(int e, String nombre, String dni, String identificador)
    {
    	super(e, nombre, dni);
    }
    

    public HashMap<String, HashMap<String, Curso>> getCursos()
    {

    	boolean exito = false;
    	HashMap<String, HashMap<String, Curso>> cursos_anyos = new HashMap<String, HashMap<String, Curso>>();
    	
		ResultSet ras;
			 
		try {
				
			conect.statement = conect.Conexion.createStatement();
			conect.resultset = conect.statement.executeQuery(
					"select alu.nombre as alumno, alu.edad, p.email as email_padre,  aa.*, pa.dni_profesor from alumnos_asignaturas as aa "+
						"inner join profesores_asignaturas as pa "+
						"on aa.anyo = pa.anyo and aa.curso = pa.curso and aa.nombre_asignatura = pa.nombre_asignatura "+
						"inner join alumnos as alu on aa.dni_alumno = alu.dni " +
						"inner join padres as p on alu.dni_padre = p.dni " +
						"where dni_profesor =  '"+this.get_dni()+"' order by curso;");
			

			   ras = conect.resultset;
			   
			   while(ras.next())
			   {
				   String curso = ras.getString("curso");
				   String anyo = ras.getInt("anyo")+"";
				   String asignatura = ras.getString("nombre_asignatura");
				   
				   String dni_alumno = ras.getString("dni_alumno");
				   String alumno = ras.getString("alumno");
				   Integer edad = ras.getInt("edad");
				   String email_padre = ras.getString("email_padre");
				   
				   Float nota = ras.getFloat("nota");
						   
				   //creamos cada vez que se encuentre cada cosa
				   if (!cursos_anyos.containsKey(anyo))
					   cursos_anyos.put(anyo, new HashMap<String, Curso>());
				   
				   if (!cursos_anyos.get(anyo).containsKey(curso))
					   cursos_anyos.get(anyo).put(curso, new Curso(curso));
				
				   if (!cursos_anyos.get(anyo).get(curso).getAsignaturas().containsKey(asignatura))
					   cursos_anyos.get(anyo).get(curso).asignaturas.put(asignatura, new Asignatura(asignatura));


				   
				   
				   cursos_anyos.get(anyo).get(curso).getAsignaturas().get(asignatura).get_alumnos_notas().add(new Pair<Float, Alumno>(nota,new Alumno(dni_alumno, alumno, edad, email_padre )));
					   	   
			   }
			   
			   exito =  true;
			  
		        
			   
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e);
		}
    	
   
    	return cursos_anyos;
    }
    
    

    public boolean editarNota(float nota, String dni, String Asignatura, int Curso, int Anyo )
    {
    	boolean exito = false;
    	
		 
		try {
			conect.statement = conect.Conexion.createStatement();
			conect.statement.executeUpdate("update public.alumnos_asignaturas "+
					" set nota = "+nota+" where dni_alumno = '"+dni+"' and curso = "+Curso+
					" and nombre_asignatura = '"+Asignatura+"' and anyo = "+Anyo);
			
			   
			exito =  true;   
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e);
		}
    	
    	
    	return exito;
    }
    

    
}


