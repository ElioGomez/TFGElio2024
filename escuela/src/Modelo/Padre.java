package Modelo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import javafx.util.Pair;




public class Padre extends Persona
{

	
	
    public Padre(int e, String nombre, String dni)
    {
    	super(e, nombre, dni);
    }
    
    
    public HashMap<String, HashMap<String,HashMap<String,FichaHijo>>> getNotas()
    {

    	boolean exito = false;
    	HashMap<String, HashMap<String,HashMap<String,FichaHijo>>> notas_hijos = new HashMap<String, HashMap<String, HashMap<String,FichaHijo>>>();
    	
		ResultSet ras;
			 
		try {
				
			conect.statement = conect.Conexion.createStatement();
			conect.resultset = conect.statement.executeQuery(
					"select alu.nombre as alumno_nombre, alu.edad, pro.email as email_profesor,  aa.*  from alumnos_asignaturas as aa "+
						"inner join profesores_asignaturas as pa "+
						"on aa.anyo = pa.anyo and aa.curso = pa.curso and aa.nombre_asignatura = pa.nombre_asignatura "+
						"inner join alumnos as alu on aa.dni_alumno = alu.dni " +
						"inner join profesores as pro on pa.dni_profesor = pro.dni " +
						"where dni_padre =  '"+this.get_dni()+"' order by alu.edad ASC, alu.dni ASC;");
			

			   ras = conect.resultset;
			   
			   while(ras.next())
			   {
				   String curso = ras.getString("curso");
				   String anyo = ras.getInt("anyo")+"";
				   String asignatura = ras.getString("nombre_asignatura");
				   
				   String dni_alumno = ras.getString("dni_alumno");
				   String alumno = ras.getString("alumno_nombre");
				   Integer edad = ras.getInt("edad");
				   String email_profesor= ras.getString("email_profesor");
				   
				   Float nota = ras.getFloat("nota");
						   
				   //################### NO OLVIDAR METER EL ANYO EN EL DICCIONARIO COMO OTRO NIVEL
				   //creamos cada vez que se encuentre cada cosa
				   
				   
				   if (!notas_hijos.containsKey(anyo))
					   notas_hijos.put(anyo, new  HashMap<String,HashMap<String,FichaHijo>>());
				   
				   if (!notas_hijos.get(anyo).containsKey(dni_alumno))
					   notas_hijos.get(anyo).put(dni_alumno, new HashMap<String,FichaHijo>());
				   
				   if (!notas_hijos.get(anyo).get(dni_alumno).containsKey(asignatura))
					   notas_hijos.get(anyo).get(dni_alumno).put(asignatura, new FichaHijo(asignatura ,email_profesor,"",nota,new Alumno(dni_alumno, alumno, edad,"") ));
				   
				   
				  
			   }
			   
			   exito =  true;
			  
		        
			   
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e);
		}
    	
   
    	return notas_hijos;
    }
    
    
    

}