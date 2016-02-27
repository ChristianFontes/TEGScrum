angular.module('starter.controllers')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window) {

  $scope.loginData = {};
  $scope.registerData = {};

  $ionicModal.fromTemplateUrl('templates/Users/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/Users/register.html', {
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
      .post('http://localhost:1337/user', $scope.registerData)
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

.controller('AddRoleProjectCtrl', function($scope, $ionicModal, $timeout, $http, $window) {

  $ionicModal.fromTemplateUrl('templates/Users/adduser.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeAddRol = function() {
    $scope.modal.hide();
  };

  $scope.AddRolToUser = function() {
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

  $scope.doAddRole = function() {
    // Revisar...
    console.log($scope.selected);
    $http
    .put('http://localhost:1337/user/' + $scope.speaker.id,{
      roles: $scope.selected
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