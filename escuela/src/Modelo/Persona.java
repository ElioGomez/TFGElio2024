
package Modelo;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;

import conexion.Conexion;

public class Persona implements Serializable 
{
    private int edad;
    private String nombre;
    private String dni;
    protected Conexion conect;
    
    
    public Persona(){edad=0;nombre="";dni="";}

    public Persona(int e, String nombre, String dni)
    {
        edad = e;
        this.nombre = nombre;
        this.dni = dni;
    }

    public void set_edad(int e) { if(e > 0)  this.edad = e; }
    public void set_nombre(String n) {  this.nombre = n; }
    public void set_dni(String n) { this.dni = n; }
    public int get_edad() { return  this.edad; }
    public String get_nombre() { return  this.nombre; }
    public String get_dni() { return this.dni; }
    
    public boolean conectar()
    {
    	boolean exito = false;
    	
    	if (!(this instanceof Alumno))
    	{
    		conect = new Conexion();
    		exito = conect.ConexionPostGres("Escuela","localhost","postgres","root");
    	}	
    	return exito;
    	
    }
    
    public boolean check_user_pass(String pass)
    {
    	boolean exito = false;
		String target_table="";
		

				
    	if (!(this instanceof Alumno))
    	{
			ResultSet ras;
			
			if ((this instanceof Profesor)) target_table = "profesores";
			if ((this instanceof Padre)) target_table = "padres";

			try {
				
				conect.statement = conect.Conexion.createStatement();
				conect.resultset = conect.statement.executeQuery("select * from public."+target_table+" where dni = '"+dni+"' AND pass = '"+pass+"';");
			    ras = conect.resultset;
			    
			    if(ras.next())
			    {
				    if(ras.getString("pass").equals(pass)){ 
				    	set_edad(ras.getInt("edad"));
				        set_nombre(ras.getString("nombre"));
				        set_dni(ras.getString("dni"));
				    	exito =  true;
				    } 
			    }
			    
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				System.out.println(e);
			}
    	}
			
    	return exito;
    	
    }
    
    
    public String toString()
    {
    	String cad = "";
    	cad += "nombre:" + this.nombre+ "\n";
    	cad += "dni:" + this.dni+ "\n";
    	cad += "edad:" + this.edad +"\n";
		return cad;
    	
    }
    
}
