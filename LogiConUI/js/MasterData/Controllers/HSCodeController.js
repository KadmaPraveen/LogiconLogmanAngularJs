angular.module('LogiCon').controller('HSCodeController', ['$scope', 'HSCodeService', '$stateParams', 'NgTableParams', '$state', 'limitToFilter', 'growlService', function ($scope, HSCodeService, $stateParams, NgTableParams, $state, limitToFilter, growlService) {

    $scope.IsNew = true;
    $scope.isFrmHSCodeValid = false;
    $scope.$watch('frmHSCode.$valid', function (isValid) {
        $scope.isFrmHSCodeValid = isValid;
    });
    

    var DataTblobj = {};
    $scope.GetTableData = function () {
        $scope.ngTblData = new NgTableParams({
            page: 0,
            count: 10,
            sorting: {
               CreatedOn:'desc'
            }
        }, {
            counts: [10, 20, 30, 50, 75, 100],
            getData: function ($defer, params) {

                DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                DataTblobj.limit = params.count();
                if (params.sorting()) {
                    var orderBy = params.orderBy()[0];

                    DataTblobj.sortColumn = orderBy.substring(1);
                    DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                }

                HSCodeService.GetTableList(DataTblobj).then(function (res) {
                    params.total(res.data.records);
                    $defer.resolve(res.data.data);
                }, function (err) { })
            }
        });
    };
    
    var tariffCode = $stateParams.tariffCode;
    if (typeof tariffCode != 'undefined') {
        HSCodeService.GetLookupData().then(function (d) {
            $scope.lookUpData = d.data;

        }, function (err) { });
        $scope.isEdit = true;
        HSCodeService.GetHSCode(tariffCode).then(function (d) {
            
            $scope.hs = d.data;
            if (d.data.TariffCode != null)
                $scope.IsNew = false;
            $scope.isEdit = false;
            $scope.manipulateDutyRate($scope.hs.ImportDutyMethod, $scope.isEdit);
            $scope.manipulateExDutyRate($scope.hs.ExportDutyMethod, $scope.isEdit);
            HSCodeService.GetHSCodeHeader($scope.hs.HeaderCode).then(function (d) {
                $scope.hs.HeaderCodeText = d.data.HeadingDescription;
            }, function (err) { });

        }, function (err) { });
    } else {
        $scope.GetTableData();
    }

    $scope.HSCodeHeaderResults = function (text) {
        return HSCodeService.GetHSCodeHeaderAutoComplete(text).then(function (response) {
            return limitToFilter(response.data, 15);
        });
    };

    $scope.HSCodeHeaderSelect = function (obj) {
        
        $scope.hs.HeaderCode = obj.Value;
    };

    $scope.EditHSCode = function (tariffCode) {
        $state.go('hscode', {
            tariffCode: tariffCode
        });
    };

    $scope.SaveHSCode = function (hs) {
        if ($scope.isFrmHSCodeValid) {
            HSCodeService.SaveHSCode(hs).then(function (d) {
                growlService.growl('Saved Successfully', 'success');
            }, function (err) { });
        } else {
            growlService.growl('Please enter all mandatory fields', 'danger');
        }
    };

    $scope.isDisable = false;
    $scope.isImpRate = false;
    $scope.isImpSepRate = false;

    $scope.manipulateDutyRate = function (dutyMethod, isEdit) {
        debugger
        if (dutyMethod == "0") {
            $scope.isDisable = true;
        }
        else if (dutyMethod == "1") {
            $scope.isDisable = false;
            $scope.isImpRate = false;
            $scope.isImpSepRate = true;
        }
        else if (dutyMethod == "2") {
            $scope.isDisable = false;
            $scope.isImpRate = true;
            $scope.isImpSepRate = false;
        }
        else if (dutyMethod == "3") {
            $scope.isDisable = false;
            $scope.isImpRate = false;
            $scope.isImpSepRate = false;
        }
        else if (dutyMethod == "4") {
            $scope.isDisable = false;
            $scope.isImpRate = false;
            $scope.isImpSepRate = false;
        }
        else if (dutyMethod == "5") {
            $scope.isDisable = false;
            $scope.isImpRate = false;
            $scope.isImpSepRate = false;
        }
        else if (dutyMethod == "6") {
            $scope.isDisable = false;
            $scope.isImpRate = false;
            $scope.isImpSepRate = false;

        }

        if (isEdit) {
            delete $scope.hs.ImportDutyRate;
            delete $scope.hs.ImportDutySpecificRate;
        }
    }
    $scope.isExDisable = false;
    $scope.isExRate = false;
    $scope.isExSepRate = false;

    $scope.manipulateExDutyRate = function (dutyMethod, isEdit) {

        if (dutyMethod == "0") {
            $scope.isExDisable = true;
        }
        else if (dutyMethod == "1") {
            $scope.isExDisable = false;
            $scope.isExRate = false;
            $scope.isExSepRate = true;
        }
        else if (dutyMethod == "2") {
            $scope.isExDisable = false;
            $scope.isExRate = true;
            $scope.isExSepRate = false;
        }
        else if (dutyMethod == "3") {
            $scope.isExDisable = false;
            $scope.isExRate = false;
            $scope.isExSepRate = false;
        }
        else if (dutyMethod == "4") {
            $scope.isExDisable = false;
            $scope.isExRate = false;
            $scope.isExSepRate = false;
        }
        else if (dutyMethod == "5") {
            $scope.isExDisable = false;
            $scope.isExRate = false;
            $scope.isExSepRate = false;
        }
        else if (dutyMethod == "6") {
            $scope.isExDisable = false;
            $scope.isExRate = false;
            $scope.isExSepRate = false;
        }
        if (isEdit) {
            delete $scope.hs.ExportDutyRate;
            delete $scope.hs.ExportDutySpecificRate;
        }
    }

}]);