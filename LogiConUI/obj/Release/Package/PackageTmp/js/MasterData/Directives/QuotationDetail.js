app.directive('quotationDetail', [function () {
    
    return {
        restrict: 'E',
        replace: true,
        scope: {
            _details: '=data',
            quotation:'@quotation'
        },
        templateUrl: 'Js/MasterData/Directives/quotation-detail.html',
        controller: ['$scope', 'CustomerQuotationService', 'OrderEntryService', 'JobCategoryService', 'limitToFilter', '$q', '$http', 'Utility', '$filter', 'growlService', 'ChargeCodeService',
            function ($scope, CustomerQuotationService, OrderEntryService,JobCategoryService, limitToFilter, $q, $http, Utility, $filter, growlService, ChargeCodeService) {

                $scope.details = angular.copy($scope._details);
                $scope.isfrmQuotationDetailsValid = false;
                $scope.$watch('frmQuotationDetails.$valid', function (isValid) {
                    $scope.isfrmQuotationDetailsValid = isValid;
                });

                $scope.lookupData = {};
                $scope.getLookUpData = function () {

                    var lookupPromise = CustomerQuotationService.GetLookupData('quotationdetail');
                    if ($scope.details.Size == null)
                        $scope.details.Size = "20";
                    var sizeTypePromise = OrderEntryService.GetSizeType($scope.details.Size);
                    
                    $q.all([lookupPromise, sizeTypePromise]).then(function (d) {
                        $scope.lookupData = d[0].data;
                        $scope.lookupData.TypeList = d[1].data;
                    }, function (err) { })
                };

                $scope.ChargeCodeResults = function (text) {
                    return ChargeCodeService.GetChargeCodeSearch(text).then(function (response) {
                        return limitToFilter(response.data, 15);
                    }, function (err) { });
                };
                $scope.SlabRateChecked = function ()
                {                    
                    if (!$scope.details.IsSlabRate)
                    {
                        debugger;
                        delete $scope.details.SlabFrom;
                        delete $scope.details.SlabTo;
                        delete $scope.details.BaseAmt;
                        delete $scope.details.BaseQty;
                        delete $scope.details.MinAmt;
                        delete $scope.details.MaxAmnt;
                    }
                }
                $scope.SaveQuotationDetail = function (details) {
                    if ($scope.isfrmQuotationDetailsValid) {
                        $scope.$parent.addDetails(details);
                    } else {
                        growlService.growl('Please enter all mandatory fields..', 'danger');                        
                    }
                };
                $scope.requiredValue = false;
                $scope.AddRequired = function () {
                    if ($scope.details.IsSlabRate)
                        $scope.requiredValue = true;
                    else
                        $scope.requiredValue = false;
                }
                $scope.cancel = function () {
                    $scope.$parent.cancel();
                };

                $scope.sizeChanged = function () {
                    OrderEntryService.GetSizeType($scope.details.Size).then(function (d) {
                        $scope.lookupData.TypeList = d.data;
                    }, function () { })
                };


                $scope.JobCategoryData = function (JobType, ShipmentType) {
                    JobCategoryService.getJobCategoryListByJobType(JobType, ShipmentType).then(function (d) {
                        $scope.OrderCategoryList = d.data;
                    }, function (err) { });
                };

                $scope.jobTypeChagned = function(jobType) {
                    if (!angular.isUndefined(jobType)) {
                        $scope.JobCategoryData(jobType, $scope.details.ShipmentType);                        
                    }
                }
             
                if (!angular.isUndefined($scope.details.JobCategory) && $scope.details.JobCategory != null) {
                    $scope.JobCategoryData($scope.details.JobType, $scope.details.ShipmentType);                    
                }

                $scope.OnChargeCodeSelect = function (item) {
                    $scope.GetChargeCodeGSTValues(item.Value);                    
                };

                $scope.IsHaulage = false;
                $scope.GetChargeCodeGSTValues = function (chargeCode) {

                    ChargeCodeService.GetChargeCode(chargeCode).then(function (d) {
                        if (d.data.Module == 4054) {
                            $scope.IsHaulage = true;
                        }
                        else
                        {
                            $scope.details.PickupCode = null;
                            $scope.details.DeliveryCode = null;
                        }
                    });
                    ChargeCodeService.GetGSTValues(chargeCode).then(function (d) {
                        $scope.details.ChargeCode = chargeCode;
                        if (!angular.isUndefined(d.data.outputGSTCodeDetails) && d.data.outputGSTCodeDetails != null && d.data.outputGSTCodeDetails.length > 0)
                            $scope.details.OutPutGSTCodeDescription = d.data.outputGSTCodeDetails[0].OutPutGSTCodeDescription;
                        if (!angular.isUndefined(d.data.inputGSTCodeDetails) && d.data.inputGSTCodeDetails != null && d.data.inputGSTCodeDetails.length > 0)
                            $scope.details.InputGSTCodeDescription = d.data.inputGSTCodeDetails[0].InputGSTCodeDescription;
                    }, function (err) { });
                };

                $scope.GenericMerchantResults = function (text, filter, addresstype) {
                    return $http.get(Utility.ServiceUrl + '/master/MerchantProfile/search/' + text + '/' + filter).then(function (response) {
                        if (response.data.length == 0)
                            $scope.oe[addresstype] = '';
                        return limitToFilter(response.data, 15);
                    });
                };

                $scope.CustomerSelected = function (item, type) {
                    $scope.details[type] = item.Value;
                };

                $scope.getLookUpData();

                if ($scope.details.ChargeCode != null && $scope.details.ChargeCode != '')
                    $scope.GetChargeCodeGSTValues($scope.details.ChargeCode);
            }],
        link: function ($scope, element, attrs) {
            //$scope.isextra = attrs.quotation == 'standard' ? true : false;
        }
    };
}]);

/*
app.directive('quotationDetail', function ($uibModalInstance) {
    
    return {
        restrict: 'E',
        replace: true,
        scope: {
            
        },
        templateUrl: 'Js/Tms/Directives/quotation-detail.html',
        controller: ['$scope', 'quotationDetailsObj', function ($scope, quotationDetailsObj) {
            
        }],
        link: function ($scope, element, attrs) {
            
        }
    };
});
*/
