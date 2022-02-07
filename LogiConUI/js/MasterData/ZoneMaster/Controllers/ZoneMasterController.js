angular.module('LogiCon').controller('ZoneMasterCntrl', ['$scope', '$uibModal', function ($scope, $uibModal) {
	$scope.AddAreaCode = function() {
		var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/ZoneMaster/Templates/add-area-code.html',
            controller: 'addEditAreaCodeCntrl',
            //size: 'lg',
			windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {
            
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
	};
}]);

angular.module('LogiCon').controller('addEditAreaCodeCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
	$scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);