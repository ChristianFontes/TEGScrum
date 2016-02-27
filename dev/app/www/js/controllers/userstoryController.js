angular.module('starter.controllers')

.controller('NewUserStoryCtrl', function($scope, $ionicModal, $timeout, $http, $window) {

	$scope.userstoryData = {};
	$ionicModal.fromTemplateUrl('templates/Userstory/new.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.closeNewUserStory = function() {
		$scope.modal.hide();
	};

	$scope.NewUserStory = function() {
		$scope.modal.show();
	};

	$scope.doNewUserStory = function() {
		
	  	$http
	    .post('http://localhost:1337/user_story',{
	     	nombre: $scope.userstoryData.nombre,
	     	descripcion: $scope.userstoryData.descripcion,
	     	estado:  $scope.userstoryData.estado,
	     	project_id:  $scope.project.id
	 	})
	    .success(function (data, status) {
	      console.log($scope.project.id);
	      console.log($scope.userstoryData);
	      $scope.userstoryData = {};
	      $scope.modal.hide();
	    })
	    .error(function (data, status) {
	    });
	};
})

.controller('UserstoryController', function ($scope, Userstory, SERVER_PATH) {

	$scope.serverPath = SERVER_PATH;
	$scope.userstory = [];
	Userstory.all().success(function(userstory) {
		$scope.userstory = userstory;
	});
})

.controller('UserStoryIDController', function ($scope, $stateParams, Userstory, SERVER_PATH) {

	$scope.serverPath = SERVER_PATH;
  	$scope.userstoryarray = [];
    Userstory.get($stateParams.userstoryId).success(function(userstory){
		$scope.userstory = userstory;
		$scope.userstoryarray.push(userstory);
	});
});