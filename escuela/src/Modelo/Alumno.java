
package Modelo;

import java.util.HashMap;

public class Alumno extends Persona
{
    private String email_padre;
    
	public Alumno(){super(); }

    public Alumno(String dni, String nombre, int edad, String email_padre )
    {
        super(edad, nombre, dni);
        this.email_padre = email_padre;
    }
    

	public String getEmail_padre() {
		return email_padre;
	}

	public void setEmail_padre(String email_padre) {
		this.email_padre = email_padre;
	}

    
}