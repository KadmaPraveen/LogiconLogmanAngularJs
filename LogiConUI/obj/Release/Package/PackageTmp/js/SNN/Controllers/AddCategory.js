angular.module('LogiCon').controller('AddCategoryctrl', ['$scope', 'categoryService', 'growlService', 'Utility', 'UtilityFunc', 'NgTableParams','$stateParams', function ($scope, categoryService, growlService, Utility, UtilityFunc, NgTableParams, $stateParams) {
    
    $scope.snn = {
    categoryListItems: new Array(),
    };
    
    $scope.isfrmCategoryDetailsValid = false;
    $scope.$watch('AddCategoryctrl.frmCategoryDetails.$valid', function (isValid) {
        $scope.isfrmCategoryDetailsValid = isValid;
    });

    
    var id = $stateParams.id;
    $scope.ImageFile = Utility.BaseUrl + 'UploadImages/SNN/Category/' + id ;
    $scope.fileChanged = function (file) {
        
      //  $('#img').attr('src',  $scope.ImageFile);
        $scope.snn.Image = file[0].name;
    };
    $scope.SaveCategory = function (obj) {
        
        if ($scope.isfrmCategoryDetailsValid) {
            obj.CreatedBy = Utility.CreatedBy;
            obj.ModifiedBy = Utility.ModifiedBy;
            var file = document.getElementById('imageUpload').files[0];
            
            categoryService.SaveCategory(obj, file).then(function (res) {
                growlService.growl(res, 'success');
                //$scope.GetTableData();
                //$scope.isDisabledCompany = true;
                
            }, function (err) {
                growlService.growl(err.statusText, 'danger');
            });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };

    
    var CategoryId = $stateParams.id;
    var desc = $stateParams.category;
    
    
    if (!angular.isUndefined(CategoryId) && CategoryId != 'NEW') {
        categoryService.GetSNNCategory(CategoryId,desc).then(function (d) {
            
            $scope.IsNew = false;
            $scope.category = d.data;
        }, function (err) { });
    }
   
           
 }]);