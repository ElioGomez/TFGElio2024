/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.swing.JFrame;
import javax.swing.JOptionPane;

public class Conexion {

	public Connection Conexion = null;
	public ResultSet resultset = null;
	public Statement statement = null;
	private PreparedStatement prepared = null;
	public JFrame frame;
	private double acumulador = 0;
	private double j = -14;// ojo al dato, tocar esto en funcion de la cantidad
							// de registros por pagina
	private double numeroFilas = 0;
	private double numeroPaginas = 0;

	public Conexion() {

	}

	public void ConexionFireBird(String db, String host, String user,
			String password) {

		try {
			Class.forName("org.firebirdsql.jdbc.FBDriver");
			setConexion(DriverManager.getConnection("jdbc:firebirdsql://"
					+ host + "/" + db, user, password));
			System.out.println("Conectado a la base de datos [" + db + "]");
		} catch (ClassNotFoundException | SQLException ex) {

			JOptionPane
					.showMessageDialog(
							getFrame(),
							"Se produjo un fallo en la conexión. Se cerrará la aplicación",
							"Error", JOptionPane.ERROR_MESSAGE);
			System.exit(1);
		}

	}

	public boolean ConexionPostGres(String db, String host, String user, String password) 
	{
		
		boolean exito = false;
		
		try {
			Class.forName("org.postgresql.Driver");
			setConexion(DriverManager.getConnection("jdbc:postgresql://" + host
					+ "/" + db, user, password));
			System.out.println("Conectado a la base de datos [" + db + "]");
			exito = true;
		} catch (ClassNotFoundException | SQLException ex) {
			System.out.println(ex);
			JOptionPane
					.showMessageDialog(
							getFrame(),
							"Se ha producido un fallo en la conexión a PostGres. Se cerrará la aplicación",
							"Error", JOptionPane.ERROR_MESSAGE);
			System.exit(1);
		}
		
		return exito;
	}

	// Método para desconectar la base de datos
	public void Cerrar() {
		try {
			getConexion().close();
			System.out.println("Conexion cerrada Correctamente");
		} catch (SQLException e) {

			JOptionPane
					.showMessageDialog(
							getFrame(),
							"Se ha producido un fallo al cerrar la conexion.Se cerrará la aplicación",
							"Error", JOptionPane.ERROR_MESSAGE);
			System.exit(3);

		}
	}

	public int CuentaRegistros(String tabla) {
		int a = 0;

		try {// HACER QUE ESTO FUNCIONE
			statement = Conexion.createStatement();
			resultset = statement.executeQuery("SELECT COUNT(*) FROM " + tabla);
			resultset.next();
			a = resultset.getInt(1);
		} catch (SQLException ex) {
			JOptionPane.showMessageDialog(frame,
					"Se ha producido un fallo al contar el numero de registros de la tabla:"
							+ tabla, "Error", JOptionPane.ERROR_MESSAGE);
		}

		return a;
	}

	public ResultSet between(String tabla, int a, int b) {
		ResultSet ras = null;
		try {
			statement = Conexion.createStatement();
			ras = (statement.executeQuery("Select * FROM " + tabla
					+ " where id BETWEEN " + a + " AND " + b));
		} catch (SQLException ex) {
			JOptionPane
					.showMessageDialog(
							frame,
							"Se ha producido un fallo en el la consulta Select. Se cerrará la aplicación",
							"Error", JOptionPane.ERROR_MESSAGE);
			System.exit(3);
		}
		return ras;
	}



	public int obTieneNuevoId(String tabla) {
		int a = 0;
		try {
			statement = Conexion.createStatement();
			resultset = statement.executeQuery("Select MAX(ID) FROM " + tabla);
			resultset.next();
			a = resultset.getInt(1);

		} catch (SQLException ex) {
			JOptionPane
					.showMessageDialog(
							frame,
							"Se ha producido un fallo en el la consulta Select para obtener el ultimo id. Se cerrará la aplicación",
							"Error", JOptionPane.ERROR_MESSAGE);
			System.exit(3);

		}

		return a + 1;
	}

