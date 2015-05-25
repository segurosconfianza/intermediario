package com.confianza.webapp.repository.framework.frmtablas;

 /**                          
  *                           
  * @modifico	CONFIANZA
  * @version	1.0 
  * @Fecha		30/10/2014 
  * @since		1.0            
  * @app		framework  
  */                          

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class FrmTablasRepositoryImpl implements FrmTablasRepository{
	
	@Autowired
	private SessionFactory sessionFactory;  	
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}
	
	/**
	 * Metodo de consulta para los registros de la tabla FrmTablas por id
	 * @value id = id de la llave primaria a consultar el registro
	 * @return FrmTablas = objeto de la case FrmTablas que contiene los datos encontrados dado el id
	 * @throws Exception
	 */
	@Override
	@Transactional
	public FrmTablas list(Long id){
		try{
			String sql = "select tablcons ,tablmodu ,tablcodi ,tablclav ,tablvast ,tablvain ,tablfecr ,tablextr "
					   + "from FrmTablas "
					   + "where tablcons = :id ";
						
			Query query = getSession().createSQLQuery(sql)
						 .addEntity(FrmTablas.class)					
					     .setParameter("id", id);
			return (FrmTablas)query.uniqueResult();
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * Metodo de consulta para los registros de la tabla FrmTablas
	 * @return FrmTablas = coleccion de objetos de la case FrmTablas que contiene los datos encontrados
	 * @throws Exception
	 */
	@Override
	@Transactional
	public List<FrmTablas> listAll(){
		try{
			String sql = "select tablcons ,tablmodu ,tablcodi ,tablclav ,tablvast ,tablvain ,tablfecr ,tablextr "
					   + "from FrmTablas ";
						
			Query query = getSession().createSQLQuery(sql)
						 .addEntity(FrmTablas.class);
					     
			return query.list();
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}	
	
	/**
	 * Metodo para actualizar los datos de un registro de la tabla FrmTablas por id
	 * @value id = id de la llave primaria a consultar el registro
	 * @return FrmTablas = objeto de la case FrmTablas que contiene los datos encontrados dado el id
	 * @throws Exception
	 */
	@Override
	@Transactional
	public FrmTablas update(Long id){
		FrmTablas frmtablas = this.list(id);
		getSession().update(frmtablas);
		return frmtablas;
	}
	
	/**
	 * Metodo para borrar un registro de la tabla FrmTablas por id
	 * @value id = id de la llave primaria a consultar el registro
	 * @return FrmTablas = objeto de la case FrmTablas que contiene los datos encontrados dado el id
	 * @throws Exception
	 */
	@Override
	@Transactional
	public void delete(Long id){
		FrmTablas frmtablas = this.list(id);
		//FrmTablas.setEstado="B";
		getSession().update(frmtablas);
	}
	
	/**
	 * Metodo para ingresar un registro de la tabla FrmTablas
	 * @value tablcons
	 * @value tablmodu
	 * @value tablcodi
	 * @value tablclav
	 * @value tablvast
	 * @value tablvain
	 * @value tablfecr
	 * @value tablextr
	 * @return FrmTablas = objeto de la case FrmTablas que contiene los datos ingresados
	 * @throws Exception
	 */
	@Override
	@Transactional
	public FrmTablas insert(FrmTablas frmtablas){
		//getSession().insert(frmtablas);
		return frmtablas;
	}

	/**
	 * Metodo de consulta para los registros de la tabla FrmTablas por id
	 * @value id = id de la llave primaria a consultar el registro
	 * @return FrmTablas = objeto de la case FrmTablas que contiene los datos encontrados dado el id
	 * @throws Exception
	 */
	@Override
	@Transactional
	public FrmTablas listByTablcodi(String tablcodi){
		try{
			String sql = "select tablcons ,tablmodu ,tablcodi ,tablclav ,tablvast ,tablvain ,tablfecr ,tablextr "
					   + "from Frm_Tablas "
					   + "where tablcodi = :id ";
						
			Query query = getSession().createSQLQuery(sql)
						 .addEntity(FrmTablas.class)					
					     .setParameter("id", tablcodi);
			return (FrmTablas)query.uniqueResult();
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * Metodo de consulta para los registros de la tabla FrmTablas por id
	 * @value id = id de la llave primaria a consultar el registro
	 * @return FrmTablas = objeto de la case FrmTablas que contiene los datos encontrados dado el id
	 * @throws Exception
	 */
	@Override
	@Transactional
	public List<Object[]> listsByTablcodi(String tablcodi){
		try{
			String sql = "select tablclav ,tablvast "
					   + "from Frm_Tablas "
					   + "where tablcodi = :id ";
						
			Query query = getSession().createSQLQuery(sql)
					     .setParameter("id", tablcodi);
			return query.list();
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
}
