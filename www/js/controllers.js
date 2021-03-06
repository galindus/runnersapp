function PracticeCtrl($scope, $routeParams){
	// Practice Information
	$scope.time = 0;
	$scope.distance;
	$scope.speed;
	$scope.avgSpeed;
	// Initialize map
	var mapOptions = {
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    
    // Set map div to display.
    var mapdiv = document.querySelector('#map .viewport');                    

    // Init map
    var map = new google.maps.Map(mapdiv, mapOptions);
    // Wait for phonegap ready and locate user
    var startPoint = runners.ggeolocateUser(map);

    // create polyline to draw practice on map.
    var route = new google.maps.Polyline({	    
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	  });

    start = route.getPath();
    console.log(startPoint);

    route.setMap(map);
    // Update practice information
    function onSuccess(location){
    	console.log(location, $scope);
    	var path = route.getPath();
    	last = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    	path.push(last);
    	$scope.time = $scope.time + 3;
    	$scope.distance = google.maps.geometry.spherical.computeDistanceBetween(path.getAt(0), last);
    	$scope.speed = location.coords.speed;    	
    }
    // Some error happened ouch!
    function onError(location){
    	console.log("some error happened");
    }

    // Start practice!
    $scope.startPractice = function(){
    	setInterval(function(){    		
    		//Try gps geolocation        
        	navigator.geolocation.getCurrentPosition(onSuccess, onError);
    	},3000);	
    }
}


function HomeCtrl($scope, $routeParams){
	// Initialize map
	var mapOptions = {
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    
    // Set map div to display.
    var mapdiv = document.querySelector('#map .viewport');                    

    // Init map
    var map = new google.maps.Map(mapdiv, mapOptions);
    // Wait for phonegap ready and locate user
    runners.ggeolocateUser(map);
    
	console.log($scope, $routeParams);
}