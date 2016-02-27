angular.module('starter.factories')

.factory('Speaker', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      return $http.get(SERVER_PATH + '/user');
    },
    get: function(speakerId) {
      return $http.get(SERVER_PATH + '/user/' + speakerId);
    }
  };
})

.factory('Roles', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      return $http.get(SERVER_PATH + '/roles');
    },
    get: function(rolesId) {
      return $http.get(SERVER_PATH + '/roles/' + rolesId);
    }
  };
})


.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
      }
      return response || $q.when(response);
    }
  };
});