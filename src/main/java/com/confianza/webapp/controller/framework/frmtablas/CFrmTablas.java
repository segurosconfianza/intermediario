package com.confianza.webapp.controller.framework.frmtablas;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
 




import com.confianza.webapp.service.framework.frmtablas.FrmTablasService;
import com.confianza.webapp.utils.JSONUtil;
import com.confianza.webapp.repository.framework.frmtablas.FrmTablas;

@Controller
@RequestMapping("/FrmTablas")
public class CFrmTablas {

	@Autowired
	private FrmTablasService frmTablasService;
	
	public CFrmTablas(){
		super();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public FrmTablas list(Long id){
		
		return this.frmTablasService.list(id);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public List<FrmTablas> listAll(){
	
		return this.frmTablasService.listAll();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	@ResponseStatus( HttpStatus.OK )
	@ResponseBody
	public FrmTablas update(Long id){
		return this.frmTablasService.update(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus( HttpStatus.OK )
	@ResponseBody
	public void delete(Long id){
		this.frmTablasService.delete(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.CREATED )
	@ResponseBody
	public FrmTablas insert(@RequestBody FrmTablas frmtablas){
		return this.frmTablasService.insert(frmtablas);
	}
	
	@RequestMapping(value = "/listByTablcodi.json", params = {"tablcodi"}, method = RequestMethod.GET, produces={"application/json; charset=ISO-8859-1"})
	@ResponseBody
	public String listByTablcodis(@RequestParam("tablcodi") String tablcodi){
		
		return this.frmTablasService.listByTablcodis(tablcodi);
	}
}
