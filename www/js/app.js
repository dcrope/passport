(function(){
	'use strict';
	angular.module('myApp', ['onsen.directives'])
        .controller('passportCtrl', function($scope, $http){
        $scope.deviceReady=false;
        $scope.serviceResponse={};
        $scope.user={username:'greeneyedevil',password:'test'};
        $scope.user.info={}
        $scope.urlBase='http://passport-api.herokuapp.com'
        //http://passport-api.herokuapp.com/user?username=greeneyedevil&password=test
        //http://localhost:3000/skillList?username=greeneyedevil&password=test&skillName=Overhand%20Knot&skillDescription=Basic%20Knot

        $http({ method:'GET',

            url:$scope.urlBase+'/user?username='+$scope.user.username+'&password='+$scope.user.password
        })
            .success(function(results, status, headers, config) {
                console.log('success user');
                $scope.user.info = results[0];
            }).error(function(results, status) {
                // called asynchronously if server returns response with error status.
                console.log('error user');
            });
        $http({ method:'GET',
            //http://localhost:3000/skillList?username=greeneyedevil&password=test&skillName=Overhand%20Knot&skillDescription=Basic%20Knot
            url:$scope.urlBase+'/skillList?username='+$scope.user.username+'&password='+$scope.user.password
        })
            .success(function(results, status, headers, config) {
                console.log('success skilllist');
                $scope.serverResponse = results;
            }).error(function(results, status) {
                // called asynchronously if server returns response with error status.
                console.log('error skilllist'+results);
            });
    });
})();