	public ArrayList ejecutaQueryPaginada(String query, int numPagina,int numRegPagina) {    

		
    	ArrayList alResultado = new ArrayList();
   
    	try {                    
                   
	    	statement = Conexion.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
	    	statement.setFetchSize(numRegPagina);
	
	    	resultset = statement.executeQuery(query);
	
	    	int fila = numRegPagina * (numPagina - 1) + 1;
	    	int cont = 1;
	
	    	ResultSetMetaData md = resultset.getMetaData();
	    	int numeroColumnas = md.getColumnCount();
	    	
	    	ArrayList alRegistro = new ArrayList(numeroColumnas);
	
	
	    	for (int i = 1; i <= numeroColumnas; i++) {
		    	String nomCol = md.getColumnName(i);
		    	alRegistro.add(nomCol);
	    	} 
	
	    	alResultado.add(alRegistro);
	
	    	if (resultset.absolute(fila) && numRegPagina > 0) {
		    	do {
			    	alRegistro = new ArrayList();
			    	for (int i = 1; i <= numeroColumnas; i++) {
			    	    alRegistro.add(resultset.getString(i));
			    	}
			
			    	alResultado.add(alRegistro);
			    	cont++;
		
		    	}while (resultset.next() && (cont <= numRegPagina));
	    	} 
	    	// Se incluye el primer elemento del ArrayList con un objeto Integer
	    	// con el Numero de Tuplas TOTAL de la query paginada
	    	// Se mueve el cursor a ultima tupla
	    	Integer numTuplasTotal = new Integer(0);
	    	if (resultset.last()) { // Existen tuplas y el cursor esta en la ultima,
	    	        // basta con consultar el numero de esa tupla
	    			numTuplasTotal = new Integer(resultset.getRow());
	    	} 
	    	alResultado.add(0, numTuplasTotal); 
	    	
    	} catch (Exception e) {
    		e.printStackTrace();
    	} finally {
    		
    	}
	    	
   
    	return (alResultado);
	}

	/**
	 * @return the Conexion
	 */
	public Connection getConexion() {
		return Conexion;
	}

	/**
	 * @param Conexion
	 *            the Conexion to set
	 */
	public void setConexion(Connection Conexion) {
		this.Conexion = Conexion;
	}

	/**
	 * @return the resultset
	 */

	/**
	 * @return the statement
	 */
	public Statement getStatement() {
		return statement;
	}

	/**
	 * @param statement
	 *            the statement to set
	 */
	public void setStatement(Statement statement) {
		this.statement = statement;
	}

	/**
	 * @return the frame
	 */
	public JFrame getFrame() {
		return frame;
	}

	/**
	 * @param frame
	 *            the frame to set
	 */
	public void setFrame(JFrame frame) {
		this.frame = frame;
	}

	/**
	 * @return the prepared
	 */
	public PreparedStatement getPrepared() {
		return prepared;
	}

	/**
	 * @param prepared
	 *            the prepared to set
	 */
	public void setPrepared(PreparedStatement prepared) {
		this.prepared = prepared;
	}

	/**
	 * @return the acumulador
	 */
	public double getAcumulador() {
		return acumulador;
	}

	/**
	 * @param acumulador
	 *            the acumulador to set
	 */
	public void setAcumulador(double acumulador) {
		this.acumulador = acumulador;
	}

	/**
	 * @return the j
	 */
	public double getJ() {
		return j;
	}

	/**
	 * @param j
	 *            the j to set
	 */
	public void setJ(double j) {
		this.j = j;
	}

	/**
	 * @return the numeroFilas
	 */
	public double getNumeroFilas() {
		return numeroFilas;
	}

	/**
	 * @param numeroFilas
	 *            the numeroFilas to set
	 */
	public void setNumeroFilas(double numeroFilas) {
		this.numeroFilas = numeroFilas;
	}

	/**
	 * @return the numeroPaginas
	 */
	public double getNumeroPaginas() {
		return numeroPaginas;
	}

	/**
	 * @param numeroPaginas
	 *            the numeroPaginas to set
	 */
	public void setNumeroPaginas(double numeroPaginas) {
		this.numeroPaginas = numeroPaginas;
	}

}