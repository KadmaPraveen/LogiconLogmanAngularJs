angular.module('LogiCon').controller('RoleRightsCntrl', ['$scope', 'RolesService', 'SecurablesService', 'growlService', '$uibModal', 'Utility', function ($scope, RolesService, SecurablesService, growlService, $uibModal, Utility) {

    $scope.rr = {};
    $scope.GetRoles = function () {
        RolesService.GetList().then(function (d) {
            $scope.rolesList = d.data;
        }, function (err) { });
    };

    $scope.GetAllRoles = function () {
        RolesService.GetAllRoles().then(function (d) {
            
            $scope.GetRolesList(d);
        }, function (err) { });
    }

    $scope.roleChanged = function () {

        SecurablesService.GetSecurablesByRole($scope.rr.role).then(function (d) {
            
            $scope.GetRolesList(d);
        }, function (err) { });
    };

    function GetPageArr(data, parentIndex) {
        var arr = new Array();
        
        if (typeof data != 'undefined') {
            for (var i = 0; i < data.length; i++) {
                
                var obj = {
                    'name': data[i].PageName,
                    'id': data[i].id,
                    'i': i,
                    'checked': data[i].IsChecked,
                    'type': 'page',
                    'Access': data[i].Access == undefined ? 1 : data[i].Access,
                    parentIndex: parentIndex,
                    'children': GetOperationArr(data[i].operationList, i)
                };
                arr.push(obj);
            }
        }

        return arr;
    }


    function GetOperationArr(data, parentIndex) {
        var arr = new Array();
        if (typeof data != 'undefined') {
            for (var i = 0; i < data.length; i++) {
                var obj = {
                    'name': data[i].OperationName,
                    'id': data[i].id,
                    'i': i,
                    'checked': data[i].IsChecked,
                    'type': 'operation',
                    parentIndex: parentIndex
                    //'children': GetOperationArr(data[i].BranchList)
                };
                arr.push(obj);
            }
        }

        return arr;
    }

    $scope.GetRolesList = function (d) {
        var arr = new Array();
        for (var i = 0; i < d.data.length; i++) {
            var obj = {
                'name': d.data[i].RegistrationTypeName,
                'id': d.data[i].registrationType,
                'i': i,
                'checked': d.data[i].IsChecked,
                'type': 'module',
                'children': GetPageArr(d.data[i].pageList, i)
            };
            arr.push(obj);
        }
        $scope.nodes = arr;
    }


    $scope.IsFrmRoleRightsIsValid = false;
    $scope.$watch('frmRoleRights.$valid', function (isValid) {
        $scope.IsFrmRoleRightsIsValid = isValid;
    });

    $scope.SaveRoleRights = function (securables) {
        debugger;
        var arr = new Array();
        var Obj = {
            checked: '',
            id: '',
            name: '',
            type: ''
        };

        angular.forEach(securables, function (i, val) {
            if (i.checked) {
                debugger;
                var Obj = {
                    IsChecked: i.checked,
                    id: i.id,
                    name: i.name,
                    type: i.type
                };
                arr.push(Obj);
            }
            angular.forEach(i.children, function (x, Child) {
                debugger;
                //if (x.checked) {
                    var Obj1 = {
                        IsChecked: x.checked,
                        id: x.id,
                        name: x.name,
                        type: x.type,
                        Access: x.Access == 0 ? 1 : x.Access
                    };
                    angular.forEach(x.children, function (y, subChild) {
                        if (y.checked) {
                            debugger;
                            Obj1.IsChecked = true;
                            var Obj = {
                                IsChecked: y.checked,
                                id: y.id,
                                name: y.name,
                                type: y.type
                            }
                            arr.push(Obj);
                        }
                    });
                    arr.push(Obj1);
                //}
            });

        });
        
        var isValid=false;
        angular.forEach(arr, function (obj,i) {
            if (obj.IsChecked == true)
                isValid = true;
        });
     
        if ($scope.IsFrmRoleRightsIsValid && isValid) {
            SecurablesService.SaveSecurables(arr, $scope.rr.role).then(function (d) {
                growlService.growl('Success', 'success');
            }, function (err) { });
        } else {
           
            if (angular.isUndefined($scope.rr.role))
            {
                growlService.growl('please select atleast one Role ', 'danger');
            }
            else
            growlService.growl('please select atleast one Module ', 'danger');
        }
    };
    $scope.GetAllRoles();
    $scope.GetRoles();


    //$scope.nodes = [
    //    //{
    //    //    id: 2, name: '1ª Habilitação', checked: true,


    //    //    children: [
    //    //        { id: 3, name: 'Level2 - A', checked: true },
    //    //        { id: 4, name: 'Level2 - B', checked: true }
    //    //    ]
    //    //},

    //    {
    //        id: 3, name: 'l1', checked: true,


    //        children: [
    //            //{ id: 3, name: 'Level2 - A', checked: true },
    //            //{ id: 4, name: 'Level2 - B', checked: true },
    //            {
    //                id: 5, name: 'Level2 - A', checked: true, children: [
    //                    { id: 7, name: 'Level3 - A', checked: false },
    //                    { id: 8, name: 'Level3 - B', checked: false },
    //                    { id: 9, name: 'Level3 - C', checked: false },
    //                    { id: 10, name: 'Level3 - D', checked: false }
    //                    //{
    //                    //    id: 7, name: 'Level3 - B', checked: false, children: [
    //                    //        { id: 8, name: 'Level4 - A', checked: false }
    //                    //    ]
    //                    //}
    //                ]
    //            },
    //            {
    //                id: 11, name: 'Level2 - B', checked: true, children: [
    //                    { id: 12, name: 'Level3 - E', checked: false },
    //                    { id: 13, name: 'Level3 - F', checked: false },
    //                    { id: 14, name: 'Level3 - G', checked: false },
    //                    { id: 15, name: 'Level3 - H', checked: false },
    //                    //{
    //                    //    id: 7, name: 'Level3 - B', checked: false, children: [
    //                    //        { id: 8, name: 'Level4 - A', checked: false }
    //                    //    ]
    //                    //}
    //                ]
    //            }
    //        ]
    //    },

    //];


}]);