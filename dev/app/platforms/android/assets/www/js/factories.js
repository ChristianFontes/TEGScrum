angular.module('starter.factories', [])

// Services
.factory('Speaker', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      //SERVER_PATH + '/user'
      return $http.get('data/user.json');
    },
    get: function(speakerId) {
      return $http.get(SERVER_PATH + '/user/' + speakerId);
    }
  };
})

.factory('Project', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      //SERVER_PATH + '/project'
      return $http.get('data/project.json');
    },
    get: function(projectId) {
      //SERVER_PATH + '/project/' + projectId
      return $http.get('data/project.json');
    }
  };
})
// PENDIENTE ------------!
.factory('Session', function ($resource) {
  return $resource('http://localhost:13/sessions/:sessionId');
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
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});