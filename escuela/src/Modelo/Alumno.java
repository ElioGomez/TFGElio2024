package Modelo;

import java.util.HashMap;

public class Alumno extends Persona {
    private String email_padre;
    
    // Este es el constructor por defecto de la clase Alumno, llamamos al constructor de la clase base (Persona)
    public Alumno() {
        super();
    }

    // Este es el constructor de la clase Alumno, inicializamos las variables de instancia con los valores proporcionados
    public Alumno(String dni, String nombre, int edad, String email_padre) {
        // Llamamos al constructor de la clase base (Persona) y establecemos el email del padre
        super(edad, nombre, dni);
        this.email_padre = email_padre;
    }
    
    // Obtenemos el email del padre
    public String getEmail_padre() {
        return email_padre;
    }

    // Establecemos el email del padre
    public void setEmail_padre(String email_padre) {
        this.email_padre = email_padre;
    }
}
