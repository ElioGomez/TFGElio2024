
package Modelo;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;

import conexion.Conexion;

public class Persona implements Serializable 
{
    private int edad;  // Atributo para almacenar la edad de la persona
    private String nombre;  // Atributo para almacenar el nombre de la persona
    private String dni;  // Atributo para almacenar el DNI de la persona
    protected Conexion conect;  // Objeto de conexión a la base de datos
    
    // Constructor por defecto que inicializa los atributos a valores por defecto
    public Persona() {
        edad = 0;
        nombre = "";
        dni = "";
    }

    // Constructor con parámetros para inicializar los atributos
    public Persona(int e, String nombre, String dni) {
        edad = e;
        this.nombre = nombre;
        this.dni = dni;
    }

    // Método setter para la edad, solo se establece si es mayor a 0
    public void set_edad(int e) { 
        if(e > 0) this.edad = e; 
    }
    
    // Método setter para el nombre
    public void set_nombre(String n) { 
        this.nombre = n; 
    }
    
    // Método setter para el DNI
    public void set_dni(String n) { 
        this.dni = n; 
    }
    
    // Método getter para la edad
    public int get_edad() { 
        return this.edad; 
    }
    
    // Método getter para el nombre
    public String get_nombre() { 
        return this.nombre; 
    }
    
    // Método getter para el DNI
    public String get_dni() { 
        return this.dni; 
    }
    
    // Método para establecer la conexión con la base de datos
    public boolean conectar() {
        boolean exito = false;

        // Verifica si la instancia no es de la clase Alumno
        if (!(this instanceof Alumno)) {
            conect = new Conexion();  // Crea un nuevo objeto de conexión
            // Establece la conexión con la base de datos usando los parámetros especificados
            exito = conect.ConexionPostGres("Escuela", "localhost", "postgres", "root");
        }   
        return exito;  // Devuelve el estado de éxito de la conexión
    }
    
    // Método para verificar las credenciales del usuario
    public boolean check_user_pass(String pass) {
        boolean exito = false;  // Inicializa la variable de éxito a falso
        String target_table = "";  // Declara la variable para almacenar el nombre de la tabla
        
        // Si la instancia no es de la clase Alumno
        if (!(this instanceof Alumno)) {
            ResultSet ras;  // Declara un ResultSet para almacenar los resultados de la consulta
            
            // Determina la tabla de destino según la instancia de la clase
            if (this instanceof Profesor) target_table = "profesores";
            if (this instanceof Padre) target_table = "padres";
            if (this instanceof Admin) target_table = "administradores";
            
            try {
                // Crea un statement para la conexión
                conect.statement = conect.Conexion.createStatement();
                
                // Ejecuta una consulta SQL para verificar las credenciales del usuario
                conect.resultset = conect.statement.executeQuery("select * from public." + target_table + " where dni = '" + dni + "' AND pass = '" + pass + "';");
                ras = conect.resultset;

                // Si se encuentra un resultado en la consulta
                if (ras.next()) {
                    // Verifica si la contraseña del resultado coincide con la proporcionada
                    if (ras.getString("pass").equals(pass)) {
                        // Si es correcta, establece los atributos del objeto con los datos del resultado
                        set_edad(ras.getInt("edad"));
                        set_nombre(ras.getString("nombre"));
                        set_dni(ras.getString("dni"));
                        exito = true;  // Establece éxito a true
                    }
                }
            } catch (SQLException e) {
                // Manejo de excepción en caso de error de SQL
                e.printStackTrace();  // Imprime la traza del error
                System.out.println(e);  // Imprime el error
            }
        }

        return exito;  // Devuelve el estado de éxito
    }
    
    // Método para representar el objeto Persona como una cadena de texto
    public String toString() {
        String cad = "";
        cad += "nombre:" + this.nombre + "\n";
        cad += "dni:" + this.dni + "\n";
        cad += "edad:" + this.edad + "\n";
        return cad;  // Devuelve la cadena de texto
    }
}

