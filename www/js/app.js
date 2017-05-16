// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.controller('VehicleCtrl', function($scope,$http,$log, $state) {


  $scope.CarList = [{"Id":9,"Name":"Chevrolet Beat"},{"Id":22,"Name":"Chevrolet Sail Hatchback"},{"Id":7,"Name":"Datsun GO"},{"Id":2,"Name":"Datsun Redi GO"},{"Id":46,"Name":"Fiat 500"},{"Id":39,"Name":"Fiat Abarth Avventura"},{"Id":38,"Name":"Fiat Abarth Punto"},{"Id":37,"Name":"Fiat Avventura"},{"Id":34,"Name":"Fiat Avventura Urban Cross"},{"Id":28,"Name":"Fiat Punto EVO"},{"Id":13,"Name":"Fiat Punto Pure"},{"Id":17,"Name":"Ford Figo"},{"Id":18,"Name":"Honda Brio"},{"Id":29,"Name":"Honda Jazz"},{"Id":36,"Name":"Honda WRV"},{"Id":25,"Name":"Hyundai Elite i20"},{"Id":8,"Name":"Hyundai EON"},{"Id":14,"Name":"Hyundai Grand i10"},{"Id":12,"Name":"Hyundai i10"},{"Id":33,"Name":"Hyundai i20 Active"},{"Id":31,"Name":"Mahindra Verito Vibe"},{"Id":3,"Name":"Maruti Alto 800"},{"Id":6,"Name":"Maruti Alto K10"},{"Id":24,"Name":"Maruti Baleno"},{"Id":10,"Name":"Maruti Celerio"},{"Id":16,"Name":"Maruti Ignis"},{"Id":20,"Name":"Maruti Swift"},{"Id":11,"Name":"Maruti Wagon R"},{"Id":43,"Name":"Mercedes-Benz A-Class"},{"Id":45,"Name":"Mini 3 DOOR"},{"Id":30,"Name":"Nissan Micra"},{"Id":15,"Name":"Nissan Micra Active"},{"Id":4,"Name":"Renault KWID"},{"Id":23,"Name":"Renault Pulse"},{"Id":19,"Name":"Tata Bolt"},{"Id":21,"Name":"Tata Indica eV2"},{"Id":1,"Name":"Tata Nano x"},{"Id":5,"Name":"Tata Tiago"},{"Id":32,"Name":"Toyota Etios Cross"},{"Id":27,"Name":"Toyota Etios Liva"},{"Id":42,"Name":"Volkswagen Beetle"},{"Id":35,"Name":"Volkswagen CrossPolo"},{"Id":40,"Name":"Volkswagen GTI"},{"Id":26,"Name":"Volkswagen Polo"},{"Id":41,"Name":"Volvo V40"},{"Id":44,"Name":"Volvo V40 Cross Country"}];
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
  

  
  $scope.selectSource = function() {
    var input = document.getElementById('tripSource');
    var autocomplete = new google.maps.places.Autocomplete(input); console.log(autocomplete); alert(autocomplete);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace(); 
    });
  }

  $scope.selectDestination = function() {
    var input = document.getElementById('tripDestination');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        getDistance();
    });
    
  }


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

  $scope.getCarMilege = function(car_id) { //alert(car_id);
    // var url = '';
    // var params = '';
    // url += 'http://139.59.6.74/milegecalc/public/index.php/rest/get-milege';
    // //url += 'http://localhost:8080/milegecalc/public/rest/get-milege';
    // params = {'vehicle_id' : car_id};
    // $http.get(url,{params:params}).success(function(data) {
    //   window.content = data;
    //   $scope.milege = data;
    // });

    $scope.milege = '25.25';
  }

  $scope.getBikeMilege = function(bike_id) {
    rest_milege = 
    {
        "milege": 18
    };
    $scope.milege = rest_milege.milege;
  }

  $scope.calculateOilReq = function( milege, distance ) { 
    distance = document.getElementById("dvDistance").value;
    //console.log(distance);
    distance = distance.replace(" km", "");
    distance = parseInt(distance);

    oilReq = '';
    oilReq += (distance/milege).toFixed(2)+ ' L Oil required ';
    //alert((distance/milege).toFixed(2)+ ' L Oil required ');
    $state.transitionTo('tab.oil', {oil : oilReq})
  }

  function getDistance() { 
    var service = new google.maps.DistanceMatrixService();
    source = document.getElementById("tripSource").value;
    destination = document.getElementById("tripDestination").value;

    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            var dvDistance = document.getElementById("dvDistance");
            dvDistance.value = distance;
        } else {
            alert("Unable to find the distance via road.");
        }
    });
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

  .state('tab.oil', {
      url: '/resultoil/:oil',
      views: {
        'tab-chats': {
          templateUrl: 'templates/oil_result.html',
          controller: 'OilresultCtrl',
          
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
