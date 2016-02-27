angular.module('starter.factories')

.factory('Sprints', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      return $http.get(SERVER_PATH + '/sprints');
    },
    get: function(sprintId) {
      return $http.get(SERVER_PATH + '/sprints/' + sprintId);
    }
  };
})