FrmMainApp.directive('customAlert', function($compile) {

	  return {
	    restrict: 'E',
	    template: '<div class="modal fade" id="{{nameModal}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
				  '  <div class="modal-dialog">'+
				  '  <div class="modal-content">'+
				  '    <div class="modal-header-alert">'+
				  '      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
				  '      <h4 class="modal-title" id="myModalLabel"><font color="white" ><b>INFORMACION&nbsp;&nbsp;</b></font><span class="badge"><span class="glyphicon glyphicon-exclamation-sign"> </span></span></h4>'+
				  '    </div>'+
				  '    <div class="modal-body">'+
				  '      {{labelError}}'+
				  '    </div>'+
				  '    <div class="modal-footer">'+
				  '      <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'+
				  '    </div>'+
				  '  </div>'+
				  '  </div>'+
				  '</div>',
	    scope : { nameModal: '@', labelError : '@' }, 
	    replace : false,
	    transclude : false,
	    controller : controller
	  };

	  function controller($scope, $attrs) {		  		
    	//metodo externo para mostrar la alerta
    	$scope.$on('loadDataError', function( event, labelerror) { 
    		$scope.labelError=labelerror;
    		$('#'+$scope.nameModal).modal('show');
 	    });
	  }
    	    	  	 
});