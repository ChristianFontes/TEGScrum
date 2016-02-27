angular.module('starter.controllers')

.controller('TaskController', function ($scope, Task, SERVER_PATH) {
  $scope.serverPath = SERVER_PATH;
  Task.all().success(function(task) {
    $scope.task = task;
  });
})

.controller('TaskIDController', function ($scope, $stateParams, Task, SERVER_PATH) {
  $scope.serverPath = SERVER_PATH;

  Task.get($stateParams.taskId).success(function(task){
    $scope.taskid = task;
  });
})

.controller('NewTaskCtrl', function($scope, $ionicModal, $timeout, $http, $window) {

  $scope.taskData = {};

  $ionicModal.fromTemplateUrl('templates/Task/new.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeNewTask = function() {
    $scope.modal.hide();
  };

  $scope.NewTask = function() {
    $scope.modal.show();
  };

  $scope.doNewTask = function() {
    $http
    .post('http://localhost:1337/task',{
        name: $scope.taskData.name,
        description: $scope.taskData.description,
        type: $scope.taskData.type,
        value: $scope.taskData.value,
        user_story_id: $scope.userstory.id,
        project_name: $scope.userstory.project_id
      } 
    )
    .success(function (data, status) {
      console.log('Register Exitoso', $scope.taskData);
      $scope.taskData = {};
    })
    .error(function (data, status) {
    });
  };
})

