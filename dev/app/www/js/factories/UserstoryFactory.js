angular.module('starter.factories')

.factory('Userstory', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      return $http.get(SERVER_PATH + '/user_story');
    },
    get: function(userstoryId) {
      return $http.get(SERVER_PATH + '/user_story/' + userstoryId);
    }
  };
})
