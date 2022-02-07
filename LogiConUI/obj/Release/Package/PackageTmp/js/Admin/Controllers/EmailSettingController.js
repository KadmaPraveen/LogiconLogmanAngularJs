
angular.module('LogiCon').controller('EmailSettingController', ['$scope', 'EmailSettingService', 'growlService', '$uibModal', 'Utility', function ($scope, EmailSettingService, growlService, $uibModal, Utility) {
    $scope.e = {};
    $scope.SaveEmailSetting = function (e) {        
        EmailSettingService.SaveEmailSetting(e).then(function (d) {
            growlService.growl('Success', 'success');
        }, function (err) { });
    };

    $scope.GetEmailSettings = function () {
        EmailSettingService.GetEmailSetting().then(function (d) {
            $scope.e = d.data;
        }, function (err) { });
    };
    var emailIndex = -1;
    $scope.TextEmailsending=function(index)
    {
        emailIndex = index;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Admin/Templates/Emailtextsent.html?v=' + Utility.Version,
            size: 'md',
            controller: 'SentEmailSettingController'
        });
    }
  
  

    $scope.GetEmailSettings();
}]);

angular.module('LogiCon').controller('SentEmailSettingController', ['$scope', 'EmailSettingService', 'growlService', '$uibModal', 'Utility', '$uibModalInstance',
    function ($scope, EmailSettingService, growlService, $uibModal, Utility, $uibModalInstance) {
        $scope.email = {
            Subject: '1Trade.Exchange Test Message',
            Body: 'This is an e-mail message sent automatically by 1Trade.Exchange while testing the settings for your account.'
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        
        $scope.IsFrmEmailValid = false;
        $scope.$watch('frmemailsent.$valid', function (isValid) {
            $scope.IsFrmEmailValid = isValid;
        });
        
        $scope.SentDetails = function (email) {
            if ($scope.IsFrmEmailValid) {
                EmailSettingService.SentEmailTo(email).then(function (d) {
                    growlService.growl(d.data, 'success');
                    $uibModalInstance.close(document);
                }, function (err) {
                })
                

            }
            else
                growlService.growl('Please enter all mandatory fields', 'danger');
        }
       
    }]);
        

