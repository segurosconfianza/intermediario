FrmMainApp.service('FrmMenuService', function($http) {	    	
	    	this.getData = function() {
	    		return $http({
	    	        method: 'GET',
	    	        url: WEB_SERVER+'Intermediario/listMenu.json'	    	       
	    	     });
	    	 }
	    });