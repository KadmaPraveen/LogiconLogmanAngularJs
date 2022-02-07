angular.module('LogiCon').controller('AssociationHeaderController', ['$scope', '$uibModal', 'Utility', 'CountryService', 'AssociationListService', '$stateParams', '$window', 'growlService', 'UtilityFunc',
    function ($scope, $uibModal, Utility, CountryService, AssociationListService, $stateParams, $window, growlService, UtilityFunc) {
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.timeFormat = UtilityFunc.TimeFormat();
        $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
        $scope.defaultCurrency = UtilityFunc.DefaultCurrency();
        $scope.defaultCountry = UtilityFunc.DefaultCountry();
        var associationId = $stateParams.associationID;
        $scope.association = {
            AssociationID: associationId,
            associationDetails: new Array()
        };


        $scope.GetCountriesList = function () {
            CountryService.GetCountriesList().then(function (d) {
                $scope.lookupData = d.data;
            }, function (err) {

            });
        };

        var associationDetailIndex = -1;
        $scope.AddDetail = function (index) {
            associationDetailIndex = index;
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Admin/Templates/associationdetails.html?v=' + Utility.Version,
                size: 'lg',
                controller: 'AssociationDetailsController',
                resolve: {
                    dataObj: function () {
                        return {

                            asDetail: (index == -1 ? {} : $scope.association.associationDetails[associationDetailIndex]),

                        };
                    }
                }
            });

            $scope.modalInstance.result.then(function (asDetail) {
                if (associationDetailIndex != -1) {
                    $scope.association.associationDetails[associationDetailIndex] = asDetail;
                }
                else {
                    if ($scope.association.associationDetails != null) {
                        $scope.association.associationDetails.push(asDetail);
                    }
                    else {
                        $scope.association.associationDetails = new Array();
                        $scope.association.associationDetails.push(asDetail);
                    }
                }
            }, function () {

            });

        };


        $scope.DeleteDetail = function (inx) {
            var r = $window.confirm('Are you sure you want to delete ?');
            if (r)
                $scope.association.associationDetails.splice(inx, 1);
        }

        $scope.SaveAssociation = function (association) {

            if (association.associationDetails.length > 0) {
                AssociationListService.saveAssociation(association).then(function (d) {
                    growlService.growl('Saved Successfully..', 'success');
                }, function (err) {

                });
            } else {
                growlService.growl('Please add atleast one detail element', 'danger');
            }

        }

        var associationId = $stateParams.associationID;
        if (associationId != -1) {
            AssociationListService.GetAssociation(associationId).then(function (d) {
                $scope.association = d.data;
            }, function (err) { });
            $scope.GetCountriesList();
        } else {
            $scope.GetCountriesList();
        }

    }]);

angular.module('LogiCon').controller('AssociationDetailsController', ['$scope', '$uibModalInstance', 'dataObj', 'growlService', 'CompanyService', 'limitToFilter', 'UtilityFunc',
    function ($scope, $uibModalInstance, dataObj, growlService, CompanyService, limitToFilter, UtilityFunc) {
       
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.timeFormat = UtilityFunc.TimeFormat();
        $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
        $scope.defaultCurrency = UtilityFunc.DefaultCurrency();
        $scope.defaultCountry = UtilityFunc.DefaultCountry();
        $scope.asDetail = angular.copy(dataObj.asDetail);
        //$scope.asDetail.JoinDate = moment($scope.asDetail.JoinDate);
        $scope.SaveAssociationDetails = function (asDetail) {
            if ($scope.IsfrmAssociationDetailsValid) {
                $uibModalInstance.close(asDetail);
            } else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }

        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };


        $scope.IsfrmAssociationDetailsValid = false;
        $scope.$watch('frmAssociationDetails.$valid', function (isValid) {
            $scope.IsfrmAssociationDetailsValid = isValid;
        });

        $scope.CompanyNameResults = function (text) {
            return CompanyService.GetCompanyAutoComplete(text).then(function (res) {
               
                return limitToFilter(res.data, 15);
            }, function (err) { });
        };

        $scope.CompanySelected = function (obj) {            
            $scope.asDetail.Email = '';
            $scope.asDetail.ROCNumber = obj.RegNo;
            CompanyService.GetEmail(obj.Value).then(function (d) {
                $scope.asDetail.Email = d.data.res.EmailID;
                $scope.asDetail.MerchantCode = obj.Value;
            }, function (err) { });
        };

        $scope.RocResults = function (text) {
            return CompanyService.GetRocNoAutoComplete(text).then(function (res) {
                return limitToFilter(res.data, 15);
            }, function (err) { });
        };

        $scope.RocSelected = function (obj) {
            $scope.asDetail.CompanyName = obj.Text;
        };

        if (!angular.isUndefined($scope.asDetail.JoinDate) && $scope.asDetail.JoinDate != null) {
            
            if ($scope.asDetail.JoinDate == null) {
                $scope.asDetail.JoinDate = undefined;
            }
            else
                $scope.asDetail.JoinDate = moment($scope.asDetail.JoinDate);
        }

    }]);