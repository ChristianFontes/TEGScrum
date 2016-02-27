angular.module('starter.controllers')

.controller('ListController', function($scope,$http,Project,SERVER_PATH){
  $scope.serverPath = SERVER_PATH;
    Project.all().success(function(projects) {
      $scope.projects = projects;
  });
})

.controller('ProjectCtrl', function ($scope, $stateParams, Project, SERVER_PATH) {
  $scope.serverPath = SERVER_PATH;
  $scope.projectarray = [];
    Project.get($stateParams.projectId).success(function(project){
    $scope.project = project;
    $scope.projectarray.push(project);
  });
})

.controller('NewProjectCtrl', function($scope, $ionicModal, $timeout, $http, $window) {
  $scope.date = new Date();

  $scope.projectData = {};
  $ionicModal.fromTemplateUrl('templates/Projects/new.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeNewProject = function() {
    $scope.modal.hide();
  };

  $scope.NewProject = function() {
    $scope.modal.show();
  };

  $scope.doNewProject = function() {
  $http
    .post('http://localhost:1337/project', $scope.projectData)
    .success(function (data, status) {
      console.log('Register Exitoso', $scope.projectData);
      $scope.projectData = {};
    })
    .error(function (data, status) {
    });
  };
})

.controller('AddUserProjectCtrl', function($scope, $ionicModal, $timeout, $http, $window){

  $ionicModal.fromTemplateUrl('templates/Projects/adduser.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeAddUser = function() {
    $scope.modal.hide();
  };

  $scope.AddUserToProject = function() {
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

  $scope.doAddUserToProject = function() {

  $http
    .put('http://localhost:1337/project/' + $scope.project.id,{
      user_all: $scope.selected
    })
    .success(function (response, status, headers, config) {
      console.log("Exitoso");
       $scope.selected = [];
    })
    .error(function (response, status, headers, config) {
      console.log("Error");
    });
  };
})



