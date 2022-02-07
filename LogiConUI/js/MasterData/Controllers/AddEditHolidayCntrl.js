angular.module('LogiCon').controller('AddEditHolidayCntrl', ['$scope', '$uibModalInstance', 'holiday', 'HolidayService', 'growlService', 'Utility','UtilityFunc',
    function ($scope, $uibModalInstance, holiday, HolidayService, growlService, Utility, UtilityFunc) {

        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.timeFormat = UtilityFunc.TimeFormat();
        $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
    $scope.cancel = function () {       
        $uibModalInstance.dismiss('cancel');
        $scope.isfrmAddHoliday = false;
    };
   
    $scope.isfrmAddHoliday = false;
    $scope.$watch('frmAddHoliday.$valid', function (isValid) {        
        $scope.isfrmAddHoliday = isValid;
    });

    $scope.AddHoliday = function (holiday) {       
        if ($scope.isfrmAddHoliday) {
            HolidayService.SaveHoliday(holiday).then(function (d) {
                $uibModalInstance.close();
                growlService.growl(d.data, 'success');

            }, function (err) { growlService.growl(err.statusText, 'success'); });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };

  

    HolidayService.GetCountryList().then(function (d) {
        $scope.countryDataList = d.data;       
    }, function (err) {
        growlService.growl(err.statusText, 'success');
    });

    
    if (holiday != -1) {
        if ($scope.isfrmAddHoliday) {
            HolidayService.GetHolidayByDate(holiday).then(function (d) {
                $scope.holidayList = d.data;
            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    }

}]);