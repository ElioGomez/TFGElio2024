package Modelo;

import java.util.ArrayList;

import javafx.util.Pair;

public class Asignatura {
    
    String nombre;
    ArrayList<Pair<Float, Alumno>> alumnos_notas;
    
    // Este es el constructor de la clase Asignatura, inicializamos el nombre de la asignatura y creamos una lista para almacenar las notas de los alumnos
    public Asignatura(String nombre) {
        this.nombre = nombre;
        alumnos_notas = new ArrayList<Pair<Float, Alumno>>();
    }

    // Obtenemos el nombre de la asignatura
    public String getNombre() {
        return nombre;
    }

    // Establecemos el nombre de la asignatura
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    // Obtenemos la lista de notas de los alumnos
    public ArrayList<Pair<Float, Alumno>> get_alumnos_notas() {
        return alumnos_notas;
    }

    // Establecemos la lista de notas de los alumnos
    public void set_alumnos_notas(ArrayList<Pair<Float, Alumno>> alumnos_notas) {
        this.alumnos_notas = alumnos_notas;
    }
    
    // Método toString para representar la asignatura como una cadena de texto
    public String toString(){
        String cad = "Nombre de la asignatura: " + nombre;
        return cad;
    }   
}
