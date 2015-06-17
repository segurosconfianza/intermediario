var FrmMainApp=angular.module('FrmMainApp', ['ui.tree', 'ngGrid', 'ngRoute', 'ui.bootstrap', 'ngFileUpload' ]);  

FrmMainApp.config(['$routeProvider',
   	function($routeProvider) {
   	  $routeProvider.   	    
   	    when('/Planilla/:PlanillaId', {
  	      templateUrl: function(params) {
  	          return  INTERMEDIARIO_WEB_SERVER+'Intermediario/Formato/';
  	      },
  	      controller: 'PlanillaController'
  	    }).	  
   	    otherwise({
   	      
   	    });
}]);