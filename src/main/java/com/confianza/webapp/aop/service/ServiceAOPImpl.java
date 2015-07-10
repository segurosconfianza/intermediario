package com.confianza.webapp.aop.service;

 /**                          
  *                           
  * @modifico	CONFIANZA
  * @version	1.0 
  * @Fecha		30/10/2014 
  * @since		1.0            
  * @app		framework  
  */                          

import java.util.HashMap;
import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
@Aspect
public class ServiceAOPImpl{
	
	@Autowired
	Gson gson;
		
	public ServiceAOPImpl(){
		
	}
	
	@Pointcut("execution(String com.confianza.webapp.service..*(..))")
	public void pointIntercepController(){		
	}
	
	@Around("pointIntercepController()")
	public String interceptController(ProceedingJoinPoint point) throws Throwable{
		try{
			return (String) point.proceed();
		}catch(NullPointerException e){
			e.printStackTrace();
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("tituloError", "Datos no encontrados");
			result.put("error", "No se encontraron datos con los criterios dados");
			return gson.toJson(result);
		}
	}
		
}
