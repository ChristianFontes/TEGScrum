angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window) {

  $scope.loginData = {};
  $scope.registerData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(reg) {
    $scope.reg = reg;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.closeRegister = function() {
    $scope.reg.hide();
  };

  $scope.register = function() {
    $scope.reg.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $http
      .post('http://localhost:1337/login', $scope.loginData)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        console.log('Log In Fallido');
      });
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.doRegister = function() {
    console.log('Doing register', $scope.registerData);
    $http
      .post('http://localhost:1337/user/new', $scope.registerData)
      .success(function (data, status, headers, config) {
        console.log('Register Exitoso');
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        console.log('Register Fallido');
      });
      
    $timeout(function() {
      $scope.closeRegister();
    }, 1000);
  };
})
.controller('ListController',['$scope','$http','Project','SERVER_PATH',function($scope,$http,Project,SERVER_PATH){
  $scope.serverPath = SERVER_PATH;
      Project.all().success(function(projects) {
        $scope.projects = projects;
      });
  $scope.moveItem = function(project,fromIndex,toIndex){
    $scope.projects.splice(fromIndex, 1);
    $scope.projects.splice(toIndex,0,project);
  };
  $scope.onItemDelete = function(project){
    $scope.projects.splice($scope.projects.indexOf(project),1);
  };
}])
.controller('SpeakerListCtrl', function ($scope, Speaker, SERVER_PATH) {
  $scope.serverPath = SERVER_PATH;
  $scope.speakers = [];
  Speaker.all().success(function(speakers) {
    $scope.speakers = speakers;
  });
  $scope.doRefresh = function() {
    $scope.speakers = Speaker.all().success(function(speakers) {
      $scope.speakers = speakers;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
})

.controller('SpeakerCtrl', function ($scope, $stateParams, Speaker, SERVER_PATH) {
  $scope.serverPath = SERVER_PATH;
  Speaker.get($stateParams.speakerId).success(function(speaker) {
    $scope.speaker = speaker;
  });
})

.controller('SessionListCtrl', function ($scope, Session, SERVER_PATH) {
  $scope.serverPath = SERVER_PATH;
  $scope.sessions = Session.query();
})

.controller('SessionCtrl', function ($scope, $stateParams, Session, SERVER_PATH) {
  $scope.serverPath = SERVER_PATH;
  $scope.session = Session.get({sessionId: $stateParams.sessionId});
});
