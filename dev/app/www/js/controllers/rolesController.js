angular.module('starter.controllers')

.controller('RolesListCtrl', function ($scope, Roles, SERVER_PATH) {
  $scope.serverPath = SERVER_PATH;
  $scope.roles = [];
  Roles.all().success(function(roles) {
    $scope.roles = roles;
  });
  $scope.doRefresh = function() {
    $scope.roles = Roles.all().success(function(roles) {
      $scope.roles = roles;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
})
