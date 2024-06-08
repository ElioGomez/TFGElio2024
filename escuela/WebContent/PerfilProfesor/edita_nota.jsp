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
<%@ page import = "emailSender.mailer" %>


<%

String tipo_usuario = (String)session.getAttribute("tipo_usuario");


//comprobamos que sea un usuario de tipo profesor
if (tipo_usuario == "profesor")
{
	Profesor profe = (Profesor)session.getAttribute("usuario");
	profe.conectar();//conectamos a la BD

	String dni = request.getParameter("Dni_alumno");
	String Asignatura = request.getParameter("Asignatura");
	String email_padre = request.getParameter("Email_padre");
	
	// recuperamos la información pertinente de la petición
	int Curso = Integer.parseInt(request.getParameter("Curso"));
	int Anyo = Integer.parseInt(request.getParameter("Anyo"));
	float nota = Float.parseFloat(request.getParameter("Nota"));
	
	int exito = profe.editarNota(nota, dni, Asignatura, Curso, Anyo) ? 1 : 0;
	
	
	// he tenido problemas con el mailer de java y gmail. No hay manera de configurar los permisos de la cuenta
	// en teoría esto debería de funcionar una vez configurada la cuenta:
	//mailer cartero = new mailer();
	//cartero.enviaMensaje("La nota ha sido actualizada","Le informo que la calificación de su hijo para la asignatura "+Asignatura+" es de:"+nota , email_padre);
			
	out.print("{\"RESULT\":"+exito+"}");
	out.flush();
	
}


%>









