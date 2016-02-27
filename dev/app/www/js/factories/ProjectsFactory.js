angular.module('starter.factories')

.factory('Project', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      return $http.get(SERVER_PATH + '/project');
    },
    get: function(projectId) {
      return $http.get(SERVER_PATH + '/project/' + projectId);
    }
  };
})