var FrmMainApp=angular.module('FrmMainApp');

FrmMainApp.controller('FmtAuditoriaController', ['$scope', 'PlanillaService',function($scope, Service) {
	
	$scope.$on('handleBroadcastAuditoria', function() {
		
		$scope.forecons = Service.id;
		
		$scope.loadMyGrid(); 	        
    }); 
	
	$scope.$on('handleBroadcastAuditoriaI18n', function() {
		
		loadI18n();	 
    }); 
    		        	    
    function loadI18n() {        	                                        	
    	
    	columns=[ { field: "audicons", displayName: getName(Service.getI18n(), "audicons", "FMT_AUDITORIA"), visible: true, headerCellTemplate: filterBetweenNumber } ,
    	          { field: "auditran", displayName: getName(Service.getI18n(), "auditran", "FMT_AUDITORIA"), visible: true, headerCellTemplate: filterBetweenNumber } ,
    	          { field: "auditabl", displayName: getName(Service.getI18n(), "auditabl", "FMT_AUDITORIA"), visible: true, headerCellTemplate: filterText } ,
    	          { field: "audicopk", displayName: getName(Service.getI18n(), "audicopk", "FMT_AUDITORIA"), visible: true, headerCellTemplate: filterText } ,
    	          { field: "audicamp", displayName: getName(Service.getI18n(), "audicamp", "FMT_AUDITORIA"), visible: true, headerCellTemplate: filterText } ,
    	          { field: "audivaan", displayName: getName(Service.getI18n(), "audivaan", "FMT_AUDITORIA"), visible: true, headerCellTemplate: filterText } ,
    	          { field: "audivanu", displayName: getName(Service.getI18n(), "audivanu", "FMT_AUDITORIA"), visible: true, headerCellTemplate: filterText }  
             ];
        $scope.columnDefs=columns;
        $scope.ventanaTitulo=getName(Service.getI18n(), "-", "FMT_AUDITORIA");
        
        $scope.gridOptions = {  
        	sortInfo:{ fields: ['audicons'], directions: ['desc']},
        	selectedItems: [],
            afterSelectionChange: function (rowItem, event) {
            	$scope.audicons = rowItem.entity.audicons; 
            	 $scope.auditran = rowItem.entity.auditran; 
            	 $scope.auditabl = rowItem.entity.auditabl; 
            	 $scope.audicopk = rowItem.entity.audicopk; 
            	 $scope.audicamp = rowItem.entity.audicamp; 
            	 $scope.audivaan = rowItem.entity.audivaan;    	                    	                    	   
            	 $scope.audivanu = rowItem.entity.audivanu;
            }
        };        
        
        $scope.directiveGrid=true;
    }
    
    function getName(i18n,colum,modulo){
    	var log = [];
    	angular.forEach(i18n, function(fila, index) {
    		if(fila.etincamp==colum && fila.modunomb==modulo)  
    			this.push(fila);
   		}, log);
    	
    	return log[0].etinetiq;        	
    }
    
    
    $scope.whatClassIsIt= function(column){
    	var log = [];
    	
    	angular.forEach($scope.columnDefs, function(fila, index) {
    		if(fila.field==column)
    			this.push(fila);
   		}, log);
    	
    	if(log[0]!=undefined)
    		return log[0].displayName;
    	else
    		return "";  
    }
        
    $scope.fixGridRendering = function() {
    	$(window).resize();
    };
    
    $scope.$on('gridEvento', function(event, pageSize, currentPage, order, searchQuery) {   
		$scope.pageSize=pageSize;
		$scope.currentPage=currentPage;
		$scope.order=order;
		$scope.searchQuery=searchQuery;
		if($scope.searchQuery==undefined)
			$scope.searchQuery=[];
		
    	if($scope.directiveGrid)
    		$scope.loadMyGrid();
    });
	
	$scope.loadMyGrid= function(){	
		
		if($scope.forecons!=undefined){
			$scope.basicSearchQuery=[{campo: 'auditabl', tipo: "IN", val1: '[FMT_FORMREGI,FMT_VALOCAMP]', tipodato: "String"},{campo: 'audicopk', tipo: "=", val1: $scope.forecons, tipodato: "Number"}];
			
			if($scope.searchQuery!=undefined)
				$scope.searchQuery=$scope.searchQuery.concat($scope.basicSearchQuery);
			else
				$scope.searchQuery=$scope.basicSearchQuery;
			
			Service.getDataAuditoria($scope.pageSize, $scope.currentPage, $scope.order, $scope.searchQuery).then(function(dataResponse) {
	    		if(dataResponse.data.error!=undefined)
	    			$scope.sendAlert(dataResponse.data.tituloError+': '+dataResponse.data.error);
	        	else 
	        		$scope.$broadcast('loadDataGrid',dataResponse.data.data, dataResponse.data.count, $scope.pageSize, $scope.currentPage);
	        });
		}
	}	
	
	 $scope.sendAlert = function(error){
			$scope.$broadcast('loadDataError', error);
		}

}            
])