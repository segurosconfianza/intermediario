<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{'cursor': col.cursor}" ng-class="{ 'ngSorted': !noSortVisible }">
    <div ng-click="col.sort($event)"ng-class="'colt' + col.index" class="ngHeaderText">{{col.displayName}}</div>
    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>
    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>
    <div class="ngSortPriority">{{col.sortPriority}}</div>
    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div>
</div>
<input type="text" ng-click="stopClickProp($event)" placeholder="Filter since..." ng-model="col.filterSince" ng-style="{ 'width' : col.width - 14 + 'px' }" style="position: absolute; top: 30px; bottom: 30px; left: 0; bottom:0;"/>
<input type="text" ng-click="stopClickProp($event)" placeholder="Filter until..." ng-model="col.filterUntil" ng-style="{ 'width' : col.width - 14 + 'px' }" style="position: absolute; top: 60px; bottom: 40px; left: 0; bottom:0;"/>
<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>
<span class="glyphicon glyphicon-search" ng-click="executeQuery()" ng-style="{ 'width' : 14 + 'px', 'left' : col.width - 14 + 'px' }" style="position: absolute; top: 30px; bottom: 30px; cursor: pointer;"> </span>