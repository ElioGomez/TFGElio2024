
package Modelo;
public class Calificacion
{
    private String materia;
    private String comentario;
    private float nota;
    
    public Calificacion(){materia="";comentario="";nota=0;}

    public Calificacion(String materia, String comentario, float nota)
    {
        this.materia = materia;
        this.comentario = comentario;
        this.nota = nota;
    }

    public void set_materia(String i) { materia = i; }
    public String get_materia() { return materia; }

    public void set_comentario(String i) { comentario = i; }
    public String get_comentario() { return comentario; }

    public void set_nota(float i) { nota = i; }
    public float get_nota() { return nota; }
}