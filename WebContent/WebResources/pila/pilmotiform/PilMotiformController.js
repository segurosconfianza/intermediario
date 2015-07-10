var FrmMainApp=angular.module('FrmMainApp');

FrmMainApp.controller('PilMotiformController', ['$scope', 'PlanillaService',function($scope, Service) {    	   		
	
	$scope.$on('handleBroadcastMotiform', function() {
			
		$scope.forecons = Service.id;
		
		$scope.loadMyGrid();        
    });

	$scope.$on('handleBroadcastMotiformI18n', function() {
		
		loadI18n();	 
    }); 
	
	function loadI18n() {        	                                        	
    	
    	columns=[ 	{ field: "mofocons", displayName: getName(Service.getI18n(), "mofocons",  "PIL_MOTIFORM"), visible: true, headerCellTemplate: filterBetweenNumber } ,
					{ field: "mofofore", displayName: getName(Service.getI18n(), "mofofore",  "PIL_MOTIFORM"), visible: true, headerCellTemplate: filterBetweenNumber } ,
					{ field: "mofodevo", displayName: getName(Service.getI18n(), "mofodevo",  "PIL_MOTIFORM"), visible: true, headerCellTemplate: filterBetweenNumber } ,
					{ field: "mofodesc", displayName: getName(Service.getI18n(), "mofodesc",  "PIL_MOTIFORM"), visible: true, headerCellTemplate: filterText } ,
					{ field: "mofofech", displayName: getName(Service.getI18n(), "mofofech",  "PIL_MOTIFORM"), visible: true, headerCellTemplate: filterBetweenDate } ,
					{ field: "mofouser", displayName: getName(Service.getI18n(), "mofouser",  "PIL_MOTIFORM"), visible: true, headerCellTemplate: filterText }  
             ];
        $scope.columnDefs=columns;
        $scope.ventanaTitulo=getName(Service.getI18n(), "-", "PIL_MOTIFORM");
        
        $scope.gridOptions = {  
        	sortInfo:{ fields: ['mofocons'], directions: ['desc']},
        	selectedItems: [],
            afterSelectionChange: function (rowItem, event) {
            	$scope.mofocons = rowItem.entity.mofocons; 
            	 $scope.mofofore = rowItem.entity.mofofore; 
            	 $scope.mofodevo = rowItem.entity.mofodevo; 
            	 $scope.mofodesc = rowItem.entity.mofodesc; 
            	 $scope.mofofech = rowItem.entity.mofofech; 
            	 $scope.mofouser = rowItem.entity.mofouser;    	                    	                    	   
            }
        };        
        
        $scope.directiveGrid=true;
        
        Service.getMotivos().then(function(dataResponse) {        	                                        	
			$scope.motivos=dataResponse.data.data;
			$scope.optionsMotivo=[];	
    		angular.forEach($scope.motivos, function(reg) {
    			$scope.optionsMotivo.push({value:reg.devocons, label:reg.devonomb});	
        	});
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
		
    	if($scope.directiveGrid)
    		$scope.loadMyGrid();
    });
	
	$scope.loadMyGrid= function(){	
		
		if($scope.forecons!=undefined){
			$scope.basicSearchQuery=[{campo: 'mofofore', tipo: "=", val1: $scope.forecons, tipodato: "Number"}];
			
			if($scope.searchQuery!=undefined)
				$scope.searchQuery=$scope.searchQuery.concat($scope.basicSearchQuery);
			else
				$scope.searchQuery=$scope.basicSearchQuery;
			
			Service.getDataMotiform($scope.pageSize, $scope.currentPage, $scope.order, $scope.searchQuery).then(function(dataResponse) {
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
