<%@ page import= "java.security.*" %>
<%@ page import = "java.io.BufferedReader" %>
<%@ page import = "java.io.IOException" %>
<%@ page import = "java.io.PrintWriter" %>
<%@ page import = "java.math.BigInteger" %>
<%@ page import = "java.sql.ResultSet" %>
<%@ page import = "javax.servlet.RequestDispatcher" %>
<%@ page import = "javax.servlet.ServletException" %>
<%@ page import = "javax.servlet.annotation.WebServlet" %>
<%@ page import = "javax.servlet.http.HttpServlet" %>
<%@ page import = "javax.servlet.http.HttpServletRequest" %>
<%@ page import = "javax.servlet.http.HttpServletResponse" %>
<%@ page import = "org.json.JSONObject" %>
<%@ page import = "Modelo.Admin" %>
<%@ page import = "Modelo.Curso" %>
<%@ page import = "Modelo.Asignatura" %>
<%@ page import = "Modelo.Alumno" %>
<%@ page import = "Modelo.FichaHijo" %>
<%@ page import = "java.util.ArrayList" %>
<%@ page import = "java.util.HashMap" %>
<%@ page import = "org.json.JSONObject" %>
<%@ page import = "com.google.gson.Gson" %>
<%@ page import = "javafx.util.Pair" %>


<%!

public String padre_dnisToJson( ArrayList<String> padre_dnis)
{
	String cad = "[";

	 for (int i = 0; i < padre_dnis.size(); i++) 
	 {
		 cad+= "'"+padre_dnis.get(i)+"',";
	 }
	
	cad = cad.substring(0, cad.length()-1)+"]";	
	return cad;
}

%>


<%

String tipo_usuario = (String)session.getAttribute("tipo_usuario");

if (tipo_usuario == "admin")
{
	Admin admin = (Admin)session.getAttribute("usuario");
	//abrir conexión base de datos

	admin.conectar();
	
	
	// cargamos la lista de DNIs de los padres que se pueden asignar a un nuevo alumno.
	ArrayList<String> padre_dnis = admin.getPadresDnis();	
    String padre_dnis_json = padre_dnisToJson(padre_dnis);

    
    /*
    	Este controller jsp está pensado para dar servicio a un formulario de inscripción del alumnado.
    	Donde se pudiera introducir dni, nombre, edad etc.
    	
    	Aquí la idea era cargar:
    		- el listado de dnis de los padres (para asignar uno al nuevo alumno)
    		- las asignaturas existentes (para asignar las N asignaturas pertinentes)
    
    	Realmente sería necesario tener previamente un CRUD de padres para poder gestionarlos pero dado a un problema que he tenido XXX
    	no me ha dado tiempo a tenerlo listo y se ha quedado en este estado.
    */
    
    
	//enviamos el listado de dnis a cliente
	out.print(padre_dnis_json);
	out.flush();
}


%>









