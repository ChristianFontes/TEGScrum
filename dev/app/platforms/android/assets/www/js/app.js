// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngResource', 'starter.controllers', 'starter.factories', 'ngRoute'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if (window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    cordova.plugins.Keyboard.disableScroll(true);

  }
  if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller : 'ListController'
      }
    }
  })
  .state('app.projects', {
    url: '/projects',
    views: {
      'menuContent': {
        templateUrl: 'templates/projects.html',
        controller : 'ListController'
      }
    }
  })
  .state('app.sessions', {
    url: "/sessions",
    views: {
      'menuContent' :{
        templateUrl: "templates/sessions.html",
        controller: "SessionListCtrl"
      }
    }
  })

  .state('app.session', {
    url: "/sessions/:sessionId",
    views: {
      'menuContent' :{
        templateUrl: "templates/session.html",
        controller: "SessionCtrl"
      }
    }
  })
  .state('app.speakers', {
    url: "/speakers",
    views: {
      'menuContent' :{
        templateUrl: "templates/speakers.html",
        controller: "SpeakerListCtrl"
      }
    }
  })

  .state('app.speaker', {
    url: "/speakers/:speakerId",
    views: {
      'menuContent' :{
        templateUrl: "templates/speaker.html",
        controller: "SpeakerCtrl"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
.constant('SERVER_PATH','http://localhost:1337');
 
    
