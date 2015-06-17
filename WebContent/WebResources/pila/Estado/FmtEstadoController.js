var FrmMainApp=angular.module('FrmMainApp');

FrmMainApp.controller('FmtEstadoController', ['$scope', '$modal', 'PlanillaService',function($scope, $modal,PlanillaService) {
	
	$scope.showModal = false;
	
	$scope.$on('handleBroadcastAuditoria', function() {
		
		$scope.forecons = PlanillaService.forecons;
		
        PlanillaService.getDataEstado(50, 1, PlanillaService.id).then(function(dataResponse) {   	        	
	        if(dataResponse.data.error!=undefined){
	        	alert(dataResponse.data.tituloError+': '+dataResponse.data.error);	       
        	}
        	else{ 
        		if(dataResponse.data.data!=null){
        			$scope.setPagingData(dataResponse.data.data,50,1);
        			$scope.totalServerItems = dataResponse.data.count;
        		}
        	}
        });	        
    }); 
	
	$scope.$on('handleBroadcastAuditoriaI18n', function() {
		
		loadI18n();	 
    }); 
    	
	$scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    
    $scope.totalServerItems = 0;
    
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20, 50],
        pageSize: 50,
        currentPage: 1
    };  
    
    $scope.setPagingData = function(data, page, pageSize){	            
        $scope.myData = data;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
    	
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                
                PlanillaService.getDataEstado(pageSize, page, PlanillaService.id).then(function(dataResponse) {
                	if(dataResponse.data.error!=undefined){
                		alert(dataResponse.data.tituloError+': '+dataResponse.data.error);
                	}
                	else{ 
        	            data = dataResponse.data.data.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data,page,pageSize);
                        $scope.totalServerItems = dataResponse.data.count;
                	}
    	        });   
            } else {
            	PlanillaService.getDataEstado(pageSize, page, PlanillaService.id).then(function(dataResponse) {   
            		if(dataResponse.data.error!=undefined){
            			alert(dataResponse.data.tituloError+': '+dataResponse.data.error);
            		}
                	else{ 
                		if(dataResponse.data.data!=null){
                			$scope.setPagingData(dataResponse.data.data,page,pageSize);
                			$scope.totalServerItems = dataResponse.data.count;
                		}
                	}
    	        });    
            }
        }, 100);
    };
	
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
	        
          
    function getName(i18n,colum,modulo){
    	var log = [];
    	angular.forEach(i18n, function(fila, index) {
    		if(fila.etincamp==colum && fila.modunomb==modulo)  
    			this.push(fila);
   		}, log);
    	
    	return log[0].etinetiq;        	
    }
    
    function loadI18n() {        	                                        	
    	
    	columns=[ { field: "estacons", displayName: getName(PlanillaService.getI18n(), "estacons", "FMT_ESTADO"), visible: true } ,
    	          { field: "estafore", displayName: getName(PlanillaService.getI18n(), "estafore", "FMT_ESTADO"), visible: true } ,
    	          { field: "estafech", displayName: getName(PlanillaService.getI18n(), "estafech", "FMT_ESTADO"), visible: true } ,
    	          { field: "estauser", displayName: getName(PlanillaService.getI18n(), "estauser", "FMT_ESTADO"), visible: true } ,
    	          { field: "estaesta", displayName: getName(PlanillaService.getI18n(), "estaesta", "FMT_ESTADO"), visible: true } 
             ];
        $scope.columnDefs=columns;
        $scope.ventanaTitulo=getName(PlanillaService.getI18n(), "-", "FMT_ESTADO");
    }
    
    $scope.whatClassIsIt= function(column){
    	var log = [];
    	
    	angular.forEach($scope.columnDefs, function(fila, index) {
    		if(fila.field==column)
    			this.push(fila);
   		}, log);
    	
    	return log[0].displayName;
    }
    
    $scope.gridOptions = {
            data: 'myData',
            enablePaging: true,
            showFooter: true,
            totalServerItems:'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            multiSelect: false,
            columnDefs:'columnDefs',
            selectedItems: [],
            showColumnMenu: true,
            enableColumnResize: true,
            afterSelectionChange: function (rowItem, event) {                	
            	 $scope.estacons= rowItem.entity.estacons,
	           	 $scope.estafore= rowItem.entity.estafore,
	           	 $scope.estafech= rowItem.entity.estafech,
	           	 $scope.estauser= rowItem.entity.estauser,
	           	 $scope.estaesta= rowItem.entity.estaesta               
            }
    };                              	                     
	
    $scope.fixGridRendering = function() {
    	$(window).resize();
    };

    }            
    ])