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
		
		Service.loadI18n().then(function(dataResponse) {        	                                        	
	       	 
			Service.setI18n(dataResponse.data);
			Service.prepForLoadI18n();
        });
		
		Service.loadData().then(function(dataResponse) {  
			if(dataResponse.data.error!=undefined)
				$scope.sendAlert(dataResponse.data.tituloError+': '+dataResponse.data.error);
	    	else{
	    		$scope.title=dataResponse.data.titulo;
	    		$scope.description=dataResponse.data.descri;
	    		$scope.version=dataResponse.data.version.vefocons;
	    		
	    		Service.getTbtablas('foreesta').then(function(dataResponse) {  
	    			if(dataResponse.data.error!=undefined)
	    				$scope.sendAlert(dataResponse.data.tituloError+': '+dataResponse.data.error);
	    	    	else{
	    	    		$scope.tbforeesta=dataResponse.data;
	    	    		$scope.iconForeesta={};	
	    	    		angular.forEach($scope.tbforeesta, function(reg) {
	    	    			$scope.iconForeesta[reg.label]=reg.icon;	
	    	        	});
	    	    		
	    	    		//una vez cargada la version podemos cargar los campos de esa version del formato
	    	    		Service.getParams($scope.version).then(function(dataResponse) {  
	    	    	    	
	    	    	    	if(dataResponse.data.error!=undefined)
	    	    	    		$scope.sendAlert(dataResponse.data.tituloError+': '+dataResponse.data.error);
	    	    	    	else{
	    	    	    		
	    	    	    		$scope.columns=dataResponse.data.data;
	    	    	    		columns=[];
	    	    	    		columns[0]={field: "forecons", displayName: getName(Service.getI18n(), "forecons"), headerCellTemplate: filterBetweenNumber};
	    	    	    		columns[1]={field: "forefech", displayName: getName(Service.getI18n(), "forefech"), headerCellTemplate: filterBetweenDate};
	    	    	    		columns[2]={field: "foreesta", displayName: getName(Service.getI18n(), "foreesta"), visible: false};
	    	    	    		columns[3]={field: "tablvast", displayName: getName(Service.getI18n(), "foreesta"), headerCellTemplate: filterText, cellTemplate: '<div><img src="{{icons[row.getProperty(col.field)]}}" width="20" height="20"></img>{{row.getProperty(col.field)}}</div>' };
	    	    	    		//recorro los campos para cargar los data de los combos
	    	    	    		angular.forEach($scope.columns, function(reg, index) {
			    	    			//si el tipo de dato es columna
	    	    	    			if(reg.camptipo=='CS' || reg.camptipo=='CI'){    				    				    				
	    	    	    				//se pasa el codigo del combo
	    	    	    				Service.getCombo(reg.campcomb).then(function(dataResponse) {    					    					
	    	    	    					if(dataResponse.data.error!=undefined)
	    	    	    						$scope.sendAlert(dataResponse.data.tituloError+': '+dataResponse.data.error);
	    	    	    			    	else{    			   
	    	    	    			    		//se carga la data en los options
	    	    	    			    		$scope.options[dataResponse.data.combo] = dataResponse.data.data;      			    		
	    	    	    			    	}
	    	    	    				});    				    				 		    				    		
	    	    	    			}
	    	    	    			
	    	    	    			if(reg.camptipo=="D" || reg.camptipo=="T")
	    	    	    				columns[index+4]={field: reg.campnomb, displayName: reg.camplabe, headerCellTemplate: filterBetweenDate};
	    	    	    			else if(reg.camptipo=="O" || reg.camptipo=="I" || reg.camptipo=="L" || reg.camptipo=="F")
	    	    	    				columns[index+4]={field: reg.campnomb, displayName: reg.camplabe, headerCellTemplate: filterBetweenNumber, cellTemplate:'<div>{{row.getProperty(col.field) | number}}</div>'};
	    	    	    			else if(reg.camptipo=="B")
	    	    	    				columns[index+4]={field: reg.campnomb, displayName: reg.camplabe, headerCellTemplate: filterBetweenNumber};
	    	    	    			else
	    	    	    				columns[index+4]={field: reg.campnomb, displayName: reg.camplabe, headerCellTemplate: filterText};
			    	        	});	
	    	    	    		
	    	    	    		$scope.columnDefs=columns;	
	    	    	    		$scope.directiveGrid=true;
	    	    	    		
	    	    	    		$scope.basicSearchQuery=[{campo: 'forevefo', tipo: "=", val1: $scope.version, tipodato: "Number"},{campo: 'foreuser', tipo: "=", val1: $scope.intermediarioUser, tipodato: "String"}];
	    	    	    	}
	    	    	    });	
	    	    	}	    			
	    		});	    			    		    			    	
	    	}
		});				
	}
	
    $scope.gridOptions = {  
    	sortInfo:{ fields: ['forecons'], directions: ['desc']},
    	selectedItems: [],
        afterSelectionChange: function (rowItem, event) {
        	angular.forEach($scope.columns, function(reg) {
        		if(reg.camptipo=='O' || reg.camptipo=='F')
        			$scope.Campos[reg.campnomb]=parseFloat(rowItem.entity[reg.campnomb].toString(),20);
        		else
        			$scope.Campos[reg.campnomb]=rowItem.entity[reg.campnomb];
        	});
        	
        	$scope.Campos["forecons"]=rowItem.entity["forecons"];
        	
        	Service.prepForLoad(rowItem.entity.forecons);      
        }
    };                  
    
    function getName(i18n,colum){
    	var log = [];
    	angular.forEach(i18n, function(fila, index) {
    		if(fila.etincamp==colum)  
    			this.push(fila);
   		}, log);
    	
    	if(log[0]!=null)
    		return log[0].etinetiq;
    	else 
    		return "";
    }
    
    $scope.whatClassIsIt= function(column){
    	var log = [];
    	
    	angular.forEach($scope.columnDefs, function(fila, index) {
    		if(fila.field==column)
    			this.push(fila);
   		}, log);
    	
    	if(log[0]!=null)
    		return log[0].displayName;
    	else 
    		return "";
    } 
    
   //Funciones de las CRUD
   $scope.createRecordForm= function(){
	    $scope.buttonNew=true;
		$scope.buttonEdit=false;
		
		angular.forEach($scope.columns, function(reg) {
    		$scope.Campos[reg.campnomb]="";
    	});
    }                
    
	$scope.loadDatatoForm= function(){			
		if($scope.gridOptions.selectedItems.length>0){
			$scope.buttonNew=false;
			$scope.buttonEdit=true;
		}
		else
			$scope.sendAlert("Favor seleccione una fila");
    }
	
	$scope.insertRecord= function(file){			
		
		var verify=true;		
		$scope.camposSendData={};	
				
		if(!$scope.validatePeriod()){
			verify=false;
			$scope.sendAlert("El año y el mes que reporta no puede ser superior al actual");
		}
		//validar si subieron adjuntos
		else if(file==undefined || file.length<1){
			$scope.sendAlert("Datos vacios o incorrectos: Favor adjunte el/los archivo(s) de soporte");
			verify=false;			
		}	
		//validar si subieron solo 1 adjunto
		else if(file.length>1){
			$scope.sendAlert("Solo puede adjuntar un archivo PDF");
			verify=false;			
		}	
		//validar si subieron solo 1 adjunto tipo pdf
		else if(file.length==1){
			angular.forEach(file, function(reg) {
				if(!(reg.type=="application/pdf")){
					$scope.sendAlert("Solo puede adjuntar un archivo PDF");
					verify=false;
				}
			});
		}
		
		if(verify && $scope.prepareSendData()){		
			formData=new FormData();
			
			angular.forEach(file, function(reg) {
				formData.append("file", reg);	
	    	});
			
			formData.append("paramsData", angular.toJson($scope.camposSendData));
						
			Service.insertRecord(formData, $scope.version, $scope.intermediarioUser).then(function(dataResponse) {
				 	
				$scope.sendAlert(dataResponse.data);
				$('#myModalNew').modal('hide');
        		$scope.loadMyGrid();
	        }); 						
		}
    }
	
	$scope.updateRecord= function(file){			
		
		var verify=true;		
		$scope.camposSendData={};	
		
		if(!$scope.validatePeriod()){
			verify=false;
			$scope.sendAlert("El año y el mes que reporta no puede ser superior al actual");
		}
		
		if(verify&& $scope.prepareSendData()){	
			formData=new FormData();
			
			angular.forEach(file, function(reg) {
				formData.append("file", reg);				
			});
			
			formData.append("paramsData", angular.toJson($scope.camposSendData));
						
			Service.updateRecord(formData, $scope.Campos["forecons"], $scope.intermediarioUser, $scope.version).then(function(dataResponse) {
				 	
				if(dataResponse.data.error!=undefined)
					$scope.sendAlert(dataResponse.data.tituloError+': '+dataResponse.data.error);
		    	else{
		    		$scope.loadMyGrid();
		    		
		    		$scope.sendAlert(dataResponse.data);
		    	}				        		      				        				        	        
	        }); 						
		}
    }
		
	$scope.$on('gridEvento', function(event, pageSize, currentPage, order, searchQuery) {   
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
    			$scope.sendAlert(dataResponse.data.tituloError+': '+dataResponse.data.error);
        	else 
        		$scope.$broadcast('loadDataGrid',dataResponse.data.data, dataResponse.data.count, $scope.pageSize, $scope.currentPage);
        });
	}
	
	$scope.sendAlert = function(error){
		$scope.$broadcast('loadDataError', error);
	}
	
	$scope.validatePeriod = function(){
		var myDate = new Date();
		var actualMonth=myDate.getMonth()+1;
		var actualYear=myDate.getFullYear();
		var userYear=parseInt($scope.Campos['anio']);
		
		switch($scope.Campos['mes']){
				case "Enero":  	if(1<=actualMonth && userYear<=actualYear)
							   	return true;	
				case "Febrero":	if(2<=actualMonth && userYear<=actualYear)
							   	return true;	
				case "Marzo":  	if(3<=actualMonth && userYear<=actualYear)
							   	return true;	
				case "Abril":	if(4<=actualMonth && userYear<=actualYear)
								return true;
				case "Mayo":	if(5<=actualMonth && userYear<=actualYear)
								return true;
				case "Junio":	if(6<=actualMonth && userYear<=actualYear)
								return true;
				case "Julio":	if(7<=actualMonth && userYear<=actualYear)
								return true;
				case "Agosto":	if(8<=actualMonth && userYear<=actualYear)
							  	return true;
				case "Septiembre":if(9<=actualMonth && userYear<=actualYear)
								return true;
				case "Octubre":	if(10<=actualMonth && userYear<=actualYear)
								return true;
				case "Noviembre":if(11<=actualMonth && userYear<=actualYear)
								return true;
				case "Diciembre":if(12<=actualMonth && userYear<=actualYear)
								return true;
		}
		return false;
	}
	
	$scope.prepareSendData = function(){
		angular.forEach($scope.columns, function(reg) {
			//Verificar si los datos requeridos cumplen con haber sido digitados
			if($scope.Campos[reg.camprequ]==1 && ($scope.Campos[reg.campnomb]==undefined || $scope.Campos[reg.campnomb]=='') && $scope.Campos[reg.campnomb]!=0){
				$scope.sendAlert("Faltan datos por diligenciar");
				return false;
			}
			
			//Tomar solo los datos de salida para enviarlos a la consulta
			if($scope.Campos[reg.campnomb]==undefined)
				$scope.camposSendData[reg.campnomb]=null;
			else if(reg.camptipo=='D')//date
				if(typeof $scope.Campos[reg.campnomb]=="string")
					$scope.camposSendData[reg.campnomb]=$scope.Campos[reg.campnomb];
				else
					$scope.camposSendData[reg.campnomb]=$filter('date')(new Date($scope.Campos[reg.campnomb]), 'dd/MM/yyyy');
			else if(reg.camptipo=='T')//timestamp
				if(typeof $scope.Campos[reg.campnomb]=="string")
					$scope.camposSendData[reg.campnomb]=$scope.Campos[reg.campnomb];
				else
					$scope.camposSendData[reg.campnomb]=$filter('date')(new Date($scope.Campos[reg.campnomb]), 'dd/MM/yyyy HH:mm:ss');
			else	
				$scope.camposSendData[reg.campnomb]=$scope.Campos[reg.campnomb];
			
		});
		return true;
	}
 }            
]);