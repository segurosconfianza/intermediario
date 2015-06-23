var FrmMainApp=angular.module('FrmMainApp');

FrmMainApp.controller('FmtAdjuntoController', ['$scope', '$modal', 'PlanillaService', '$sce', function($scope, $modal,PlanillaService, $sce) {	
	
	$scope.showModal = false;
	$scope.loadPdf=false;
	
	$scope.ventanaTitulo=getName(PlanillaService.getI18n(), "-", "FMT_ADJUNTO");
	
	$scope.$on('handleBroadcastAdjunto', function() {
		
		$scope.loadPdf=true;
		
		PlanillaService.getDataAdjunto(PlanillaService.id).then(function(dataResponse) {   	        	
			if(dataResponse.data.error!=undefined){
	        	alert(dataResponse.data.tituloError+': '+dataResponse.data.error);
	        	$scope.loadPdf=false;
        	}
        	else{ 
    			var file = new Blob([dataResponse.data], {type: 'application/pdf'});
    		    var fileURL = URL.createObjectURL(file);
    		    $scope.content = $sce.trustAsResourceUrl(fileURL);
    		    $scope.loadPdf=false;
        	}
        });	        
    }); 		                     	                    
	
    $scope.fixGridRendering = function() {
    	$(window).resize();
    };    

    function getName(i18n,colum,modulo){
    	var log = [];
    	angular.forEach(i18n, function(fila, index) {
    		if(fila.etincamp==colum && fila.modunomb==modulo)  
    			this.push(fila);
   		}, log);
    	
    	if(log[0]!=undefined || log[0]!=null)
    		return log[0].etinetiq;
    	return "";
    }
  }            
])