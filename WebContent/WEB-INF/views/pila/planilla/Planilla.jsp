<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<sec:authorize ifAnyGranted="ADMINISTRATOR_ADMINISTRATOR, INTERMEDIARIO_ALL, INTERMEDIARIO_READ">
	<div class="row">
      <div class="col-md-6" ng-controller="PlanillaController" ng-init="init()"><!-- Division grid maestro -->      	
        <div class="well well-sm">
			<sec:authorize ifAnyGranted="ADMINISTRATOR_ADMINISTRATOR,INTERMEDIARIO_ALL,INTERMEDIARIO_READ"><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalNew" ng-click="createRecordForm()"> Nuevo <span class="glyphicon glyphicon-file"> </span></button></sec:authorize>
			<sec:authorize ifAnyGranted="ADMINISTRATOR_ADMINISTRATOR,INTERMEDIARIO_ALL,INTERMEDIARIO_READ"><button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalNew" ng-click="loadDatatoForm()"  > Editar <span class="glyphicon glyphicon-edit"> </span></button></sec:authorize>
			<button type="button" class="btn btn-default btn-sm"><a href="#"> Ayuda <span class="glyphicon glyphicon-info-sign"> </span></a></button>	
		</div>
		<h2><label ng-bind-html="title |to_trusted"></label></h2><br/>		    
		    
		<h4><label ng-bind-html="description | to_trusted"></label></h4>
    	<custom-grid cols="columnDefs" selected-items="selectedItems" custom-options="gridOptions" evento="gridEvento" icons="iconForeesta" data-ng-if="directiveGrid"></custom-grid>
        
    	<!-- ventana modal -->
    	<!-- Modal New -->
		<div class="modal fade" id="myModalNew" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        <h4 class="modal-title" id="myModalLabel"><label ng-bind-html="title |to_trusted"></label></h4>
		    	<h6>Por favor, ingrese los siguientes datos para consultar la informaci&oacute;n. <br>(<font color="red">*</font>) Campos obligatorios.</br><h6>
		      </div>
		      <div class="modal-body">
		        <form name="formInsert" class="form-horizontal" role="form">
		        	<div class="form-group" ng-repeat="column in columns" ng-include="'form_renderer.jsp'"></div>			 			 
			  	
				   	<div class="form-group">
					   <label for="file" class="col-sm-3 control-label"><font color="red">*</font>Seleccione el adjunto: </label>
					   <div class="col-sm-9">			
						 <input type="file" ng-file-select ng-model="picFile" name="file" multiple="multiple" required>
					   </div>
					   <div class="col-sm-9"><h6>Sino adjunta un nuevo archivo, se mantendr&aacute; el cargado previamente</h6></div>
				    </div>					    	   
	  			</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
		        <button type="button" class="btn btn-primary" ng-click="insertRecord(picFile)" ng-show="buttonNew">Registrar <span class="glyphicon glyphicon-floppy-disk"></span></button>
		        <button type="button" class="btn btn-success" ng-click="updateRecord(picFile)" ng-show="buttonEdit">Guardar Cambios <span class="glyphicon glyphicon-floppy-disk"></span></button>
		      </div>
		    </div>
		  </div>
		</div>
    	<custom-alert name-modal="myModalError" label-error="Ninguno"></custom-alert>
    	
        <!-- Nested list template -->
	    <script type="text/ng-template" id="form_renderer.jsp">  
			  <label for="{{column.camplabe}}" class="col-sm-3 control-label"><label ng-if="column.camprequ == 1"><font color="red">*</font></label>{{column.camplabe}}</label>
			  <div class="col-sm-3" ng-if="column.camptipo == 'S'">			
				<input style="width:100%;" type="text" name ="{{column.campcons}}" id="{{column.campcons}}" ng-model="Campos[column.campnomb]" ng-required="column.camprequ">
			  </div>
              <div class="col-sm-3" ng-if="column.camptipo == 'I' || column.camptipo == 'L'">	
				<input style="width:100%;" type="text" name ="{{column.campcons}}" id="{{column.campcons}}" ng-model="Campos[column.campnomb]" ng-required="column.camprequ" ui-number-mask="0">
			  </div>
			  <div class="col-sm-3" ng-if="column.camptipo == 'F' || column.camptipo == 'O'">				
				<input style="width:100%;" type="text" name ="{{column.campcons}}" id="{{column.campcons}}" ng-model="Campos[column.campnomb]" ng-required="column.camprequ" step="any" ui-number-mask="2">
			  </div>
			  <div class="col-sm-3" ng-if="column.camptipo == 'D'">			
              	<input style="width:100%;" type="text" datepicker-popup="dd/MM/yyyy" ng-model="Campos[column.campnomb]" is-open="campoDate" ng-click="campoDate=true" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="column.camprequ" ui-date ui-date-format="dd/MM/yyyy" close-text="Cerrar" current-text="Hoy" clear-text="Limpiar"/>
			  </div>
              <div class="col-sm-3" ng-if="column.camptipo == 'CS' || column.camptipo == 'CI'">
				<select class="form-control" name ="{{column.campcons}}" id="{{column.campcons}}" ng-model="Campos[column.campnomb]" ng-options="opt.value as opt.label for opt in options[column.campcomb]" ng-required="column.camprequ"></select>
	  	      </div>
			  <div class="col-sm-3" ng-if="column.camptipo == 'TA' || column.camptipo == 'TL'">
				<textarea name ="{{column.campcons}}" id="{{column.campcons}}" ng-model="Campos[column.campnomb]" ng-required="column.camprequ" rows="20" cols="50%" ng-trim="false"></textarea>
	  	      </div>
        </script>  
                    	    	    		
      </div>
        <div class="col-md-6" ><!-- Division grid detalle -->
        	<div class="well well-sm">		
        		<button type="button" class="btn btn-default btn-sm"><a href="#"> Ayuda <span class="glyphicon glyphicon-info-sign"> </span></a></button>	
			</div>
	      	<tabset>		    
			    <tab heading="{{ventanaTitulo}}" ng-controller="FmtAdjuntoController" ng-click="fixGridRendering()">
			      	<h3>&nbsp;&nbsp;</h3>
			      	<div class="panel" align="center" ng-if="loadPdf">
						<button class="btn btn-lg btn-warning"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando...</button>
					</div>	                
      				<object data="{{content}}" style="width:100%;height:100%;"></object>
      				<custom-alert name-modal="myModalErrorAdjunto" label-error="Ninguno"></custom-alert>
			    </tab>			    
			    <tab heading="{{ventanaTitulo}}" ng-controller="FmtEstadoController" ng-click="fixGridRendering()">
			      	<h3>{{ventanaTitulo}}&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalEstado"> Ver <span class="glyphicon glyphicon-eye-open"> </span></button></h3>	                
	      			<custom-grid cols="columnDefs" selected-items="selectedItems" custom-options="gridOptions" evento="gridEvento" data-ng-if="directiveGrid"></custom-grid>
	      			
	      			<!-- Definition of the model Estado-->
					<div class="modal fade" id="myModalEstado" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					  <div class="modal-dialog">
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					        <h4 class="modal-title" id="myModalLabel">{{ventanaTitulo}}</h4>
					      </div>
					      <div class="modal-body">
					        <form name="formInsert" class="form-horizontal" role="form">
					        	<div class="form-group">
									<label for="estacons" class="col-sm-2 control-label">{{ whatClassIsIt("estacons") }}</label>
									<div class="col-sm-10">
										<input type="number" name ="estacons" id="estacons" style="width:100%;" data-ng-model="estacons" value="{{estacons}}" readonly="readonly">
									</div>
								</div>
								<div class="form-group">
									<label for="estafore" class="col-sm-2 control-label">{{ whatClassIsIt("estafore") }}</label>
									<div class="col-sm-10">
										<input type="number" name ="estafore" id="estafore" style="width:100%;" data-ng-model="estafore" value="{{estafore}}" readonly="readonly">
									</div>
								</div>
								<div class="form-group" >
			            		  	  <label for="estafech" class="col-sm-2 control-label">{{ whatClassIsIt("estafech") }}</label>
									  <div class="col-sm-10">			
										<input style="width:100%;" type="text" data-ng-model="estafech" readonly/>
									  </div>							  
				            	</div>			            	
								<div class="form-group">
									<label for="mofouser" class="col-sm-2 control-label">{{ whatClassIsIt("mofouser") }}</label>
									<div class="col-sm-10">
										<input style="width:100%;" type="text" name ="estauser" id="estauser" data-ng-model="estauser" readonly="readonly">
									</div>
								</div>
								<div class="form-group" >
				            		  <label for="estaesta" class="col-sm-2 control-label">{{ whatClassIsIt("estaesta") }}</label>
									  <div class="col-sm-10">			
										<select class="form-control" name ="estaesta" id="estaesta" data-ng-model="estaesta" data-ng-options="opt.value as opt.label for opt in optionsEstado"></select>
									  </div>							  
				            	</div> 							
				  			</form>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>				       
					      </div>
					    </div>
					  </div>
					</div>  
					<custom-alert name-modal="myModalErrorEstado" label-error="Ninguno"></custom-alert>
			    </tab>
			    <tab heading="{{ventanaTitulo}}" ng-controller="PilMotiformController" ng-click="fixGridRendering()">
			      	<h3>{{ventanaTitulo}}&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalMotiform"> Ver <span class="glyphicon glyphicon-eye-open"> </span></button></h3>	                
	      			<custom-grid cols="columnDefs" selected-items="selectedItems" custom-options="gridOptions" evento="gridEvento" data-ng-if="directiveGrid"></custom-grid>
	      			
	      			<!-- Definition of the model Estado-->
					<div class="modal fade" id="myModalMotiform" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					  <div class="modal-dialog">
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					        <h4 class="modal-title" id="myModalLabel">{{ventanaTitulo}}</h4>
					      </div>
					      <div class="modal-body">
					        <form name="formInsert" class="form-horizontal" role="form">
					        	<div class="form-group">
									<label for="mofocons" class="col-sm-2 control-label">{{ whatClassIsIt("mofocons") }}</label>
									<div class="col-sm-10">
										<input type="number" name ="mofocons" id="mofocons" style="width:100%;" data-ng-model="mofocons" value="{{mofocons}}" readonly="readonly">
									</div>
								</div>
								<div class="form-group">
									<label for="mofofore" class="col-sm-2 control-label">{{ whatClassIsIt("mofofore") }}</label>
									<div class="col-sm-10">
										<input type="number" name ="mofofore" id="mofofore" style="width:100%;" data-ng-model="mofofore" value="{{mofofore}}" readonly="readonly">
									</div>
								</div>
								<div class="form-group" >
				            		  <label for="mofodevo" class="col-sm-2 control-label">{{ whatClassIsIt("mofodevo") }}</label>
									  <div class="col-sm-10">			
										<select class="form-control" name ="mofodevo" id="mofodevo" data-ng-model="mofodevo" data-ng-options="opt.value as opt.label for opt in optionsMotivo"></select>
									  </div>							  
				            	</div>
				            	<div class="form-group" >
			            		  	  <label for="mofodesc" class="col-sm-2 control-label">{{ whatClassIsIt("mofodesc") }}</label>
									  <div class="col-sm-10">			
										<textarea style="width:100%;" name ="mofodesc" id="mofodesc" ng-model="mofodesc" ng-trim="false" rows="15"></textarea>
									  </div>							  
				            	</div>
				            	<div class="form-group" >
			            		  	  <label for="mofofech" class="col-sm-2 control-label">{{ whatClassIsIt("mofofech") }}</label>
									  <div class="col-sm-10">			
										<input style="width:100%;" type="text" ng-model="mofofech" readonly/>
									  </div>							  
				            	</div>			            	
								<div class="form-group">
									<label for="mofouser" class="col-sm-2 control-label">{{ whatClassIsIt("mofouser") }}</label>
									<div class="col-sm-10">
										<input style="width:100%;" type="text" name ="mofouser" id="mofouser" data-ng-model="mofouser" readonly="readonly">
									</div>
								</div>							
				  			</form>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>				       
					      </div>
					    </div>
					  </div>
					</div>
					<custom-alert name-modal="myModalErrorPilMoti" label-error="Ninguno"></custom-alert>  
			    </tab>
			</tabset>   			
        </div>	    	       
    </div>
</sec:authorize>      