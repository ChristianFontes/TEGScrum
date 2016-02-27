angular.module('starter.factories')

.factory('Actions', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      return $http.get(SERVER_PATH + '/actions');
    },
    get: function(actionsId) {
      return $http.get(SERVER_PATH + '/actions/' + actionsId);
    }
  };
})