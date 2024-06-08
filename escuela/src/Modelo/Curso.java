package Modelo;

import java.util.ArrayList;
import java.util.HashMap;

public class Curso {
    
    String grado;
    HashMap<String, Asignatura> asignaturas;
    
    // Este es el constructor de la clase Curso, inicializamos el grado y creamos un HashMap para almacenar las asignaturas
    public Curso(String grado) {
        this.grado = grado;
        asignaturas = new HashMap<String, Asignatura>();
    }

    // Obtenemos el grado del curso
    public String getGrado() {
        return grado;
    }

    // Establecemos el grado del curso
    public void setGrado(String grado) {
        this.grado = grado;
    }

    // Obtenemos el HashMap de las asignaturas del curso
    public HashMap<String, Asignatura> getAsignaturas() {
        return asignaturas;
    }

    // Establecemos el HashMap de las asignaturas del curso
    public void setAsignaturas(HashMap<String, Asignatura> asignaturas) {
        this.asignaturas = asignaturas;
    }
    
    // Método toString para representar el curso como una cadena de texto
    public String toString(){
        String cad = "Curso: " + grado;
        // Iteramos sobre las asignaturas y las agregamos a la cadena de texto
        for (HashMap.Entry<String, Asignatura> asi : asignaturas.entrySet())	      
            cad += "\n" + asi; 		
        return cad;
    }   
}
