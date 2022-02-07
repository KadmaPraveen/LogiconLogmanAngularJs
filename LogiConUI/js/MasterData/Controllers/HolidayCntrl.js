angular.module('LogiCon').controller('HolidayCntrl', ['$scope', 'HolidayService', '$uibModal', '$window', '$stateParams', 'growlService', 'Utility',
    function ($scope, HolidayService, $uibModal, $window, growlService, $stateParams, Utility) {
    
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.AddHoliday = function (Code) {
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/Holiday/add-holiday.html?v=' + Utility.Version,
            controller: 'AddEditHolidayCntrl',
            size: 'md',
            resolve: {
                holiday: function () {
                    return Code;
                }
            }
        });

        modalInstance.result.then(function (res) {
            //$scope.getData();
            
            $scope.HolidayList();
        }, function (err) {
            
            growlService.growl(err.statusText, 'danger');
        });
    };


    $scope.HolidayList = function () {        
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        HolidayService.GetHolidayList(skip, $scope.limit).then(function (d) {
            
            $scope.holidayList = d.data.holidayList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    };

    $scope.pageChanged = function () {
        $scope.HolidayList();
    };

    $scope.getData = function (skip, take) {
        HolidayService.GetHolidayList(skip, take).then(function (d) {
            $scope.holidayList = d.data.holidayList;
            $scope.totalItems = d.data.totalItems;
          
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    };

    $scope.getData(0, $scope.limit);


    $scope.DeleteHoliday = function (holiday) {
        if ($window.confirm('Are you sure, you want to delete \'' + holiday.HolidayDate + '\' ?')) {
            HolidayService.DeleteHoliday(holiday).then(function (d) {
                growlService.growl('Deleted successfully', 'success');
                $scope.getData();
            }, function (err) { });
        }
    };


}]);


