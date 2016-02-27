angular.module('starter.controllers')

.controller('NewSprintCtrl', function($scope, $ionicModal, $timeout, $http, $window) {

  $scope.sprintData = {};
  $ionicModal.fromTemplateUrl('templates/Sprints/new.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeNewSprint = function() {
    $scope.modal.hide();
  };

  $scope.NewUserSprint = function() {
    $scope.modal.show();
  };

  $scope.selected = [];
  var updateSelected = function (action, id) {
      if (action == 'add' & $scope.selected.indexOf(id) == -1) 
        $scope.selected.push(id);
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
  
	$scope.doNewSprint = function() {
  	$http
    .post('http://localhost:1337/sprints',{
     nombre: $scope.sprintData.nombre,
     inicio: $scope.sprintData.inicio,
     fin: $scope.sprintData.fin,
     project_id: $scope.project.id,
     user_story: $scope.selected
    })
    .success(function (data, status) {
      console.log('Register Exitoso', $scope.sprintData);
      $scope.taskDatacard = [];
      $scope.sprintData = {};
      $scope.selected = [];
    })
    .error(function (data, status) {
    });
	};
})


.controller('SprintIDController', function ($scope, $stateParams, Sprints, SERVER_PATH) {

  $scope.serverPath = SERVER_PATH;
    $scope.sprintid = [];
    Sprints.get($stateParams.sprintId).success(function(sprint){
    $scope.sprint = sprint;
    $scope.sprintid.push(sprint);
  });

  $scope.selected = [];

  $scope.insertValue = function (data) {
    if ($scope.selected.indexOf(data) == -1) {
        $scope.selected.push(data);
    }
  };

  $scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.selected.length; i++){
        var value = $scope.selected[i].value;
        total += value;
    }
    return total;
  };
});