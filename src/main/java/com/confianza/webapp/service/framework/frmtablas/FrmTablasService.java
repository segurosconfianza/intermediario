package com.confianza.webapp.service.framework.frmtablas;

 /**                          
  *                           
  * @modifico	CONFIANZA
  * @version	1.0 
  * @Fecha		30/10/2014 
  * @since		1.0            
  * @app		framework  
  */                          

import java.util.List;

import com.confianza.webapp.repository.framework.frmtablas.FrmTablas;

public interface FrmTablasService{
	
	public FrmTablas list(Long id);
	
	public List<FrmTablas> listAll();	
	
	public FrmTablas update(Long id);
	
	public void delete(Long id);
	
	public FrmTablas insert(FrmTablas frmtablas);

	public FrmTablas listByTablcodi(String string);

	public String listByTablcodis(String tablcodi);
	
}
