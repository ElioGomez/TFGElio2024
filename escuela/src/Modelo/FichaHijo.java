package Modelo;

public class FichaHijo {
    // Declaramos las variables de instancia
    public String asignatura, email_profesor, comentario;
    public Float nota;
    public Alumno alumno;
    
    // Este es el constructor de la clase FichaHijo, inicializamos las variables de instancia
    public FichaHijo(String asignatura, String email_profesor, String comentario, Float nota, Alumno alumno) {
        this.asignatura = asignatura;
        this.email_profesor = email_profesor;
        this.comentario = comentario;
        this.nota = nota;
        this.alumno = alumno;
    }

    //Obtenemos y establecemos los valores del constructor 
    public String getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(String asignatura) {
        this.asignatura = asignatura;
    }

    public String getEmail_profesor() {
        return email_profesor;
    }

    public void setEmail_profesor(String email_profesor) {
        this.email_profesor = email_profesor;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Float getNota() {
        return nota;
    }

    public void setNota(Float nota) {
        this.nota = nota;
    }


    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }
}
