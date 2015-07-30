var FrmMainApp=angular.module('FrmMainApp');

FrmMainApp.controller('FmtEstadoController', ['$scope', 'PlanillaService',function($scope, Service) {
	
	$scope.$on('handleBroadcastAuditoria', function() {
		
		$scope.forecons = Service.id;
		
		$scope.loadMyGrid(); 
    });
	
	$scope.$on('handleBroadcastAuditoriaI18n', function() {
		
		loadI18n();	 
    }); 
    	
	function loadI18n() {        	                                        	
    	
    	columns=[ { field: "estacons", displayName: getName(Service.getI18n(), "estacons", "FMT_ESTADO"), visible: true, headerCellTemplate: filterBetweenNumber } ,
    	          { field: "estafore", displayName: getName(Service.getI18n(), "estafore", "FMT_ESTADO"), visible: true, headerCellTemplate: filterBetweenNumber } ,
    	          { field: "estafech", displayName: getName(Service.getI18n(), "estafech", "FMT_ESTADO"), visible: true, headerCellTemplate: filterBetweenDate } ,
    	          { field: "estauser", displayName: getName(Service.getI18n(), "estauser", "FMT_ESTADO"), visible: true, headerCellTemplate: filterText } ,
    	          { field: "estaesta", displayName: getName(Service.getI18n(), "estaesta", "FMT_ESTADO"), visible: true, headerCellTemplate: filterText } 
             ];
        $scope.columnDefs=columns;
        $scope.ventanaTitulo=getName(Service.getI18n(), "-", "FMT_ESTADO");
        
        $scope.gridOptions = {  
        	sortInfo:{ fields: ['estacons'], directions: ['desc']},
        	selectedItems: [],
            afterSelectionChange: function (rowItem, event) {
            	 $scope.estacons = rowItem.entity.estacons; 
            	 $scope.estafore = rowItem.entity.estafore; 
            	 $scope.estafech = rowItem.entity.estafech; 
            	 $scope.estauser = rowItem.entity.estauser; 
            	 $scope.estaesta = rowItem.entity.estaesta; 
            }
        };        
        
        $scope.directiveGrid=true;
           
        Service.getTbtablas('foreesta').then(function(dataResponse) { 
        	if(dataResponse.data.error!=undefined)
        		$scope.sendAlert(dataResponse.data.tituloError+': '+dataResponse.data.error);
	    	else{
	    		$scope.optionsEstado=dataResponse.data;
	    	}
        });
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
			$scope.basicSearchQuery=[{campo: 'estafore', tipo: "=", val1: $scope.forecons, tipodato: "Number"}];
			
			if($scope.searchQuery!=undefined)
				$scope.searchQuery=$scope.searchQuery.concat($scope.basicSearchQuery);
			else
				$scope.searchQuery=$scope.basicSearchQuery;
			
			Service.getDataEstado($scope.pageSize, $scope.currentPage, $scope.order, $scope.searchQuery).then(function(dataResponse) {
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