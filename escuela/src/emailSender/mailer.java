package emailSender;


import java.net.URL;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.URLDataSource;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class mailer 
{
	

		final String MAIL_USER 			= "eliotfg2024@gmail.com";
		final String MAIL_PASS			= "tfgElio123";
		final String MAIL_SMTP_SERVER	= "smtp.gmail.com";
		final String MAIL_SMTP_PORT		= "587";
		final String MAIL_SMTP_TTLS		= "true";
		final String MAIL_SMTP_AUTH		= "true";
		
		String MAIL_SUBJECT = "Querido usuario...";
		String MAIL_BODY	= "";
		String[] MAIL_TO	= {""};
		String[] MAIL_CC	= {"segundodawMailSender@gmail.com"};
		
		public mailer(){};
		
		public void enviaMensaje(String subject,String message,String destino){
			 MAIL_SUBJECT = subject;
			 MAIL_BODY	= message;
			 MAIL_TO[0]	= destino;
			 run();
		}
		
		
		public void run(){
			try 
			{				
				// STEP-1: SET MAIL SERVER PROPERTIES
				Properties props = new Properties();
				props.put("mail.smtp.auth", MAIL_SMTP_AUTH);
				props.put("mail.smtp.starttls.enable", MAIL_SMTP_TTLS);
				props.put("mail.smtp.host", MAIL_SMTP_SERVER);
				props.put("mail.smtp.port", MAIL_SMTP_PORT);
				
				
				
				
				//STEP-2: SET MAIL SETTINGS
				Session mailsession = Session.getInstance(props, null);
				MimeMessage mailmsg = new MimeMessage(mailsession);		
			
				for(String mail_to : MAIL_TO)
				{
					mailmsg.addRecipient(Message.RecipientType.TO, new InternetAddress(mail_to));
				}
				for(String mail_cc : MAIL_CC)
				{
					mailmsg.addRecipient(Message.RecipientType.CC, new InternetAddress(mail_cc));
				}
	
				mailmsg.setSubject(MAIL_SUBJECT);
				mailmsg.setContent(MAIL_BODY, "text/html");
	
				
				//STEP-3: C'MON! SEND MY EMAIL
				Transport transport = mailsession.getTransport("smtp");
	
				transport.connect(MAIL_SMTP_SERVER, MAIL_USER, MAIL_PASS);
				transport.sendMessage(mailmsg, mailmsg.getAllRecipients());
				transport.close();
				
			} 
			catch (Exception e) 
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}//run
	

}
