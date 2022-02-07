angular.module('LogiCon').controller('CFSCntrl', ['$scope', '$uibModal', function ($scope, $uibModal) {
	$scope.addCFS = function() {
		var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/CFS/Templates/add-cfs.html',
            controller: 'addEditCFSCntrl',
            size: 'lg',
			//windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {
            
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
	};
}]);

angular.module('LogiCon').controller('addEditCFSCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
	$scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);