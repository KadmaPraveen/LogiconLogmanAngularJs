angular.module('LogiCon').controller('ClaimantListController', ['$scope', 'ClaimantService', '$location', '$state', 'growlService', 'NgTableParams', '$filter',
    function ($scope, ClaimantService, $location, $state, growlService, NgTableParams, $filter) {

        $scope.getClaimantList = function () {
            ClaimantService.GetClaimantDatatable().then(function (d) {
                $scope.ClaimantList = d.data;
                $scope.ngTableClaimant();
            }, function (err) { });
        }

        $scope.DeleteClaimant = function (claimantId) {
            ClaimantService.deleteClaimant(claimantId).then(function (d) {
                growlService.growl('DELETED SUCCESSFULLY', 'danger');
                $state.go('ClaimantList', {}, { reload: true });
            }, function (err) {

            });
        }
        $scope._claimantIndex = -1;
        var DataTblobj = {};
        $scope.ngTblClaimant = function () {
            $scope.tblClaimant = new NgTableParams({
                page: 0,
                count: 10,
                sorting: {
                    name: 'desc'
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
                    ClaimantService.GetClaimantDatatable(DataTblobj).then(function (res) {

                        params.total(res.data.records);
                        $defer.resolve(res.data.data);
                    }, function (err) { });

                }
            })
        };

        $scope.ngTblClaimant();
    }]);