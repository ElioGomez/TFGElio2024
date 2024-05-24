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
<%@ page import = "Modelo.Profesor" %>
<%@ page import = "Modelo.Curso" %>
<%@ page import = "Modelo.Asignatura" %>
<%@ page import = "Modelo.Alumno" %>
<%@ page import = "java.util.ArrayList" %>
<%@ page import = "java.util.HashMap" %>
<%@ page import = "org.json.JSONObject" %>
<%@ page import = "com.google.gson.Gson" %>
<%@ page import = "javafx.util.Pair" %>


<%!

public String CursosToJson(HashMap<String, HashMap<String, Curso>> anyos_cursos)
{
	String cad = "[";

	for (HashMap.Entry<String, HashMap<String, Curso>> anyo_set : anyos_cursos.entrySet())
	{
		HashMap<String, Curso> cursos = anyo_set.getValue();
		cad+="{\"Anyo\":\""+anyo_set.getKey()+"\", \"Cursos\":[";
		
		
		
		for (HashMap.Entry<String, Curso> curso_set : cursos.entrySet())
		{
			Curso curso = curso_set.getValue();
			cad+="{\"Curso\":\""+curso.getGrado()+"\", \"Asignaturas\":[";
			
			for (HashMap.Entry<String, Asignatura> asignatura_set : curso.getAsignaturas().entrySet()) 
			{
				Asignatura asig = asignatura_set.getValue();
				cad+="{\"Asignatura\":\""+asig.getNombre()+"\",\"Alumnos\":[";
				
				for (Pair<Float, Alumno> alum_nota : asig.get_alumnos_notas()) 
				{
					cad+="{\"Alumno\":\""+alum_nota.getValue().getNombre()+
						"\",\"Alumno_dni\":\""+alum_nota.getValue().get_dni()+
						"\",\"Padre_email\":\""+alum_nota.getValue().getEmail_padre()+
						"\",\"Nota\":"+alum_nota.getKey()+"}," ;
				}
				
				cad = cad.substring(0, cad.length()-1)+"]},";
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

if (tipo_usuario == "profesor")
{
	Profesor profe = (Profesor)session.getAttribute("usuario");
	//abrir conexión base de datos

	profe.conectar();
	
    HashMap<String, HashMap<String, Curso>> cursos = profe.getCursos();
    String cursos_json = CursosToJson(cursos);

	System.out.println(cursos_json);
	out.print(cursos_json);
	out.flush();
}


%>









