angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicLoading) {
  // $ionicLoading.show({template:'<i class="icon ion-looping"></i>'});
  
})
.controller('SignupCtrl', function ($scope, $ionicLoading) {
  // $ionicLoading.show({template:'<i class="icon ion-looping"></i>'});
})

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function ($scope, $ionicPopover) {
  $scope.clearSearch = function() {
    $scope.search = '';
  }

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  $ionicPopover.fromTemplateUrl('templates/popover.html', function (popover) {
    $scope.popover = popover;
  });
})

.controller('NewBriefCtrl', function ($scope, $ionicPopover, $rootScope, $sce) {
  $rootScope.items = [];
  $scope.data = {
    showDelete: false
  };
  $scope.moveItem = function (item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  $scope.onItemDelete = function (item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.addInput = function (type) {
    switch (type){
      case 'nptTxt':
        $rootScope.items.push({ 
          input: $sce.trustAsHtml('<p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p> <input type="text" placeholder="An input text" disabled />')
        });
      break;
      
      case 'textarea':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p><textarea placeholder="A textarea"></textarea>')         
        });
      break;
      
      case 'nptColor':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p><input type="color" disabled />')         
        });
      break;
      
      case 'nptDate':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p><input type="date" disabled />')         
        });
      break;
      
      case 'nptNumber':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p><input type="tel" placeholder="An input number" disabled />')         
        });
      break;
      
      case 'nptFile':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p> <input type="file" disabled />')         
        });
      break;
      
      case 'nptRadio':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<p contenteditable="true">Praesentium debitis pariatur quia odio reprehenderit voluptatum consequuntur</p><input type="radio" disabled /><input type="radio" disabled />')         
        });
      break;
      
      case 'nptCheckbox':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p><input type="checkbox" disabled /><input type="checkbox" disabled />')         
        });
      break;
    }
  }
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});
