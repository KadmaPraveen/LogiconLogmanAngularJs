angular.module('LogiCon').controller('k8DocumentCntrl', ['$scope', '$uibModalInstance', 'limitToFilter', '$filter', 'dataObj', 'growlService', 'UtilityFunc',
    function ($scope, $uibModalInstance, limitToFilter, $filter, dataObj, growlService, UtilityFunc) {

        $scope.init = function () {
            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.showLoading = false;
            $scope.showDocDate = false;
            $scope.ChangeSupportDocumnet = function () {

                if ($scope.document.SupportingDocumentType == 25767 || $scope.document.SupportingDocumentType == 25768) {
                    $scope.document.DocDateType = 9132;
                    $scope.showDocDate = true;
                }
                else {
                    $scope.showDocDate = false;
                    $scope.document.DocDateType = '';
                }

                
                if ($scope.document.SupportingDocumentType != 25813 || $scope.document.SupportingDocumentType != 25819) {
                    
                    $scope.document.OGACode = null;
                    $scope.document.OGAID = null;
                    $scope.document.OGABranchCode = null;
                    $scope.document.PermitNo = null;
                }
                if ($scope.document.SupportingDocumentType != 25837) {
                    
                    $scope.document.Country = null;
                }
            }
            //$scope.document = {
            //    BranchID: null,
            //    DeclarationNo: null,
            //    ItemNo: null,
            //    SupportingDocumentType: null,
            //    CustomStationCode: null,
            //    ReferenceNo: null,
            //    DocDateType: null,
            //    DocDate: null,
            //    CreatedBy: null,
            //    CreatedOn: null,
            //    ModifiedBy: null,
            //    ModifiedOn: null
            //}
            var tempArray = new Array();
            angular.copy(dataObj.SupportingDocumentTypeList, tempArray);

            angular.forEach(dataObj.declarationDocumentsK8, function (item, key) {
                var obj = $filter('filter')(tempArray, { Value: item.SupportingDocumentType })[0];
                if (!angular.isUndefined(obj)) {
                    if (dataObj.Document.SupportingDocumentType != item.SupportingDocumentType)
                        tempArray = UtilityFunc.removeArrayElementByKey(tempArray, 'Value', obj.Value);
                }
            });

            $scope.lookUpData = {
                docDateTypeList: dataObj.docDateTypeList,
                OGACodeList: dataObj.OGACodeList,
                customStationCodeList: dataObj.customStationCodeList,
                supportingDocumentTypeList: tempArray,
                countryList: dataObj.countryList,
                OGABranchList: dataObj.OGABranchlist


            };
        }
        $scope.document = angular.copy(dataObj.Document);
        $scope.showLoading = true;

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        if (!angular.isUndefined($scope.document.DocDate) && $scope.document.DocDate != null) {

            if ($scope.document.DocDate == null) {
                $scope.document.DocDate = undefined;
            }
            else
                $scope.document.DocDate = moment($scope.document.DocDate);
        }

        $scope.IsFrmDocumentValid = false;
        $scope.$watch('frmdocument.$valid', function (isValid) {
            $scope.IsFrmDocumentValid = isValid;
        });

        $scope.SaveDocument = function (document) {

            if ($scope.document.DocDateType == "") {
                $scope.document.DocDateType = null;
            }

            if ($scope.IsFrmDocumentValid) {
                $uibModalInstance.close(document);
            }
            else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };
        $scope.GetOGABranchCode = function (ogaId) {
            $scope.document.OGABranchCode = $filter('filter')($scope.lookUpData.OGABranchList, { Value: ogaId })[0].OGAbranchCode;
            $scope.document.OGACode = $filter('filter')($scope.lookUpData.OGABranchList, { Value: ogaId })[0].OGACode;
        }
        $scope.init();

    }]);