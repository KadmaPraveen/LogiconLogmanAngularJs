﻿angular.module('LogiCon').controller('AddEditk2DocumentCntrl', ['$scope', '$uibModalInstance', 'limitToFilter', '$filter', 'dataObj', 'growlService', 'UtilityFunc',
function ($scope, $uibModalInstance, limitToFilter, $filter, dataObj, growlService, UtilityFunc) {
    
    $scope.dateFormat = UtilityFunc.DateFormat();  
    $scope.showDocDate = false;
    var tempArray = new Array();
    angular.copy(dataObj.supportingDocumentTypeList, tempArray);

    angular.forEach(dataObj.declarationDocumentsK2, function (item, key) {
        var obj = $filter('filter')(tempArray, { Value: item.SupportingDocumentType })[0];
        if (!angular.isUndefined(obj)) {
            if (dataObj.Document.SupportingDocumentType != item.SupportingDocumentType)
                tempArray = UtilityFunc.removeArrayElementByKey(tempArray, 'Value', obj.Value);
        }
    });
    $scope.ChangeSupportDocumnet = function () {
        
        if ($scope.document.SupportingDocumentType == 25767 || $scope.document.SupportingDocumentType == 25768) {
            $scope.document.DocDateType = 9132;
            $scope.showDocDate = true;
        }
        else {
            $scope.showDocDate = false;
            $scope.document.DocDateType = '';
        }
        if ($scope.document.SupportingDocumentType != 25837) {
            $scope.document.Country = null;
        }
        if ($scope.document.SupportingDocumentType != 25819) {
            $scope.document.OGACode = null;
            $scope.document.OGAID = null;
            $scope.document.OGABranchCode = null;
            $scope.document.PermitNo = null;
        }


    }

    $scope.lookUpData = {
        docDateTypeList: dataObj.docDateTypeList,
        OGACodeList: dataObj.OGACodeList,
        customStationCodeList: dataObj.customStationCodeList,
        supportingDocumentTypeList: tempArray,
        OGABranchlist: dataObj.OGABranchlist,
        countryList: dataObj.countryList
    };
    $scope.document = angular.copy(dataObj.Document);
    $scope.showLoading = true;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


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
        
        $scope.document.OGABranchCode = $filter('filter')($scope.lookUpData.OGABranchlist, { Value: ogaId })[0].OGAbranchCode;
        $scope.document.OGACode = $filter('filter')($scope.lookUpData.OGABranchlist, { Value: ogaId })[0].OGACode;
    }

    $scope.showLoading = false;
}]);