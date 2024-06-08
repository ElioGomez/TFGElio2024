package Modelo;

public class Calificacion {
    // Declaramos las variables de instancia
    private String materia;
    private String comentario;
    private float nota;
    
    // Este es el constructor por defecto de la clase Calificacion, inicializamos las variables de instancia
    public Calificacion() {
        materia = "";
        comentario = "";
        nota = 0;
    }

    // Este es el constructor de la clase Calificacion, inicializamos las variables de instancia con los valores proporcionados
    public Calificacion(String materia, String comentario, float nota) {
        this.materia = materia;
        this.comentario = comentario;
        this.nota = nota;
    }

    // Establecemos el valor de la materia
    public void set_materia(String i) {
        materia = i;
    }

    // Obtenemos el valor de la materia
    public String get_materia() {
        return materia;
    }

    // Establecemos el comentario
    public void set_comentario(String i) {
        comentario = i;
    }

    // Obtenemos el comentario
    public String get_comentario() {
        return comentario;
    }

    // Establecemos la nota
    public void set_nota(float i) {
        nota = i;
    }

    // Obtenemos la nota
    public float get_nota() {
        return nota;
    }
}
