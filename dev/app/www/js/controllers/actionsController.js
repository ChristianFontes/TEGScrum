angular.module('starter.controllers')

.controller('NewActionsCtrl', function($scope, $ionicModal, $timeout, $http, $window){

	$scope.actionData = {};

	$ionicModal.fromTemplateUrl('templates/Actions/new.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.closeNewAction = function() {
		$scope.modal.hide();
	};

	$scope.NewAction = function() {
		$scope.modal.show();
	};

    $scope.selected = [];
	var updateSelected = function (action, id) {
	  if (action == 'add' & $scope.selected.indexOf(id) == -1) 
	    $scope.selected.push(id);
		console.log("push",$scope.selected);
	  if (action == 'remove' && $scope.selected.indexOf(id) != -1) 
	    $scope.selected.splice($scope.selected.indexOf(id), 1);
	}

	$scope.updateSelection = function ($event, id) {
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		updateSelected(action, id);
	};

	$scope.getSelectedClass = function (entity) {
	  return $scope.isSelected(entity.id) ? 'selected' : '';
	};

	$scope.isSelected = function (id) {
	  return $scope.selected.indexOf(id) >= 0;
	};

	$scope.doNewAction = function() {
	  $http
	    .post('http://localhost:1337/actions',{
	        type: $scope.actionData.type,
	        user: $scope.selected,
	        task_id: $scope.taskid.id
	      } 
	    )
	    .success(function (data, status) {
	      console.log("success");
	    })
	    .error(function (data, status) {
	    	console.log("ERROR");
	    });
	};
})