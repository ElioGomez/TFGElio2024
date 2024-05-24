package Modelo;

import java.util.ArrayList;

import javafx.util.Pair;

public class Asignatura {
	
	String nombre;
	ArrayList <Pair<Float, Alumno>> alumnos_notas;
	
	public Asignatura(String nombre)
	{
		this.nombre =  nombre;
		alumnos_notas = new ArrayList <Pair<Float, Alumno>>();
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public ArrayList <Pair<Float, Alumno>> get_alumnos_notas() {
		return alumnos_notas;
	}

	public void set_alumnos_notas(ArrayList <Pair<Float, Alumno>> alumnos_notas) {
		this.alumnos_notas = alumnos_notas;
	}
	
	public String toString(){
		String cad = "Nombre de la asignatura: "+nombre;
		
	    return cad;
	}
	
}
