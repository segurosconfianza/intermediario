FrmMainApp.controller('FrmMenuController', ['$scope', 'FrmMenuService', '$sce', function ($scope, FrmMenuService, $sce) {
	    	$scope.oneAtATime = false;
	    	$scope.iframeView = false;
	    	$scope.angularView = true;
	    	$scope.iframeUrl  = "";
	    	
	    	FrmMenuService.getData().then(function(dataResponse) {
	            $scope.menu = dataResponse.data;
	        });
	    	
	    	$scope.selectedItem = {};

	        $scope.options = {};
	        
	        $scope.toggle = function(scope) {
	          scope.toggle();
	        };	        
	      
	        $scope.go = function ( path ) {
	        	window.open(path, "contenido");
	        };
	        	
	        $scope.whatClassIsIt= function(scope, hijos, durl){
	        	var clase;
	            if((hijos==null || hijos.length<1) && durl!=null)
	            	clase="glyphicon-list-alt";
	            else if(scope.collapsed)
	            	clase="glyphicon-folder-open";
	            else
	            	clase="glyphicon-folder-close";
	            return clase;
	        }
	        
	        $scope.urlVerify= function(url){
	        	if(url!=undefined){
		        	var result=url.match(/http/g);
		            if(result!=null && result=="http")
		            	return 1;		           
		            var result=url.match(/<c:/g);
		            if(result!=null && result=="<c:")
		            	return 2;
		            var result=url.match(/icono/g);
		            if(result!=null && result=="icono")
		            	return 3;
	        	}
            	return 0;
	        }
	        
	        $scope.setProject = function (id) {	        
	            $scope.iframeUrl = $sce.trustAsResourceUrl(id);
	            $scope.iframeView = true;
	            $scope.angularView = false;
	        }
	        
	        $scope.setAngular = function () {
	            $scope.iframeView = false;
	            $scope.angularView = true;
	        }
	        	        
    	}]);