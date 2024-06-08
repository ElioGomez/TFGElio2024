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
<%@ page import = "Modelo.Admin" %>
<%@ page import="java.io.InputStreamReader" %>

<%!


//función para encriptar un string a md5
//la uso para encriptar las contraseñas en la base de datos
public String to_md5(String texto)
{
	MessageDigest m;
	byte[] digest = null;
	
	try {	
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


//recuperamos el mensaje a través de un buffer que lee la petición
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
Integer tipo_usuario_int = jsonBody.getInt("tipo_usuario");
 

// convertimos el tipo de usuario de int a un string para que sea mas legible el código
String[] tipo_usuario_array = {"profesor" , "padre", "admin"};
String tipo_usuario = tipo_usuario_array[tipo_usuario_int];


//ciframos la contraseña antes de ir a cotejar a BD. NOTA: esto debería pasarse a el jquery. 
String md5_clave = to_md5(clave);


int resultado = 0;
String dni = "";
String userType = "";

boolean exito = false;


switch (tipo_usuario)
{
	//Comienza el bloque de código según el tipo de usuario: profesor
	case "profesor":
		 // Crea una instancia de la clase Profesor con parámetros iniciales
		 Profesor profe = new Profesor(0, "unknown", usuario, "000");
		
		 // Establece la conexión con la base de datos
		 profe.conectar();
		 
		 // Verifica las credenciales del usuario en la tabla de profesores
		 exito = profe.check_user_pass(md5_clave);  
		
		 // Si las credenciales son correctas
		 if(exito) {        
		     // Almacena el objeto profesor en la sesión
		     session.setAttribute("usuario", profe);
		     
		     // Almacena el tipo de usuario en la sesión
		     session.setAttribute("tipo_usuario", tipo_usuario);
		     
		     // Obtiene el DNI del profesor y lo almacena en una variable
		     dni = profe.get_dni();
		     
		     // Asigna el tipo de usuario a la variable userType
		     userType = tipo_usuario;
		     
		     // Indica que el login fue exitoso
		     resultado = 1;
		 }
	break;
	
	//Comienza el bloque de código según el tipo de usuario: padre
	case "padre":
		 // Crea una instancia de la clase Padre con parámetros iniciales
		 Padre padre = new Padre(0, "unknown", usuario);
		
		 // Establece la conexión con la base de datos
		 padre.conectar();
		 
		 // Verifica las credenciales del usuario en la tabla de padres
		 exito = padre.check_user_pass(md5_clave);  
		
		 // Si las credenciales son correctas
		 if(exito) {        
		     // Almacena el objeto padre en la sesión
		     session.setAttribute("usuario", padre);
		     
		     // Almacena el tipo de usuario en la sesión
		     session.setAttribute("tipo_usuario", tipo_usuario);
		     
		     // Obtiene el DNI del padre y lo almacena en una variable
		     dni = padre.get_dni();
		     
		     // Asigna el tipo de usuario a la variable userType
		     userType = tipo_usuario;
		     
		     // Indica que el login fue exitoso
		     resultado = 1;
		 }
	break;
	
	//Comienza el bloque de código según el tipo de usuario: admin
	case "admin":
		 // Crea una instancia de la clase Admin con parámetros iniciales
		 Admin admin = new Admin(0, "admin", usuario);
		 
		 // Establece la conexión con la base de datos
		 admin.conectar();
		 
		 // Verifica las credenciales del usuario en la tabla de administradores
		 exito = admin.check_user_pass(md5_clave);
		
		 // Si las credenciales son correctas
		 if(exito) {        
		     // Almacena el objeto administrador en la sesión
		     session.setAttribute("usuario", admin);
		     
		     // Almacena el tipo de usuario en la sesión
		     session.setAttribute("tipo_usuario", tipo_usuario);
		     
		     // Obtiene el DNI del administrador y lo almacena en una variable
		     dni = admin.get_dni();
		     
		     // Asigna el tipo de usuario a la variable userType
		     userType = tipo_usuario;
		     
		     // Indica que el login fue exitoso
		     resultado = 1;
		 }
	 break;

	
	default:
}

//Construir el JSON de respuesta
JSONObject jsonResponse = new JSONObject();
jsonResponse.put("resultado", resultado);
jsonResponse.put("dni", dni);
jsonResponse.put("userType", userType);

//Enviar la respuesta JSON
response.setContentType("application/json");
response.setCharacterEncoding("UTF-8");
response.getWriter().write(jsonResponse.toString());


%>









