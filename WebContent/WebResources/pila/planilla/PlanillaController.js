var FrmMainApp=angular.module('FrmMainApp');

FrmMainApp.controller('PlanillaController', ['$scope', 'PlanillaService', '$filter', '$upload', function($scope, Service, $filter, $upload) {
	
	//Variables para los campos dinamicos
	$scope.Campos = {};
	$scope.options={};	
	$scope.paramsSend={};	
	
	//botones de los formularios modal
	$scope.buttonNew=false;
	$scope.buttonEdit=false;
	
	//Evento del calendario
	$scope.open = function($event,opened) {
		
	    $event.preventDefault();
	    $event.stopPropagation();	    
	    
	    $scope[opened] = true;
	}
	
	//Funcion para inicializar los datos en la carga de la pagina
	$scope.init = function() {
		Service.getUser().then(function(dataResponse) {
			$scope.intermediarioUser=dataResponse.data;
		});
		
		Service.loadData().then(function(dataResponse) {  
			if(dataResponse.data.error!=undefined)
	    		alert(dataResponse.data.tituloError+': '+dataResponse.data.error);
	    	else{
	    		$scope.title=dataResponse.data.titulo;
	    		$scope.description=dataResponse.data.descri;
	    		$scope.version=dataResponse.data.version.vefocons;
	    		
	    		//una vez cargada la version podemos cargar los campos de esa version del formato
	    		Service.getParams($scope.version).then(function(dataResponse) {  
	    	    	
	    	    	if(dataResponse.data.error!=undefined)
	    	    		alert(dataResponse.data.tituloError+': '+dataResponse.data.error);
	    	    	else{
	    	    		$scope.columns=dataResponse.data.data;
	    	    		columns=[];
	    	    		columns[0]={field: "forecons", displayName: "Consecutivo", headerCellTemplate: filterBetweenNumber};
	    	    		columns[1]={field: "forefech", displayName: "Fecha", headerCellTemplate: filterBetweenDate};
	    	    		columns[2]={field: "foreesta", displayName: "Estado", visible: false};
	    	    		columns[3]={field: "tablvast", displayName: "Estado", headerCellTemplate: filterText};
	    	    		//recorro los campos para cargar los data de los combos
	    	    		for(i=0; i<$scope.columns.length;i++){    			
	    	    			//si el tipo de dato es columna
	    	    			if($scope.columns[i].paratida=='CS' || $scope.columns[i].paratida=='CI'){    				    				    				
	    	    				//se pasa el codigo del combo
	    	    				Service.getCombo($scope.columns[i].paracomb).then(function(dataResponse) {    					    					
	    	    					if(dataResponse.data.error!=undefined)
	    	    			    		alert(dataResponse.data.tituloError+': '+dataResponse.data.error);
	    	    			    	else{    			   
	    	    			    		//se carga la data en los options
	    	    			    		$scope.options[dataResponse.data.combo] = dataResponse.data.data;      			    		
	    	    			    	}
	    	    				});    				    				 		    				    		
	    	    			}
	    	    			
	    	    			columns[i+4]={field: $scope.columns[i].campnomb, displayName: $scope.columns[i].camplabe};
	    	    		}
	    	    		
	    	    		$scope.columnDefs=columns;	
	    	    		$scope.directiveGrid=true;
	    	    		
	    	    		$scope.basicSearchQuery=[{campo: 'forevefo', tipo: "=", val1: $scope.version, tipodato: "Number"},{campo: 'foreuser', tipo: "=", val1: $scope.intermediarioUser, tipodato: "String"}];
	    	    	}
	    	    });	
	    	}
		});
		
		Service.loadI18n().then(function(dataResponse) {        	                                        	
       	 
			Service.setI18n(dataResponse.data);
			Service.prepForLoadI18n();
        });
	}
	
    $scope.gridOptions = {  
    	sortInfo:{ fields: ['forecons'], directions: ['desc']},
    	selectedItems: [],
        afterSelectionChange: function (rowItem, event) {
        	for(i=0; i<$scope.columns.length;i++){            		
        		if($scope.columns[i].camptipo=='O' || $scope.columns[i].camptipo=='F')
        			$scope.Campos[$scope.columns[i].campnomb]=parseFloat(rowItem.entity[$scope.columns[i].campnomb].toString(),20);
        		else
        			$scope.Campos[$scope.columns[i].campnomb]=rowItem.entity[$scope.columns[i].campnomb];
        	}
        	$scope.Campos["forecons"]=rowItem.entity["forecons"];
        	
        	Service.prepForLoad(rowItem.entity.forecons);      
        }
    };
     
   //Funciones de las CRUD
   $scope.createRecordForm= function(){
	    $scope.buttonNew=true;
		$scope.buttonEdit=false;
		
		for(i=0; i<$scope.columns.length;i++){
    		$scope.Campos[$scope.columns[i].campnomb]="";
    	}
    }                
    
	$scope.loadDatatoForm= function(){			
		if($scope.gridOptions.selectedItems.length>0){
			$scope.buttonNew=false;
			$scope.buttonEdit=true;
		}
		else
			alert("Favor seleccione una fila");
    }
	
	$scope.insertRecord= function(file){			
		
		var verify=true;		
		$scope.camposSendData={};	
		
		for(i=0; i<$scope.columns.length;i++){
			//Tomar solo los datos de salida para enviarlos a la consulta
			if($scope.Campos[$scope.columns[i].campnomb]==undefined){
				$scope.camposSendData[$scope.columns[i].campnomb]=null;
			}
			else if($scope.columns[i].camptipo=='D'){//date
				if(typeof $scope.Campos[$scope.columns[i].campnomb]=="string"){
					//console.log("string");
					$scope.camposSendData[$scope.columns[i].campnomb]=$scope.Campos[$scope.columns[i].campnomb];
				}
				else{
					//console.log("no string");
					$scope.camposSendData[$scope.columns[i].campnomb]=$filter('date')(new Date($scope.Campos[$scope.columns[i].campnomb]), 'dd/MM/yyyy');
				}
			} else if($scope.columns[i].camptipo=='T'){//timestamp
				if(typeof $scope.Campos[$scope.columns[i].campnomb]=="string"){
					//console.log("string");
					$scope.camposSendData[$scope.columns[i].campnomb]=$scope.Campos[$scope.columns[i].campnomb];
				}
				else{
					//console.log("no string");
					$scope.camposSendData[$scope.columns[i].campnomb]=$filter('date')(new Date($scope.Campos[$scope.columns[i].campnomb]), 'dd/MM/yyyy HH:mm:ss');
				}
			} else	{
				$scope.camposSendData[$scope.columns[i].campnomb]=$scope.Campos[$scope.columns[i].campnomb];
			}
		}
		
		//validar si subieron adjuntos
		if(file==undefined || file.length<1){
			alert("Datos vacios o incorrectos: Favor adjunte el/los archivo(s) de soporte");
			verify=false;			
		}	
		//validar si subieron solo 1 adjunto
		else if(file.length>1){
			alert("Solo puede adjuntar un archivo PDF");
			verify=false;			
		}	
		//validar si subieron solo 1 adjunto tipo pdf
		else if(file.length==1){
			for(i=0;i<file.length;i++){
				if(!(file[i].type=="application/pdf")){
					alert("Solo puede adjuntar un archivo PDF");
					verify=false;
				}
			}
						
		}
		else if(verify){		
						
			formData=new FormData();
			for(i=0;i<file.length;i++){				
				formData.append("file", file[i]);
			}
			
			formData.append("paramsData", angular.toJson($scope.camposSendData));
						
			Service.insertRecord(formData, $scope.version, $scope.intermediarioUser).then(function(dataResponse) {
				 	      
        		alert(dataResponse.data);	        				        			
	        	
        		$scope.createRecordForm();
        		
        		$scope.loadMyGrid();
	        }); 						
		}else{ 
			alert("Datos vacios o incorrectos: Favor diligencie todos los campos");
		}
    }
	
	$scope.updateRecord= function(file){			
		
		var verify=true;		
		$scope.camposSendData={};	
		
		for(i=0; i<$scope.columns.length;i++){
			//Verificar si los datos requeridos cumplen con haber sido digitados
			if($scope.Campos[$scope.columns[i].camprequ]==1 && ($scope.Campos[$scope.columns[i].campnomb]==undefined || $scope.Campos[$scope.columns[i].campnomb]=='') && $scope.Campos[$scope.columns[i].campnomb]!=0){
				verify=false;
				break;
			}
			
			//Tomar solo los datos de salida para enviarlos a la consulta
			if($scope.Campos[$scope.columns[i].campnomb]==undefined){
				$scope.camposSendData[$scope.columns[i].campnomb]=null;
			}
			else if($scope.columns[i].camptipo=='D'){//date
				if(typeof $scope.Campos[$scope.columns[i].campnomb]=="string"){
					//console.log("string");
					$scope.camposSendData[$scope.columns[i].campnomb]=$scope.Campos[$scope.columns[i].campnomb];
				}
				else{
					//console.log("no string");
					$scope.camposSendData[$scope.columns[i].campnomb]=$filter('date')(new Date($scope.Campos[$scope.columns[i].campnomb]), 'dd/MM/yyyy');
				}
			} else if($scope.columns[i].camptipo=='T'){//timestamp
				if(typeof $scope.Campos[$scope.columns[i].campnomb]=="string"){
					//console.log("string");
					$scope.camposSendData[$scope.columns[i].campnomb]=$scope.Campos[$scope.columns[i].campnomb];
				}
				else{
					//console.log("no string");
					$scope.camposSendData[$scope.columns[i].campnomb]=$filter('date')(new Date($scope.Campos[$scope.columns[i].campnomb]), 'dd/MM/yyyy HH:mm:ss');
				}
			} else	{
				$scope.camposSendData[$scope.columns[i].campnomb]=$scope.Campos[$scope.columns[i].campnomb];
			}
		}
		
			
		if(verify){		
			formData=new FormData();
			for(i=0;i<file.length;i++){
				formData.append("file", file[i]);				
			}
			
			formData.append("paramsData", angular.toJson($scope.camposSendData));
						
			Service.updateRecord(formData, $scope.Campos["forecons"], $scope.intermediarioUser, $scope.version).then(function(dataResponse) {
				 	      
        		alert(dataResponse.data);	        				        			
	        	
        		$scope.loadMyGrid();
	        }); 						
		}else{ 
			alert("Datos vacios o incorrectos: Favor diligencie todos los campos");
		}
    }
		
	$scope.$on('gridEvento', function(event, pageSize, currentPage, order, searchQuery) {   
		console.log('gridEvento');
		$scope.pageSize=pageSize;
		$scope.currentPage=currentPage;
		$scope.order=order;
		$scope.searchQuery=searchQuery;
		
    	if($scope.directiveGrid)
    		$scope.loadMyGrid();
    });
	
	$scope.loadMyGrid= function(){	
		
		Service.getData($scope.columns, $scope.version, $scope.intermediarioUser, $scope.pageSize, $scope.currentPage, $scope.order, $scope.searchQuery.concat($scope.basicSearchQuery)).then(function(dataResponse) {
    		if(dataResponse.data.error!=undefined)
    			alert(dataResponse.data.tituloError+': '+dataResponse.data.error);
        	else 
        		$scope.$broadcast('loadDataGrid',dataResponse.data.data, dataResponse.data.count, $scope.pageSize, $scope.currentPage);
        });
	}
 }            
])