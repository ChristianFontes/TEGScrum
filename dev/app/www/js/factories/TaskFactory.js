angular.module('starter.factories')

.factory('Task', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      return $http.get(SERVER_PATH + '/task');
    },
    get: function(taskId) {
      return $http.get(SERVER_PATH + '/task/' + taskId);
    }
  };
})