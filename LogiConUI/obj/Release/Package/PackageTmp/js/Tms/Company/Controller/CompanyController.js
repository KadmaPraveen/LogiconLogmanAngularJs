angular.module('LogiCon').controller('CompanyController', ['$scope', 'CompanyService', '$timeout', 'Utility', 'growlService',
    function ($scope, CompanyService, $timeout, Utility, growlService) {
        
    $scope.isSelected = false;
    $scope.showLoading = false;
    $scope.BranchID = tempObj.BranchID;
    
        //growl.warning('Logged out successfully...!', {});
   
    $scope.GetCompaniesList = function () {
        
        CompanyService.GetCompaniesList().then(function (d) {            
            var arr = new Array();
            for (var i = 0; i < d.data.length; i++) {
                var obj = {
                    'label': d.data[i].CompanyName,
                    'id': d.data[i].CompanyCode,
                    'i': i,
                    'type': 'company',
                    'children': GetBranchArr(d.data[i].BranchList, i)
                };
                arr.push(obj);
            }
            $scope.companiesList = d.data;
            $scope.treedata = arr;
        }, function (err) {

        });
    };
    $scope.detailsUrl = 'Js/NetTms/Company/Templates/companydetails.html';
    $scope.showSelected = function (sel) {
        
        $scope.showLoading = true;
        if (sel.type == 'company') {
            $scope.detailsUrl = 'Js/NetTms/Company/Templates/companydetails.html';
            $scope.CompanyDetails = $scope.companiesList[sel.i];
            $scope.CompanyDetails.address.CountryCode = "MY";
            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
        }
        else if (sel.type == 'branch') {
            $scope.detailsUrl = 'Js/NetTms/Company/Templates/branchdetails.html';
            var tempObj = $scope.companiesList[sel.parentIndex].BranchList[sel.i];
            CompanyService.GetBranchDetails({
                BranchCode: tempObj.BranchCode,
                BranchID: tempObj.BranchID
            }).then(function (d) {
                $scope.BranchDetails = d.data;

                $timeout(function () {
                    $scope.showLoading = false;
                }, 1000);

            }, function (err) { });
        }

        $scope.isSelected = true;
    };

    $scope.isfrmCompanyDetailsValid = false;    
    $scope.$watch('Cntrl.frmCompanyDetails.$valid', function (isValid) {
        
        $scope.isfrmCompanyDetailsValid = isValid;
    });

    $scope.AddCompany = function (code) {
        
        $scope.CompanyDetails = null;
        $scope.showLoading = true;

        $timeout(function () {
            $scope.showLoading = false;
        }, 1000);
    };

    $scope.SaveCompany = function (CompanyDetails) {
        
        if ($scope.isfrmCompanyDetailsValid) {
            var companyObj = {
                CompanyCode: CompanyDetails.CompanyCode,
                CompanyName: CompanyDetails.CompanyName,
                RegNo: CompanyDetails.RegNo,
                TaxId: CompanyDetails.TaxId,
                Logo: '',
                IsActive: CompanyDetails.IsActive,
                CreatedBy: Utility.CreatedBy,
                ModifiedBy: Utility.ModifiedBy

            };
            CompanyService.SaveCompany(companyObj).then(function (res) {
                growlService.growl(res.data, 'success');
                $scope.GetCompaniesList();
            }, function (err) {

            });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };    

    function GetBranchArr(data, parentIndex) {
        var arr = new Array();
        if (typeof data != 'undefined') {            
            for (var i = 0; i < data.length; i++) {
                var obj = {
                    'label': data[i].BranchName,
                    'id': data[i].BranchCode,
                    'i': i,
                    'type': 'branch',
                    parentIndex: parentIndex
                    //'children': GetBranchArr(data[i].BranchList)
                };
                arr.push(obj);
            }
        }
        
        return arr;
    }

    $scope.GetCompaniesList();
}]);

app.service('CompanyService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetCompaniesList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/list').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetBranchDetails = function (obj) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/branch/' + obj.BranchCode + '/' + obj.BranchID).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveCompany = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/company/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;        
    };
}]);