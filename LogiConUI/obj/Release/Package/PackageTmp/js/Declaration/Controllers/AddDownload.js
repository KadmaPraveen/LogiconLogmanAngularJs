
angular.module('LogiCon').controller('AddDownLoadCntrl', ['$scope', 'Utility', 'UtilityFunc', 'DownloadService', '$uibModalInstance', 'fileName', function ($scope, Utility, UtilityFunc, DownloadService, $uibModalInstance, fileName) {
    $scope.filePath = Utility.BaseUrl + '/api/download/file/1/' + fileName + '/';
    $scope.fileName = fileName;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.downLoad = function (fileName) {
        DownloadService.Download(fileName, 1, 'text/plain');
    };
}]);

