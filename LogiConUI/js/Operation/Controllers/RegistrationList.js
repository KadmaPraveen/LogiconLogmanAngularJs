angular.module('LogiCon').controller('RegistrationListCntrl', ['$scope', 'RegisteredCompanyService', 'RegistrationService', '$q', '$location', '$state', 'UtilityFunc','growlService','$stateParams','NgTableParams',
function ($scope, RegisteredCompanyService, RegistrationService, $q, $location, $state, UtilityFunc, growlService, $stateParams,NgTableParams) {
    $scope.dateFormat = UtilityFunc.DateFormat();
    //$scope.filter = 4063;
    $scope.Search = {
        filter: 4063,
        CompanyName: '',
        RegistrationNo: '',
        DateFrom: UtilityFunc.FirstDateOfMonth(),
        DateTo: moment()
    };
    var promise1 = RegisteredCompanyService.GetRegisteredCompanies($scope.Search.filter, 0);
    var promise2 = RegistrationService.GetLookUpdata();
    $scope.showLoading = true;
    $q.all([promise1, promise2]).then(function (d) {
        $scope.showLoading = false;

        $scope.companies = d[0].data.registeredCompanies;
        $scope.totalItems = d[0].data.totalItems;

        var arr = new Array();
        angular.forEach(d[1].data.registrationStatusList, function (item, index) {
            if (item.Text != 'Rejected' && item.Text != 'Approved')
                arr.push(item);
        });

        d[1].data.registrationStatusList = arr;
        $scope.lookUpData = d[1].data;
    }, function (err) { });

    $scope.viewInfo = function (companyID) {
        $location.path('/company/' + companyID);
    };

    $scope.viewInfo2 = function (companyID) {
        $location.path('/map');
    };

    $scope.ExportData = function (type, mimetype) {
        RegisteredCompanyService.ExportData(type, mimetype);
    };

    $scope.isFrmSearchValid = false;
    $scope.$watch('RegistrationListCntrl.frmSearch.$valid', function (isValid) {
        $scope.isFrmSearchValid = isValid;
    });
       
    $scope.isFrmDeleteValid = false;
    $scope.$watch('RegistrationListCntrl.frmDelete.$valid', function (isValid) {
        $scope.isFrmDeleteValid = isValid;
    });
    $scope.deletedcompanyid=null;
    $scope.validateRecord = function (deletedcompanyid) {
        $scope.deletedcompanyid = deletedcompanyid;
        isOpenRemarksPP = true;
    };

    $scope.Delete = function (remarks) {
        if ($scope.isFrmDeleteValid) {
            var Obj = {
                CompanyID: $scope.deletedcompanyid,
                Status: false,
                Remarks: remarks
            };
            

            //$location.reload();
            ////$location.path('/operation/subscriberslist');
            RegisteredCompanyService.DeletedCompany(Obj).then(function (d) {
                if (d.data) {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                    //$route.reload('operation/registrationlist');
                    growlService.growl('Deletedted..!', 'success');
                    //$state.go('registrationlist', {});

                } else {

                }
            }, function (err) { });
        } else {
            growlService.growl('Please enter remarks for deletion', 'danger');
        }
    };

    var DataTblobj = {};
    
    $scope.GetTableData = function () {
        
        $scope.ngTblData = new NgTableParams({
            page: 0,
            count: 10,
            sorting: { 
                CreatedOn: 'desc'
            }
        },
            {
                counts: [10, 20, 30],
                getData: function ($defer, params) {
                    DataTblobj.CompanyName = $scope.Search.CompanyName == undefined ? null : $scope.Search.CompanyName;
                    
                    DataTblobj.RegistrationNo = $scope.Search.RegistrationNo == undefined ? null : $scope.Search.RegistrationNo;
                    DataTblobj.Email = $scope.Search.Email == undefined ? null : $scope.Search.Email;
                    DataTblobj.DateFrom = $scope.Search.DateFrom == undefined ? null : $scope.Search.DateFrom;
                    DataTblobj.DateTo = $scope.Search.DateTo == undefined ? null : $scope.Search.DateTo;
                    DataTblobj.RegistrationStatus = $scope.Search.filter == undefined ? null : $scope.Search.filter;
                    DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                    DataTblobj.limit = params.count();
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];

                        DataTblobj.sortColumn = orderBy.substring(1);
                        DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                    }
                    RegisteredCompanyService.SearchRegisteredStatus(DataTblobj).then(function (d) {
                        
                        params.total(d.data.records);
                        $defer.resolve(d.data.data);
                    }, function (err) { });
                }
            });
    };

    $scope.GetTableData();

 $scope.refresh = function () {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }
}]);