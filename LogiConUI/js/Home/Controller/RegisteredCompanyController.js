angular.module('LogiCon').controller('RegisteredCompanyCntrl', ['$scope', function ($scope) {

}]);

angular.module('LogiCon').controller('DemoFileUploadController', [
            '$scope', '$http', 'Utility',
            function ($scope, $http, Utility) {
                $scope.options = {
                    url: Utility.ServiceUrl + '/root/image/UploadFiles'
                };
                if (true) {
                    $scope.loadingFiles = true;
                    $http.get(Utility.ServiceUrl + '/root/image/UploadFiles')
                        .then(
                            function (response) {
                                $scope.loadingFiles = false;
                                $scope.queue = response.data.files || [];
                            },
                            function () {
                                $scope.loadingFiles = false;
                            }
                        );
                }
            }
]);

angular.module('LogiCon').controller('FileDestroyController', [
    '$scope', '$http',
    function ($scope, $http) {
        var file = $scope.file,
            state;
        if (file.url) {
            file.$state = function () {
                return state;
            };
            file.$destroy = function () {
                state = 'pending';
                return $http({
                    url: file.deleteUrl,
                    method: file.deleteType
                }).then(
                    function () {
                        state = 'resolved';
                        $scope.clear(file);
                    },
                    function () {
                        state = 'rejected';
                    }
                );
            };
        } else if (!file.$cancel && !file._index) {
            file.$cancel = function () {
                $scope.clear(file);
            };
        }
    }
]);