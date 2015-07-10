package com.confianza.webapp.service.security;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;

@Controller
public class AutenticateIntermediario implements AuthenticationProvider {

	@Autowired
	Gson gson;
	
	@Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String name = authentication.getName();
        String password = this.codeMd5(authentication.getCredentials().toString());
        
        String respuesta=this.validateUser(name, password);
        
        if (respuesta.contains("true")) {
            List<GrantedAuthority> grantedAuths = new ArrayList<>();
            grantedAuths.add(new SimpleGrantedAuthority("INTERMEDIARIO_ALL"));
            Authentication auth = new UsernamePasswordAuthenticationToken(name, password, grantedAuths);
            return auth;
        } else {
            return null;
        }
    }
 
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
    
    public String validateUser( String user, String password)
    {		
    	try{
    			
		String urlu = "http://192.168.100.202:8080/IConfianza/confianza/Intermediario/validateUsua.json?user="+user+"&password="+password;		
		
		URL url = new URL(urlu);
		
		HttpURLConnection httpCon = (HttpURLConnection) url.openConnection();
		httpCon.setDoOutput(true);

		httpCon.setDoInput(true);

		httpCon.setRequestProperty("Content-Type", "application/json");

		httpCon.setRequestProperty("Accept", "application/json");

		httpCon.setRequestMethod("POST");

		OutputStreamWriter wr= new OutputStreamWriter(httpCon.getOutputStream());		

		wr.flush();

		//display what returns the POST request

		StringBuilder sb = new StringBuilder();  

		int HttpResult =httpCon.getResponseCode(); 
		BufferedReader br=null;
		
		if(HttpResult ==HttpURLConnection.HTTP_OK){

		    br = new BufferedReader(new InputStreamReader(httpCon.getInputStream()));  

		    String line = null;  

		    while ((line = br.readLine()) != null) {  
		    	sb.append(line.trim());  
		    }  

		    br.close();  

		}else{
		    System.out.println(httpCon.getResponseMessage());  
		} 
						
        return sb.toString();    
    	}catch(Exception e)
    	{
    		e.printStackTrace();
    	}
    	return null;
    }
    
    private String codeMd5(String usuapass) {
		MessageDigest md;
		//convert the byte to hex format method 1
        StringBuffer sb = new StringBuffer();
		try {
			md = MessageDigest.getInstance("MD5");
			md.update(usuapass.getBytes());
			byte byteData[] = md.digest();
			 
	        for (int i = 0; i < byteData.length; i++) {
	         sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
	        }
	        
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
		return sb.toString();
	}
}
