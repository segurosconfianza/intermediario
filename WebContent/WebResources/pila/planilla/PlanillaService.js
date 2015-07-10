var FrmMainApp=angular.module('FrmMainApp');

FrmMainApp.service('PlanillaService', function($http, $rootScope, $routeParams) {	    	
    	   
	this.id=0;
	this.I18n;
	
	this.loadI18n = function() {    		    		
		return $http({
	        method: 'GET',
	        url: WEB_SERVER+'Intermediario/FmrI18n/listModulo.json',
	        params: {modulo: 'FMT_FORMREGI,FMT_AUDITORIA,FMT_ESTADO,FMT_ADJUNTO,PIL_USUA,PIL_MOTIFORM' }
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
	        url: WEB_SERVER+'Intermediario/FrmConsulta/listComboDynamic.json',
	        params: {conscons: consultaId}
	     });
	 }
	
	this.getTbtablas = function(tablcodi) {    
		return $http({
	        method: 'GET',
	        url: WEB_SERVER+'Intermediario/FrmTablas/listByTablcodi.json',
	        params: {tablcodi: tablcodi}
	     });
	 }
	
	//Children
	this.prepForLoadI18n = function() {	                                
        $rootScope.$broadcast('handleBroadcastAuditoriaI18n');
        $rootScope.$broadcast('handleBroadcastEstadoI18n');
        $rootScope.$broadcast('handleBroadcastAdjuntoI18n');
        $rootScope.$broadcast('handleBroadcastMotiformI18n');
    };
        	
	this.prepForLoad = function(id) {
        this.id = id;
        this.loadChildren();
	};
	
	this.loadChildren= function() {
        $rootScope.$broadcast('handleBroadcastAuditoria');
        $rootScope.$broadcast('handleBroadcastEstado');
        $rootScope.$broadcast('handleBroadcastAdjunto');
        $rootScope.$broadcast('handleBroadcastMotiform');
    };
    
    this.getDataMotiform = function(pageSize, page, order, filter) { 
		return $http({
			method: 'GET', 
	        url: WEB_SERVER+'Intermediario/PilMotiform/listAll.json',
	        params: { pageSize: pageSize, page: page, order: order, filter: filter},
	     });
    } 
    
    this.getDataAuditoria = function(pageSize, page, order, filter) {  		
		return $http({
	        method: 'GET',
	        url: WEB_SERVER+'Intermediario/FmtAuditoria/listAll.json',
	        params: {pageSize: pageSize, page: page, order: order, filter: filter }
	     });		
	 }
    
    this.getDataEstado = function(pageSize, page, order, filter) {  		
		return $http({
	        method: 'GET',
	        url: WEB_SERVER+'Intermediario/FmtEstado/listAll.json',
	        params: {pageSize: pageSize, page: page, order: order, filter: filter}
	     });
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
    
    this.getMotivos = function() {    		    		
		return $http({
	        method: 'GET',
	        url:  WEB_SERVER+'Intermediario/PilMotivo/listAll.json', 
	        params: {pageSize: 0, page: 0}
	     });
	 } 
});    	