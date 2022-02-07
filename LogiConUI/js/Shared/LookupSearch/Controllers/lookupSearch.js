angular.module('LogiCon').controller('lookupSearchController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('LOOKUPSEARCH', function (event, args) {
        
        alert(args);
        //$scope.LookUpSearch();
    });

    $scope.LookUpSearch = function () {
        alert('asdf');
    };
}]);


/*
angular.module('LogiCon').controller('One', ['$scope', '$rootScope'
    function($scope) {
        $rootScope.$on("CallParentMethod", function(){
           $scope.parentmethod();
        });

        $scope.parentmethod = function() {
            // task
        }
    }
]);
angular.module('LogiCon').controller('two', ['$scope', '$rootScope'
    function($scope) {
        $scope.childmethod = function() {
            $rootScope.$emit("CallParentMethod", {});
        }
    }
]);
ref http://stackoverflow.com/questions/29467339/how-to-call-function-in-another-controller-in-angularjs
*/