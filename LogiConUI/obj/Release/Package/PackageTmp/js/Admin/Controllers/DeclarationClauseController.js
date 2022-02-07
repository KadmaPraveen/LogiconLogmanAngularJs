angular.module('LogiCon').controller('DeclarationClauseController', ['$scope', 'ClauseService', 'growlService', function ($scope, ClauseService, growlService) {


    $scope.init = function () {
        $scope.clause = {};
        $scope.lookUpData = {};
        $scope.GetLookUpdata();
        $scope.clauseTitle = false;
    };

    $scope.GetLookUpdata = function () {
        ClauseService.GetLookupData().then(function (d) {
            $scope.lookUpData = d.data;
        }, function (err) {
            console.log(err);
        });
    };

    $scope.GetByClauseCode = function (code) {
        debugger;
        ClauseService.GetByClauseCode(code).then(function (d) {
            $scope.clause = d.data;
        }, function (err) {
            console.log(err);
        });
    };

    $scope.SaveClause = function (clause) {
        $scope.clause.CountryCode = 'MY';
        debugger;
        ClauseService.SaveClause(clause).then(function (d) {
            growlService.growl('Declaration Saved Successfully..', 'success');
        }, function (err) {
        });
    };

    $scope.CreateNewClause = function () {
        debugger;
        //$scope.clause.ClauseCode = 0;
        //$scope.clause.ClauseCode = $scope.clause.ClauseCode+2000;
        $scope.clauseTitle = true;

    }
    $scope.init();
}]);
//declarationclause.js