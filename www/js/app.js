// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.controller('VehicleCtrl', function($scope,$http) {


  $scope.CarList = [
  {
      "Id": 1,
      "Name": "Hyundai i10"
  },
  {
      "Id": 2,
      "Name": "Swift"
  },
  {
      "Id": 3,
      "Name": "Swift Dzire"
  },
  {
      "Id": 4,
      "Name": "Etios"
  }];

  $scope.BikeList = [
  {
      "Id": 1,
      "Name": "Pulser 150"
  },
  {
      "Id": 2,
      "Name": "Yamaha FZ"
  },
  {
      "Id": 3,
      "Name": "Activa"
  },
  {
      "Id": 4,
      "Name": "Royal Enfield"
  }]


  $scope.cars = false;
  $scope.bikes = false;
  

  
  $scope.selectVehicle = function(vehicle_type) {
    if(vehicle_type == 'cars') {
      $scope.cars = true;
      $scope.bikes = false;
    }

    if(vehicle_type == 'bikes') {
      $scope.cars = false;
      $scope.bikes = true;
    }
    
  }

  $scope.getCarMilege = function(car_id) {
    var url = '';
    var params = '';
    url += 'http://192.168.0.156/milegecalc/public/rest/get-milege';
    params = {'vehicle_id' : car_id};
    $http.get(url,{params:params}).success(function(data) {
      window.content = data;
      $scope.milege = data;
    });
  }

  $scope.getBikeMilege = function(bike_id) {
    rest_milege = 
    {
        "milege": 18
    };
    $scope.milege = rest_milege.milege;
  }

  $scope.calculateOilReq = function( milege, distance ) {
    alert((distance/milege)+ ' L Oil required ');
  }
})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
