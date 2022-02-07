angular.module('LogiCon').controller('ChargeCodeController', ['$scope', '$stateParams', 'ChargeCodeService', 'GstRateService', '$location', '$window', 'growlService', 'Utility', '$state','NgTableParams', 'limitToFilter',
    function ($scope, $stateParams, ChargeCodeService, GstRateService, $location, $window, growlService, Utility, $state, NgTableParams, limitToFilter) {
   
        var DataTblobj = {};
        $scope.isNew = true;
    $scope.GetTableData = function () {
        $scope.ngTblData = new NgTableParams({
        page: 0,
        count: 10,
        sorting: {
            ChargeCode: 'asc'
        }
    }, {
            counts: [10, 20, 30],
            getData: function ($defer, params) {

                DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                DataTblobj.limit = params.count();
                if (params.sorting()) {
                    var orderBy = params.orderBy()[0];

                    DataTblobj.sortColumn = orderBy.substring(1);
                    DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                }

                ChargeCodeService.GetTableList(DataTblobj).then(function (res) {                    
                    params.total(res.data.records);
                    $defer.resolve(res.data.data);
                }, function (err) { })
            }
        });
    };

    $scope.cc = {};    
    $scope.SaveChargeCode = function (cc) {
        
        if ($scope.isfrmChargeCodeValid) {
            debugger;
           //  $scope.cc.surchargecode[0] = $scope.cc.SurChargeCode.split("-");
            ChargeCodeService.SaveChargeCode(cc).then(function (d) {
                
                growlService.growl(d.data, 'success');
                $scope.isNew = false;
                $state.go('chargecodemaster', {});

               // $location.path('/masterdata/chargecodelist');
            }, function () { });
        } else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };

    $scope.AddChargeCode = function (chargeCode) {
        $location.path('/masterdata/chargecodemaster/' + chargeCode);
    };

    $scope.navToList = function () {
        $state.go('chargecodelist', {});
    };
    var chargeCode = $stateParams.chargecode;    
    $scope.showLoading = true;
    if (typeof chargeCode != 'undefined') {
        if (chargeCode != 'NEW' && chargeCode != '') {
            debugger;
            ChargeCodeService.GetChargeCode(chargeCode).then(function (d) {
                debugger;
                $scope.cc = d.data;
                var surchargecode = $scope.cc.SurChargeCode.split("-");
                ChargeCodeService.GetIsSurChargeCodeSearch(surchargecode[0]).then(function (res) {
                    debugger;
                    var desc =res.data[0].Text;
                    $scope.cc.SurChargeDesc= desc.split("-")[1];
                }, function (err) { });

                $scope.isNew = false;
                $scope.truefalse = false;
            }, function () { });
        }

        ChargeCodeService.GetLookupData().then(function (d) {
            $scope.showLoading = false;
            $scope.lookupData = d.data;
            $scope.truefalse = true;
        }, function () { });
    }    
    else {        
        $scope.GetTableData();
    }

    $scope.isChargeCodeExists = function (chargeCode) {
        
        if (chargeCode != '') {
            ChargeCodeService.GetChargeCode(chargeCode).then(function (d) {
                
                if (d.data != null) {
                    $scope.cc = d.data;
                   // growlService.growl('Charge Code already exists', 'warning');
                    
                }

            }, function () { });
        }
    };

    $scope.isfrmChargeCodeValid = false;
    $scope.$watch('frmChargeCode.$valid', function (isValid) {
        $scope.isfrmChargeCodeValid = isValid;
    });

    $scope.gstChange = function (gstRate, gstCode) {
        GstRateService.GetRateByGstCode($scope.cc[gstCode]).then(function (d) {
            $scope.cc[gstRate] = d.data.Rate.toFixed(2);
        }, function (err) { });
    };
    $scope.ChargeCodeResults = function (text) {
        debugger;
        return ChargeCodeService.GetIsSurChargeCodeSearch(text).then(function (d) {
            return limitToFilter(d.data);
        }, function (err) { });
    };
    //ChargeCodeService.GetChargeCode($scope.cc.ChargeCode).then(function (d) {
    //    $scope.cc.SurChargeDescription = d.data.ChargeDescription;
    //});
    $scope.ChargeCodeSelected = function (item) {
        debugger;
        var text = item.Text.split("-");

        $scope.cc.SurChargeDesc = text[1];
    };

    $scope.DeleteChargeCode = function (chargeCode) {
        if ($window.confirm('Are you sure, you want to delete \'' + chargeCode + '\' ?')) {
            ChargeCodeService.DeleteChargeCode(chargeCode).then(function (d) {
                growlService.growl('Deleted successfully', 'success');
                $scope.GetTableData();
            }, function (err) { });
        }
    };

    $scope.IsSurChangeChange = function (isItem) {
        debugger;
        if (!isItem) {
            $scope.cc.SurChargeCode = '';
            $scope.cc.SurChargeDescription = '';
            $scope.cc.Percentage = '';
        }
    }
  

}]);


