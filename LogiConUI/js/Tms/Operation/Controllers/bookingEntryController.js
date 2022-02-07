angular.module('LogiCon').controller('bookingEntryController', ['$scope', 'mySharedService', function ($scope, mySharedService) {
    
    $scope.tabs = [
        { title: 'General Information', content: 'Js/NetTms/Operation/Templates/generalinfo.html', active: true, disabled: false },
        { title: 'Container Details', content: 'Js/MasterData/MerchantProfile/Templates/address.html', active: false, disabled: false },
        { title: 'Other Information', content: 'Js/MasterData/MerchantProfile/Templates/billing.html', active: false, disabled: false }
    ];

    $scope.lookUpSearch = function (type) {        
        mySharedService.LookUpSearchItem(type);
    };
}]);