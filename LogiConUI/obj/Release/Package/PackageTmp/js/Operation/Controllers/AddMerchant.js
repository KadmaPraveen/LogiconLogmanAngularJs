angular.module('LogiCon').controller('AddMerchant', ['$scope', 'OrderEntryService', '$uibModalInstance', 'dataObj', '$http', 'Utility', 'limitToFilter', 'CountryService', 'growlService', 'MerchantProfileService',
    function ($scope, OrderEntryService, $uibModalInstance, dataObj, $http, Utility, limitToFilter, CountryService, growlService, MerchantProfileService) {
        //$scope.mp.AddressList = new Array();
        
        $scope.address = dataObj;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        
        //CountryService.GetCountriesList().then(function (d) {
        //    $scope.CountriesList = d.data;
        //}, function () { });

        $scope.countryResults = function (text) {
            
            return CountryService.SearchCountries(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.countrySelect = function (item) {
            $scope.address.CountryCode = item.Value;
        };

        $scope.isFrmMerchant = false;
        $scope.$watch('frmMerchant.$valid', function (isValid) {
            $scope.isFrmMerchant = isValid;
        });

        $scope.SaveMerchant = function (mp) {
            if ($scope.isFrmMerchant) {
                
                $scope.mp.AddressList = new Array();
                $scope.mp.AddressList.push(mp.address);

                var fResults = $scope.fResults;
                var yResults = $scope.yResults;
                var tResults = $scope.tResults;

                $scope.mp.MerchantRelationList = new Array();
                if (!angular.isUndefined(fResults)) {
                    for (var i = 0; i < fResults.length; i++) {
                        var obj = {
                            RelatedMerchantCode: fResults[i].Value,
                            RelationshipType: fResults[i].RelationshipType,

                        };

                        $scope.mp.MerchantRelationList.push(obj);
                    }
                }

                if (!angular.isUndefined(yResults)) {
                    for (var i = 0; i < yResults.length; i++) {
                        var obj = {
                            RelatedMerchantCode: yResults[i].Value,
                            RelationshipType: yResults[i].RelationshipType
                        };

                        $scope.mp.MerchantRelationList.push(obj);
                    }
                }

                if (!angular.isUndefined(tResults)) {
                    for (var i = 0; i < tResults.length; i++) {
                        var obj = {
                            RelatedMerchantCode: tResults[i].Value,
                            RelationshipType: tResults[i].RelationshipType
                        };

                        $scope.mp.MerchantRelationList.push(obj);
                    }
                }

                MerchantProfileService.SaveMerchantProfile(mp).then(function (d) {
                    
                    $scope.showLoading = false;

                    //$location.path('/masterdata/merchantlist');
                    growlService.growl(d.data, 'success');
                }, function (err) {
                    growlService.growl(err.statusText, 'danger');
                });

                $uibModalInstance.close(mp);
            } else {
                growlService.growl('please entry all mandatory fields', 'danger');
            }
        };
    }]);