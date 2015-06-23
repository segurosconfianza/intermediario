FrmMainApp.directive('customGrid', function($compile) {

	  return {
	    restrict: 'E',
	    template: '<div class="gridStyle" ng-grid="gridOptions"></div>',
	    scope : { cols : '=', selectedItems : '=', customOptions : '=', evento : '@', eventoGrid : '@', icons : '='}, 
	    replace : false,
	    transclude : false,
	    controller : controller
	  };

	  function controller($scope, $attrs) {
		  
		$scope.searchQuery = [];
		$scope.gridOptions = {};
		
	    //Variables de la grid
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
	    
	    var customOptions = $scope.customOptions; 

	    var fixedOptions = {
		  	      columnDefs  : 'cols',
		  	      data        : 'myData'		  	     
		  	    };
	    
	    var filterBarPluginScope = {};
	    var filterBarPluginGrid = {};
	    
	    //to support multiple grids at the same page
	    var filterBarPlugin = {
            init: function(scope, grid) {
            	filterBarPluginScope = scope;
            	filterBarPluginGrid = grid;                
            },
            scope: undefined,
            grid: undefined,
	    };
	    
	    var defaultOptions = {
  	        columnDefs:'columnDefs',
  	        data: 'myData',
            enablePaging: true,
            enableColumnResize: true,
            filterOptions: $scope.filterOptions,
            headerRowHeight: 85,
            multiSelect: false,
            pagingOptions: $scope.pagingOptions,
            plugins: [filterBarPlugin],
            selectedItems: [],
            showFooter: true,
            showFilter : true,
            showColumnMenu: true,
            showGroupPanel: true,
            showSelectionCheckbox : false,
            totalServerItems:'totalServerItems'            
  	    };		  	    	    	     	   
	    
	    $scope.$watch('pagingOptions', function (newVal, oldVal) {
	        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
	        	$scope.$emit('gridEvento', $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, "order by "+$scope.gridOptions.sortInfo.fields+" "+$scope.gridOptions.sortInfo.directions);
	        }
	    }, true);
	    
	    $scope.$watch('filterOptions', function (newVal, oldVal) {
	        if (newVal !== oldVal) {
	          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
	        }
	    }, true);
	    
	  //Funciones de la grid
		$scope.setPagingData = function(data, page, pageSize){	            
	        $scope.myData = data;
	        if (!$scope.$$phase) {
	            $scope.$apply();
	        }
	    };	    		
	    
	    angular.extend($scope.gridOptions, defaultOptions);
	    angular.extend($scope.gridOptions, customOptions);
	    angular.extend($scope.gridOptions, fixedOptions);
	    
	    //Evento para cuando se da en el boton lupa
	    $scope.executeQuery= function(){
	    	var searchQuery="";
	    	$scope.searchQuery=[];
	    	
	    	angular.forEach(filterBarPluginScope.columns, function(col) {
                if (col.visible && col.filterText)                         	
                    $scope.searchQuery.push({campo: col.field, tipo: "LIKE", val1: "%"+col.filterText+"%", tipodato: "String"});
                else if (col.visible && col.filterDateSince && col.filterDateUntil)                         	
                    $scope.searchQuery.push({campo: col.field, tipo: "BETWEEN", val1: col.filterDateSince+" 00:00:00", val2: col.filterDateUntil+" 00:00:00", tipodato: "Date"});
                else if (col.visible && col.filterDateSince)                         	
                    $scope.searchQuery.push({campo: col.field, tipo: ">=", val1: col.filterDateSince+" 00:00:00", tipodato: "Date"});
                else if (col.visible && col.filterDateUntil)                         	
                    $scope.searchQuery.push({campo: col.field, tipo: "<=", val1: col.filterDateUntil+" 00:00:00", tipodato: "Date"});
                else if (col.visible && col.filterNumberSince && col.filterNumberUntil)                         	
                    $scope.searchQuery.push({campo: col.field, tipo: "BETWEEN", val1: col.filterNumberSince, val2: col.filterNumberUntil, tipodato: "Number"});
                else if (col.visible && col.filterNumberSince)                         	
                    $scope.searchQuery.push({campo: col.field, tipo: ">=", val1: col.filterNumberSince, tipodato: "Number"});
                else if (col.visible && col.filterNumberUntil)                         	
                    $scope.searchQuery.push({campo: col.field, tipo: "<=", val1: col.filterNumberUntil, tipodato: "Number"});
                
            });
	    		    	
	    	$scope.$emit($scope.evento, $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, " order by "+$scope.gridOptions.sortInfo.fields+" "+$scope.gridOptions.sortInfo.directions, $scope.searchQuery);
	    }	 
	   
    	//metodo externo de filtrado(en toda la base de datos)
    	$scope.$on('loadDataGrid', function(event, data, count, pageSize, currentPage) {     		
    		setTimeout(function () {
    			$scope.setPagingData(data, currentPage, pageSize);
	    		$scope.totalServerItems = count;
	        }, 100);
 	    });
    	
    	//metodo local de filtrado
    	$scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                                      	
    	            data = $scope.myData.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                    $scope.totalServerItems = data.length;
                }
            }, 100);
        };
        
        //llamado a la precarga de los datos
        $scope.$emit($scope.evento, $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, "order by "+$scope.gridOptions.sortInfo.fields+" "+$scope.gridOptions.sortInfo.directions, $scope.searchQuery);       
	  };	  	  
});