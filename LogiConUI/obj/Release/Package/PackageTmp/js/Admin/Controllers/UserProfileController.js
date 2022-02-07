angular.module('LogiCon').controller('UserProfileController', ['$scope', 'UserProfileService', 'SecurableService', '$stateParams', 'growlService', '$location', '$q', '$filter', 'UtilityFunc', '$state', function ($scope, UserProfileService, SecurableService, $stateParams, growlService, $location, $q, $filter, UtilityFunc, $state) {
    $scope.showLoading = true;
    $scope.isFrmUserProfileValid = false;
    $scope.$watch('frmUserProfile.$valid', function (isValid) {
        $scope.isFrmUserProfileValid = isValid;
    });
    
    $scope.SaveUser = function (user) {
        debugger;
        if ($scope.isFrmUserProfileValid) {
            $scope.showLoading = true;
            user.UserID = user.EmailID;
            UserProfileService.SaveUserProfile(user).then(function (d) {
                $scope.showLoading = false;
                growlService.growl('User Saved Successfully..', 'success');
                $state.go('userlist', {});
            }, function (err) { });
        } else {
            growlService.growl('Please enter all mandatory fields', 'danger');
        }
    };

    $scope.checkUser = function () {
        $scope.showLoading = true;
        UserProfileService.getUser({
            EmailID: $scope.user.EmailID
        }).then(function (d) {
            $scope.showLoading = false;
            if (d.data != null) {
                $scope.user = d.data;
            }
            else {
                $scope.user.EmailID = $scope.user.EmailID;
                if($scope.user.EmailID!=null)
                {
                    $scope.user.UserName=null;
                    $scope.user.ICNo = null;
                    $scope.user.Password = null;
                    $scope.user.ContactNo = null;
                    $scope.user.UserDesignation = null;
                    $scope.user.UserGroup = null;
                    $scope.user.IsActive = false;
                    $scope.user.BranchID = null;
                    $scope.user.RoleCode = null;
                }
            }
            
        }, function (err) { });
    };

    $scope.back = function () {
       
        $state.go('userlist', {});
    };

    var userID = $stateParams.userID;
   
    var lookupDataPromise = UserProfileService.getLookupData();
   
    $q.all([lookupDataPromise]).then(function (d) {
        $scope.showLoading = false;
        $scope.lookUpData = d[0].data;
        //$scope.securableItems = d[1].data;
    }, function (err) { });

    $scope.SaveRights = function () {
        $scope.showLoading = true;
        var rightsArray = $filter('filter')($scope.securableItems, { IsChecked: true });
        var rightsArrDTO = new Array();
        angular.forEach(rightsArray, function (item, index) {
            var obj = {
                UserID: $scope.user.EmailID,
                SecurableItem: item.SecurableItem,
                LinkGroup: item.LinkGroup,
                LinkID: item.LinkID
            };

            rightsArrDTO.push(obj);
        });
        var saveUserRightsDTO = {
            userRightsList: rightsArrDTO,
            userID: $scope.user.EmailID
        };

        SecurableService.SaveUserRights(saveUserRightsDTO).then(function (d) {
            if (UtilityFunc.UserID() == $scope.user.EmailID) {
                SecurableService.GetUserRights().then(function (d) {
                    $scope.showLoading = false;
                    growlService.growl('User Rights Saved Successfully..!', 'success');
                    sessionStorage.setItem('SsnUserRights', JSON.stringify(d.data));
                }, function (err) { });
            } else {
                $scope.showLoading = false;
                growlService.growl('User Rights Saved Successfully..!', 'success');
            }
        }, function (err) { });

    };
    debugger;
    var userID = $stateParams.userID;
    if (!angular.isUndefined(userID) && userID != 'NEW' && userID != '') {
        UserProfileService.getUser({
            EmailID: userID
        }).then(function (d) {
            $scope.user = d.data;
        }, function (err) { });
    }
}]);


