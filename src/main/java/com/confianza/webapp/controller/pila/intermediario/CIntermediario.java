package com.confianza.webapp.controller.pila.intermediario;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
@RequestMapping("/Intermediario")
public class CIntermediario {
	
	@Autowired
	Gson gson;
	
	private Authentication auth;
	
	@RequestMapping("/Formato")
	public String index() {
		return "pila/planilla/Planilla";
	}
	
	@RequestMapping("/filters/filterText")
	public String filterText() {
		return "templates/filters/filterText";
	}
	
	@RequestMapping("/filters/filterBetweenDate")
	public String filterBetweenDate() {
		return "templates/filters/filterBetweenDate";
	}
	
	@RequestMapping("/filters/filterBetweenNumber")
	public String filterBetweenNumber() {
		return "templates/filters/filterBetweenNumber";
	}
	
	@RequestMapping(value = "/User.json", method = RequestMethod.GET, produces={"application/json"})
	@ResponseBody
	public String getUser(){
		auth = SecurityContextHolder.getContext().getAuthentication();
		return gson.toJson(auth.getName());
	}
}
