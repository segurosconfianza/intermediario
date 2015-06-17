var FrmMainApp=angular.module('FrmMainApp');

FrmMainApp.service('PlanillaService', function($http, $rootScope, $routeParams) {	    	
    	   
	this.id=0;
	this.I18n;
	
	this.loadI18n = function() {    		    		
		return $http({
	        method: 'GET',
	        url: WEB_SERVER+'Intermediario/FmrI18n/listModulo.json',
	        params: {modulo: 'FMT_AUDITORIA,FMT_ESTADO,FMT_ADJUNTO' }
	     });
	 } 
	
	this.setI18n = function(I18n) {
        this.I18n = I18n;
	};
	
	this.getI18n = function() {
        return this.I18n;
	};
	
	this.getUser = function() {    
		return $http({
	        method: 'GET',
	        url: INTERMEDIARIO_WEB_SERVER+'Intermediario/User.json'
	     });
	 }

	this.loadData = function() {    
		return $http({
	        method: 'GET',
	        url: WEB_SERVER+'Intermediario/FrmFormato/loadData.json',
	        params: {formcons: $routeParams.PlanillaId}
	     });
	 }
	
	this.getParams = function(vefocons) {    		    		
		return $http({
	        method: 'GET',
	        url:  WEB_SERVER+'Intermediario/FrmCampo/campos.json', 
	        params: {campvefo: vefocons}
	     });
	 } 
	
	this.getData = function(campos, vefocons, user, pageSize, page, order, filter) { 
		if(user!=0)
			return $http({
				method: 'GET', 
		        url: WEB_SERVER+'Intermediario/FmtFormregi/loadFormatos.json',
		        params: {vefocons: vefocons, user: user, pageSize: pageSize, page: page, order: order, filter: filter},
		     });
	 }    			
	 
	this.insertRecord = function(formData, vefocons, user) {    
		return $http({
	        method: 'POST', 
	        url: WEB_SERVER+'Intermediario/FmtFormregi/insertRecord.json',
	        data: formData,
	        params: {vefocons: vefocons, user: user},
	        transformRequest: angular.identity,
            headers: {'Content-Type': undefined, 'Content-Transfer-Encoding': 'utf-8'}
	     });
	 }
	
	this.updateRecord = function(formData, forecons, user, vefocons) {    	
		return $http({
	        method: 'POST', 
	        url: WEB_SERVER+'Intermediario/FmtFormregi/updateRecord.json',
	        data: formData,
	        params: {forecons: forecons, user: user, vefocons: vefocons},
	        transformRequest: angular.identity,
            headers: {'Content-Type': undefined, 'Content-Transfer-Encoding': 'utf-8'}
	     });
	 }
	
	this.getCombo = function(consultaId) {    
		return $http({
	        method: 'GET',
	        url: WEB_SERVER+'FrmConsulta/listComboDynamic.json',
	        params: {conscons: consultaId}
	     });
	 }
	
	//Children
	this.prepForLoadI18n = function() {	                                
        $rootScope.$broadcast('handleBroadcastAuditoriaI18n');
        $rootScope.$broadcast('handleBroadcastEstadoI18n');
        $rootScope.$broadcast('handleBroadcastAdjuntoI18n');
    };
        	
	this.prepForLoad = function(id) {
        this.id = id;
        this.loadChildren();
	};
	
	this.loadChildren= function() {
        $rootScope.$broadcast('handleBroadcastAuditoria');
        $rootScope.$broadcast('handleBroadcastEstado');
        $rootScope.$broadcast('handleBroadcastAdjunto');
    };
    
    this.getDataAuditoria = function(pageSize, page, id) {  
		if(id!=0)
		{
    		return $http({
    	        method: 'GET',
    	        url: WEB_SERVER+'Intermediario/FmtAuditoria/listAll.json',
    	        params: {page: page, pageSize: pageSize, forecons: id }
    	     });
		}
	 }
    
    this.getDataEstado = function(pageSize, page, id) {  
		if(id!=0)
		{
    		return $http({
    	        method: 'GET',
    	        url: WEB_SERVER+'Intermediario/FmtEstado/listAll.json',
    	        params: {page: page, pageSize: pageSize, forecons: id}
    	     });
		}
	 }
    
    this.getDataAdjunto = function(id) {  
		if(id!=0)
		{
    		return $http({
    	        method: 'GET',
    	        url: WEB_SERVER+'Intermediario/FmtAdjunto/listAdjunto.json',
    	        params: {forecons: id },
    	        responseType: 'arraybuffer',
    	        headers: { 'Accept': 'application/pdf' },
    	     });
		}
	 }
});    	