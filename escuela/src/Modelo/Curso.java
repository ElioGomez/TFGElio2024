package Modelo;

import java.util.ArrayList;
import java.util.HashMap;

public class Curso {
	
	String grado;
	HashMap<String, Asignatura> asignaturas;
	
	public Curso(String grado)
	{
		this.grado = grado;
		asignaturas = new HashMap<String, Asignatura>();
	}

	public String getGrado() {
		return grado;
	}

	public void setGrado(String grado) {
		this.grado = grado;
	}

	public HashMap<String, Asignatura> getAsignaturas() {
		return asignaturas;
	}

	public void setAsignaturas(HashMap<String, Asignatura> asignaturas) {
		this.asignaturas = asignaturas;
	}
	
	public String toString(){
		String cad = "Curso: "+grado;
		for (HashMap.Entry<String, Asignatura> asi : asignaturas.entrySet())	      
	        cad+="\n"+asi; 		
	    return cad;
	}
	
}
