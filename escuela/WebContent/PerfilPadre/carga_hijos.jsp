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
<%@ page import = "Modelo.Padre" %>
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

public String HijosNotasToJson( HashMap<String, HashMap<String,HashMap<String,FichaHijo>>> notas_hijos)
{
	String cad = "[";

	for (HashMap.Entry<String, HashMap<String,HashMap<String,FichaHijo>>> anyo_set : notas_hijos.entrySet())
	{
		HashMap<String,HashMap<String,FichaHijo>> cursos = anyo_set.getValue();
		cad+="{\"Anyo\":\""+anyo_set.getKey()+"\", \"Hijos\":[";
		System.out.println(anyo_set.getKey());
		for (HashMap.Entry<String,HashMap<String,FichaHijo>> hijo_set : cursos.entrySet())
		{
			HashMap<String,FichaHijo> asignaturas = hijo_set.getValue();
			
			cad+="{\"Nombre\":\""+asignaturas.get(asignaturas.keySet().toArray()[0]).getAlumno().get_nombre()+"\", \"Asignaturas\":[";

			for (HashMap.Entry<String, FichaHijo> asignatura_set : asignaturas.entrySet()) 
			{
				FichaHijo aux = asignatura_set.getValue();
				cad+="{\"Asignatura\":\""+aux.getAsignatura()+"\",\"Email\":\""+aux.getEmail_profesor()+"\",\"Nota\":\""+aux.getNota()+"\",\"Comentario\":\""+aux.getComentario()+"\" },";
			}
			cad = cad.substring(0, cad.length()-1)+"]},";
		}
		cad = cad.substring(0, cad.length()-1)+"]},";
	}
	
	cad = cad.substring(0, cad.length()-1)+"]";	
	return cad;
}

%>


<%

String tipo_usuario = (String)session.getAttribute("tipo_usuario");

if (tipo_usuario == "padre")
{
	Padre padre = (Padre)session.getAttribute("usuario");
	//abrir conexión base de datos

	padre.conectar();
	
	HashMap<String, HashMap<String,HashMap<String,FichaHijo>>> hijos_notas = padre.getNotas();
    String hijos_notas_json = HijosNotasToJson(hijos_notas);

	System.out.println(hijos_notas_json);
	out.print(hijos_notas_json);
	out.flush();
}


%>









