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
<%@ page import = "com.google.gson.Gson" %>
<%@ page import = "Modelo.Profesor" %>
<%@ page import = "Modelo.Padre" %>
<%@ page import="java.io.InputStreamReader" %>

<%!
public String to_md5(String texto)
{
	MessageDigest m;
	byte[] digest = null;
	
	try {
		System.out.println(texto);
		
		m = MessageDigest.getInstance("MD5");
		m.reset();
		m.update(texto.getBytes());
		digest = m.digest();
	} catch (NoSuchAlgorithmException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	BigInteger bigInt = new BigInteger(1,digest);
	return bigInt.toString(16);
}




%>


<%

Gson gson = new Gson();
StringBuilder sb = new StringBuilder();
BufferedReader reader = request.getReader();
String line;
while ((line = reader.readLine()) != null) {
  sb.append(line);
}

// Convertir el cuerpo de la solicitud JSON a un objeto JSONObject
JSONObject jsonBody = new JSONObject(sb.toString());

// Obtener los valores de los parámetros del objeto JSONObject
String usuario = jsonBody.getString("dni");
String clave = jsonBody.getString("contraseña");
String tipo_usuario = jsonBody.getString("tipo_usuario");


tipo_usuario = (tipo_usuario=="true") ? "profesor" : "padre";
System.out.println(request.getParameter("contraseña"));

System.out.println(tipo_usuario);

//ciframos la contraseña antes de ir a cotejar a BD. NOTA: esto debería pasarse a el jquery. 
String md5_clave = to_md5(clave);


int resultado = 0;
boolean exito = false;
//abrir conexión base de datos
switch (tipo_usuario)
{
	case "profesor":
		Profesor profe = new Profesor(0, "unknown", usuario, "000");
		
		profe.conectar();
		//consultar tabla profesores
		exito = profe.check_user_pass(md5_clave);	
		
		if(exito)
		{		
			session.setAttribute("usuario",profe);
			session.setAttribute("tipo_usuario",tipo_usuario);
			resultado = 1;
		}
		
	break;
	
	case "padre":
		Padre padre = new Padre(0, "unknown", usuario);
		
		padre.conectar();
		//consultar tabla profesores
		exito = padre.check_user_pass(md5_clave);	
		
		if(exito)
		{		
			session.setAttribute("usuario",padre);
			session.setAttribute("tipo_usuario",tipo_usuario);
			resultado = 1;
		}
		
	break;
	
	default:
}

//Construir el JSON de respuesta
JSONObject jsonResponse = new JSONObject();
jsonResponse.put("resultado", resultado);

//Enviar la respuesta JSON
response.setContentType("application/json");
response.setCharacterEncoding("UTF-8");
response.getWriter().write(jsonResponse.toString());


%>









