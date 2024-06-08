package Modelo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javafx.util.Pair;

public class Admin extends Persona {

    // Este es el constructor de la clase Admin, inicializamos las variables de instancia heredadas de la clase base (Persona)
    public Admin(int e, String nombre, String dni) {
        super(e, nombre, dni);
    }
    
    // Método para obtener los DNIs de todos los padres registrados en la base de datos
    public ArrayList<String> getPadresDnis() {
        boolean exito = false;
        ArrayList<String> dni_padres = new ArrayList<String>();
        ResultSet ras;
        try {
            // Ejecutamos la consulta SQL para obtener los DNIs de los padres
            conect.statement = conect.Conexion.createStatement();
            conect.resultset = conect.statement.executeQuery("select dni from public.padres;");
            ras = conect.resultset;
            // Recorremos los resultados y almacenamos los DNIs en la lista
            while (ras.next()) {
                String dni = ras.getString("dni");
                dni_padres.add(dni);            
            }
            exito =  true;
        } catch (SQLException e) {
            // Manejo de excepciones en caso de error durante la consulta
            e.printStackTrace();
            System.out.println(e);
        }
        return dni_padres;
    }

    // Método para obtener la lista de asignaturas disponibles
    public ArrayList<String> getAsignaturas() {
        boolean exito = false;
        ArrayList<String> asignaturas = new ArrayList<String>();
        ResultSet ras;
        try {
            // Ejecutamos la consulta SQL para obtener las asignaturas
            conect.statement = conect.Conexion.createStatement();
            conect.resultset = conect.statement.executeQuery("select nombre, curso, anyo from public.asignaturas;");
            ras = conect.resultset;
            // Recorremos los resultados y construimos una cadena con la información de cada asignatura
            while (ras.next()) {
                String nombre = ras.getString("dni");
                int curso = ras.getInt("curso");
                int anyo = ras.getInt("anyo");
                asignaturas.add(curso + "º " + nombre + " " + anyo);     
            }
            exito =  true;
        } catch (SQLException e) {
            // Manejo de excepciones en caso de error durante la consulta
            e.printStackTrace();
            System.out.println(e);
        }
        return  asignaturas;
    }
}
