var app = angular.module('LogiCon', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable',
    'ngSanitize',
    //'ui.bootstrap.datetimepicker',
    //'ui.dateTimeInput
    'ngMaterial',
    'ngMaterialDatePicker',
    'treeControl',
    'mwl.calendar',
    'ngTagsInput',
    'vtex.ngCurrencyMask',
    'easypiechart'
    //,'angularTrix''ngTable'
]);

app.run(function ($rootScope, $location, $anchorScroll) {
    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
        var currentRoute = toState.url;
        var IS_AUTHENTICATE = sessionStorage.getItem('IS_AUTHENTICATE') == 'true' ? true : false;
        var companyType = sessionStorage.getItem('COMPANYTYPE');

        $anchorScroll('iFrameMain');
        if (IS_AUTHENTICATE) {
            if (companyType == 'OWNER' && currentRoute == '/')
                $location.path('/owner');
            else
                return;
        }
        else {
            if (currentRoute != '/registration' && currentRoute != '/registration/:userid' && currentRoute != '/registeredcompany' && currentRoute != '/emailverification/:uniqueid' && currentRoute != '/forgotpassword') {
                //$location.path('/login');
                window.parent.location.href = 'default.html';
            }
            else
                return;
        }
    });
});



app.filter('logiconcurrencyFilter', ['$filter', function ($filter) {
    return function (input) {
        input = parseFloat(input);
        if (input % 1 === 0) {
            input = input.toFixed(2);
        }

        return (input).replace(/(\d)(?=(\d{3})+($|\.))/g, "$1cfs");
    };
}]);

app.directive('logiconFormat2', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9\.]/g, '');
                if (transformedInput !== inputValue) {
                    ctrl.$setViewValue(transformedInput);
                    ctrl.$render();
                }
                return transformedInput;
            });

            ctrl.$formatters.unshift(function (a) {
                return $filter('number')(ctrl.$modelValue, attrs.logiconFormat2)
            });

            elem.bind('blur', function (event) {
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                //ctrl.$modelValue = parseFloat(plainNumber).toFixed(attrs.logiconFormat);
                //ctrl.$viewValue = $filter('number')(plainNumber, attrs.logiconFormat);
                //ctrl.$setViewValue($filter('number')(plainNumber, attrs.logiconFormat));
                //ctrl.$render();
                //scope.$apply();
                var decimalPart = plainNumber.split('.')[1];

                if (plainNumber != undefined && plainNumber != '' && (angular.isUndefined(decimalPart) || decimalPart.length <= parseInt(attrs.logiconFormat2))) {
                    //var temp2 = parseFloat(plainNumber).toFixed(attrs.logiconFormat2);
                    //
                    ctrl.$setViewValue(parseFloat(plainNumber).toFixed(attrs.logiconFormat2));
                    ctrl.$render();
                    //var temp = $filter('number')(plainNumber, attrs.logiconFormat2);
                    //
                    elem.val($filter('number')(plainNumber, attrs.logiconFormat2));
                    //scope.$apply();
                }

            });

            elem.bind('focus', function (event) {
                var val = elem.val();
                if (val != undefined && val != '') {
                    var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                    if (plainNumber != undefined && plainNumber != '')
                        elem.val(parseFloat(plainNumber));
                }
            });
        }
    };
}]);

app.directive('treeView', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            localNodes: '=model',
            localClick: '&click'
        },
        link: function (scope, tElement, tAttrs, transclude) {

            var maxLevels = (angular.isUndefined(tAttrs.maxlevels)) ? 10 : tAttrs.maxlevels;
            var hasCheckBox = (angular.isUndefined(tAttrs.checkbox)) ? false : true;
            scope.showItems = [];

            scope.showHide = function (ulId) {
                //
                var hideThis = document.getElementById(ulId);
                var showHide = angular.element(hideThis).attr('class');
                angular.element(hideThis).attr('class', (showHide === 'show' ? 'hide' : 'show'));
            }

            scope.showIcon = function (node) {
                if (!angular.isUndefined(node.children)) return true;
            }

            scope.checkIfChildren = function (node) {
                if (!angular.isUndefined(node.children)) return true;
            }

            /////////////////////////////////////////////////
            /// SELECT ALL CHILDRENS
            // as seen at: http://jsfiddle.net/incutonez/D8vhb/5/
            function parentCheckChange(item) {

                for (var i in item.children) {
                    item.children[i].checked = item.checked;
                    if (item.children[i].children) {
                        parentCheckChange(item.children[i]);
                    }
                }
            }

            scope.checkChange = function (node, child) {
                // scope.active = scope.active == node.id ? node.id : node.id;

                if (node.children) {

                    parentCheckChange(node);
                }

                $('input[type=checkbox]').change(function () {
                    debugger;
                    if (this.checked) { // if checked - check all parent checkboxes
                        $(this).parents('li').children('input[type=checkbox]').prop('checked', true);
                    }
                    // children checkboxes depend on current checkbox
                    $(this).parent().find('input[type=checkbox]').prop('checked', this.checked);
                });
            }

            scope.showAccessRights = true;
            scope.active = 9156;
            scope.showAcessRights = function (node) {

                scope.active = scope.active == node.id ? node.id : node.id;
                if (node.type != "page") {
                    scope.showAccessRights = true;
                    node.Access = "0";
                }
                else {
                    scope.showAccessRights = false;
                    if (node.Access == 0)
                        node.Access = 1;
                }


            }
            /////////////////////////////////////////////////

            function renderTreeView(collection, level, max) {
                //
                var text = '';

                text += '<li ng-repeat="n in ' + collection + '" >';
                text += '<span ng-show=showIcon(n) class="show-hide" ng-click=showHide(n.id)><i class="fa fa-plus-square"></i></span>';
                text += '<span ng-show=!showIcon(n) style="padding-right: 13px"></span>';

                if (hasCheckBox) {
                    text += '<input class="treeview-checkbox"  class="custom-unchecked" type="checkbox" ng-model=n.checked ng-change=checkChange(n,localNodes) value="" >&nbsp;&nbsp;&nbsp;&nbsp;<label ng-click=showAcessRights(n) >{{n.name}}</label>';

                    //<div class="checkbox m-b-15 ">   <label> <input type="checkbox" class="tree-checkbox" value="" aria-label="Freight" ng-model=n.checked ng-change=checkChange(n)> <i class="input-helper"></i></label></div>';

                    //

                }

                //text += '<span class="edit" ng-click=localClick({node:n})><i class="fa fa-pencil"></i></span>'

                // text += '<label>{{n.name}}</label>';
                if (level < max) {
                    text += '<ul id="{{n.id}}" class="hide" ng-if=checkIfChildren(n)>' + renderTreeView('n.children', level + 1, max) + '';
                    text += '</li></ul>';

                    text += '<ul class="radioctn"> <li  ng-class={active:active==n.id}>';
                    text += '<div class="treeRadio border-row-left p-l-15"><md-radio-group ng-model="n.Access" >';
                    text += '<md-radio-button value=1 class="md-primary" ng-disabled=showAccessRights> Read Only</md-radio-button>';
                    text += '<md-radio-button value=2 class="md-primary" ng-disabled=showAccessRights>  Read Write </md-radio-button>';
                    text += '<md-radio-button value=3 class="md-dangar" ng-disabled=showAccessRights>Delete</md-radio-button>';
                    text += '<md-radio-button value=4 class="md-success" ng-disabled=showAccessRights>Full Access </md-radio-button>';
                    text += '</md-radio-group></li></ul>';

                } else {
                    text += '</li>';
                }


                return text;
            }// end renderTreeView();


            try {
                var text = '<ul  class="tree-view-wrapper ">';
                text += renderTreeView('localNodes', 1, maxLevels);
                text += '</ul>';
                tElement.html(text);
                $compile(tElement.contents())(scope);
            }
            catch (err) {
                tElement.html('<b>ERROR!!!</b> - ' + err);
                $compile(tElement.contents())(scope);
            }
        }
    };
});

app.directive('logiconFormat', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function (a) {
                return $filter('number')(ctrl.$modelValue, attrs.logiconFormat)
            });

            elem.bind('blur', function (event) {
                if (elem.val() != null && elem.val() != '') {
                    var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter('number')(plainNumber, attrs.logiconFormat));
                }
            });
        }
    };
}]);

app.filter('logiconCurrencyFilter', function ($filter) {
    return function () {

    };
});

app.filter('sumOfValue', function () {
    return function (data, key) {
        if (angular.isUndefined(data) && angular.isUndefined(key))
            return 0;
        var sum = 0;
        angular.forEach(data, function (value) {
            if (!angular.isUndefined(value[key]) && value[key] != null)
                sum = sum + parseFloat(value[key]);
        });
        return sum.toFixed(4);
    }
});

app.directive('compareTo', function () {

    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});

app.directive('decimalNumber', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }

                var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if (!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean = negativeCheck[0] + '-' + negativeCheck[1];
                    if (negativeCheck[0].length > 0) {
                        clean = negativeCheck[0];
                    }

                }

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 4);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});

app.directive('logiconControlCurrency', function ($filter, $locale) {

    var decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP;
    var toNumberRegex = new RegExp('[^0-9\\' + decimalSep + ']', 'g');
    var trailingZerosRegex = new RegExp('\\' + decimalSep + '0+$');
    var filterFunc = function (input, attrs) {
        if (angular.isUndefined(input)) {
            return false;
        }

        //return $filter('currency')(value);
        input = parseFloat(input);

        if (input % 1 === 0) {
            input = input.toFixed(2);
        }

        return input;
        //return (input).replace(/(\d)(?=(\d{3})+($|\.))/g, "$1,");
    };

    function getCaretPosition(input) {
        if (!input) return 0;
        if (input.selectionStart !== undefined) {
            return input.selectionStart;
        } else if (document.selection) {
            // Curse you IE
            input.focus();
            var selection = document.selection.createRange();
            selection.moveStart('character', input.value ? -input.value.length : 0);
            return selection.text.length;
        }
        return 0;
    }

    function setCaretPosition(input, pos) {

        if (!input) return 0;
        if (input.offsetWidth === 0 || input.offsetHeight === 0) {
            return; // Input's hidden
        }
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(pos, pos);
        }
        else if (input.createTextRange) {
            // Curse you IE
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function toNumber(currencyStr) {
        return parseFloat(currencyStr.replace(toNumberRegex, ''), 10);
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, elem, attrs, modelCtrl) {
            modelCtrl.$formatters.push(function (value) {
                if (angular.isUndefined(value)) {
                    input = parseFloat('0.00');
                    return input.toFixed(attrs.logiconControlCurrency)
                } else {
                    input = parseFloat(value);
                    return input.toFixed(attrs.logiconControlCurrency);
                }
            });
            //modelCtrl.$formatters.push(filterFunc);
            //modelCtrl.$parsers.push(function (newViewValue) {                
            //    var oldModelValue = modelCtrl.$modelValue;
            //    var newModelValue = toNumber(newViewValue);
            //    modelCtrl.$viewValue = filterFunc(newModelValue);
            //    var pos = getCaretPosition(elem[0]);
            //    elem.val(modelCtrl.$viewValue);
            //    var newPos = pos + modelCtrl.$viewValue.length -
            //                       newViewValue.length;
            //    if ((oldModelValue === undefined) || isNaN(oldModelValue)) {
            //        newPos -= 3;
            //    }
            //    setCaretPosition(elem[0], newPos);
            //    return newModelValue;
            //});
        }
    };
});

app.directive('logiconDecimal', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9\.]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

app.directive('logiconNumber', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                if (typeof inputValue == 'number') {
                    inputValue = inputValue.toString();
                }

                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

app.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value);
            });
        }
    };
});

app.directive('disallowSpaces', function () {
    return {
        restrict: 'A',

        link: function ($scope, $element) {
            $element.bind('keydown', function (e) {
                if (e.which === 32 || e.key === "-") {
                    e.preventDefault();
                }
            });
        }
    }
});





app.directive('hasPermission', function ($filter) {
    return {
        link: function (scope, element, attrs) {
            var userRights = JSON.parse(sessionStorage.getItem('SsnUserRights'));
            var linkID = attrs.linkid;
            var securableItem = attrs.securable;

            var obj = $filter('filter')(userRights, { LinkID: linkID });
            var flag = false;
            angular.forEach(obj, function (item, index) {
                if (item.SecurableItemDescription.toLowerCase() == securableItem.toLowerCase())
                    flag = true;
            });

            if (flag)
                element.show();
            else
                element.hide();
        }
    };
});



app.directive('hasSecurable', function ($filter, UtilityFunc) {
    return {
        link: function (scope, element, attrs) {

            var securables = UtilityFunc.GetSecurables();
            var securable = attrs.module;


            var _securable = $filter('filter')(securables, securable, true)[0];
            if (!angular.isUndefined(_securable) && _securable != null && _securable != '')
                element.show();
            else
                element.hide();


            /*
            var flag = false;
            
            for (var i = 0; i < moduleArray; i++) {
                var obj = $filter('filter')(GetSecurables, { ModuleDescription: moduleArray[i].trim().toLowerCase() }, true)[0];
                if (!angular.isUndefined(obj)) {
                    if (obj.ModuleDescription.toLowerCase() == moduleArray[i].trim().toLowerCase()) {
                        flag = true;
                        break;
                    }
                }
            }
            if (flag)
                element.show();
            else
                element.hide();
            */
        }
    };
});
app.directive('logiconAlphaNumber', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                if (typeof inputValue == 'number') {
                    inputValue = inputValue.toString();
                }

                var transformedInput = inputValue.replace(/[^0-9+-]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

//
//app.directive('hasSecurable', function ($filter, UtilityFunc) {
//    return {
//        link: function (scope, element, attrs) {
//            

//            var getSecurable = UtilityFunc.getSecurable();
//            
//            var moduleArray = attrs.module;


//            angular.forEach(getSecurable, function (key, value) {
//                
//                var flag = false;
//                if(key==moduleArray)
//                {
//                    var flag = true;
//                        element.show();

//                }

//                else
//                {
//                    element.hide();
//                }

//            });


//        }
//    };
//});

app.directive('httpSrc', ['$http', function ($http) {
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
        var requestConfig = {
            method: 'Get',
            url: attrs.httpSrc,
            responseType: 'arraybuffer',
            cache: 'true'
        };

        $http(requestConfig)
            .success(function (data) {
                var arr = new Uint8Array(data);
                var raw = '';
                var i, j, subArray, chunk = 5000;
                for (i = 0, j = arr.length; i < j; i += chunk) {
                    subArray = arr.subarray(i, i + chunk);
                    raw += String.fromCharCode.apply(null, subArray);
                }
                var b64 = btoa(raw);

                //attrs.$set('src', "data:image/jpeg;base64," + b64);
                download('data:image/jpeg;base64,' + b64, 'edi.txt', attrs.mime)
            });
    }

}]);

app.service('DownloadService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.Download = function (fileName, type, mimetype) {

        var requestConfig = {
            method: 'Get',
            url: Utility.ServiceUrl + '/download/file/' + type + '/' + fileName + '/',
            responseType: 'arraybuffer',
            cache: 'false'
        };

        $http(requestConfig)
            .success(function (data) {
                var arr = new Uint8Array(data);
                var raw = '';
                var i, j, subArray, chunk = 5000;
                for (i = 0, j = arr.length; i < j; i += chunk) {
                    subArray = arr.subarray(i, i + chunk);
                    raw += String.fromCharCode.apply(null, subArray);
                }
                var b64 = btoa(raw);
                download('data:image/jpeg;base64,' + b64, fileName, mimetype)
            });
    };

    this.DownloadRegistrationFiles = function (fileName, type, mimetype, companyID) {

        var requestConfig = {
            method: 'Get',
            url: Utility.ServiceUrl + '/download/file/' + companyID + '/' + type + '/' + fileName + '/',
            responseType: 'arraybuffer',
            cache: 'false'
        };

        $http(requestConfig)
            .success(function (data) {
                var arr = new Uint8Array(data);
                var raw = '';
                var i, j, subArray, chunk = 5000;
                for (i = 0, j = arr.length; i < j; i += chunk) {
                    subArray = arr.subarray(i, i + chunk);
                    raw += String.fromCharCode.apply(null, subArray);
                }
                var b64 = btoa(raw);

                download('data:application/octet-stream;base64,' + b64, fileName, mimetype)
                //download('data:image/jpeg;base64,' + b64, fileName, mimetype)
                //window.open("data:application/pdf;base64," + Base64.encode(out));
            });
    };
}]);

app.directive('logiconLimit', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var limit = parseInt(attrs.ngMaxlength);
            angular.element(elem).on('keypress', function (e) {

                if (this.value.length == limit) {
                    //var temp = $window.getSelection().toString();
                    var isFirefox = typeof InstallTrigger !== 'undefined';
                    if (isFirefox) {
                        var Key = e.keyCode;
                        if (Key != 8 && Key != 37 && Key != 39 && Key != 46) {
                            e.preventDefault();
                            this.setSelectionRange(limit, limit);
                        }
                    } else {
                        e.preventDefault();
                        this.setSelectionRange(limit, limit);
                    }
                }
            });
        }
    }
}]);

app.constant('Messages', {
    DataGridNorecords: 'No records found'
});

app.directive('hcChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], scope.options);
        }
        //,
        //controller: ['$scope', '$q', 'VisualReportsService', '$routeParams',
        //    function ($scope, $q, VisualReportsService, $routeParams) {
        //        chart = this;
        //        VisualReportsService.GetHSCodePortOfLoading().then(function (d) {
        //            
        //            $scope.chartOptions = d.data;
        //        }, function (err) { });

        //    }]
    };
})

app.directive('hcPieChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: scope.title
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    data: scope.data
                }]
            });
        }

    };
});
var chart;
app.service('DataTransferService', ['$http', function ($http) {
    this.Data = [];

    this.SetData = function (data) {
        this.Data = data;
    };

    this.GetData = function () {
        return this.Data;
    }
}]);

//app.service('VisualReportsService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
//    this.GetHSCodePortOfLoading = function () {
//        var deferred = $q.defer();
//        $http.get(Utility.ServiceUrl + '/Reports/VisualReports/hscodeportofloading').then(function (res) {
//            deferred.resolve(res);
//        }, function (err) {
//            deferred.reject(err);
//        });
//        return deferred.promise;
//    };
//}]);
//app.directive("ngModel", ["$timeout", function ($timeout) {
//    return {
//        restrict: 'A',
//        priority: -1, // lower priority than built-in ng-model so it runs first
//        require: 'ngModel',
//        scope: {
//            ngModel: '='
//        },
//        link: function (scope, element, attr, ngModel) {
//            
//            $timeout(function () {
//                var modelVal1 = ngModel.$viewValue;

//            });

//            //
//            var modelName = attr.ngModel;

//            var modelVal = scope[ngModel.$name];
//            var modelVal1 = ngModel.$viewValue;

//            //if (attr.ngModel) {
//            //    var myModelReference = _.get(scope, attr.ngModel);
//            //}

//           // $(element).closest('.fg-line').addClass('fg-toggled');

//            //scope.modelValue = function () {
//            //    console.log('modelvalue - ' + ngModel.$viewValue);
//            //    return ngModel.$viewValue;
//            //};

//        }
//    };
//}])


app.directive("myDir", function () {
    return {
        //restrict: 'A',
        require: 'ngModel',
        scope: {
            myDir: '=',
            control: '='
        },
        link: function (scope, element, attr, ngModel) {
            if (scope.myDir != null && scope.myDir != '' && !angular.isUndefined(scope.myDir))
                $(element).closest('.fg-line').addClass('fg-toggled');
        }
    }
});

app.directive('dateTimeInput', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            $(element).bootstrapMaterialDatePicker({ weekStart: 0, time: false });
        }
    }
});

app.directive('logiconDate', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {

            //format text going to user (model to view)
            ngModel.$formatters.push(function (value) {

                //
                //var dt = new Date(value);
                //var dtStr = moment(value, 'YYYY-MM-DDTHH:mm:ss.SSSS').format('DD/MM/YYYY');
                //
                var tt = moment(value, 'MM/DD/YYYY').format('MM/DD/YYYY');
                var gg = moment(value, 'MM/DD/YYYY').format('DD/MM/YYYY');
                var yy = moment(value, 'YYYY-MM-DDTHH:mm:ss.SSSS').format('MM/DD/YYYY');
                var uu = moment(Date.parse(value));

                return moment(uu);
                //return dt;
                ////var dtStr = moment(value, 'DD/MM/YYYY').format('DD/MM/YYYY');
                //var te = moment(value);
                //if (te._f == 'YYYY-MM-DDTHH:mm:ss.SSSS') {
                //    var tt = moment(value, 'YYYY-MM-DDTHH:mm:ss.SSSS').format('DD/MM/YYYY');
                //    return moment(tt);
                //}
                ////var temp = new Date(dtStr);
                ////return new moment(Date(dtStr));
                ////return dtStr;
                //
                //return te;
            });

            //format text from the user (view to model)
            //ngModel.$parsers.push(function (value) {
            //    return value.toLowerCase();
            //});
            //http://stackoverflow.com/questions/41988250/md-dialog-not-recognizing-angular-filter
        }
    }
});

app.directive('myTable', function () {
    return function (scope, element, attrs) {

        // apply DataTable options, use defaults if none specified by user
        var options = {};
        if (attrs.myTable.length > 0) {
            options = scope.$eval(attrs.myTable);
        } else {
            options = {
                "bStateSave": true,
                "iCookieDuration": 2419200, /* 1 month */
                "bJQueryUI": true,
                "bPaginate": false,
                "bLengthChange": false,
                "bFilter": false,
                "bInfo": false,
                "bDestroy": true
            };
        }

        // Tell the dataTables plugin what columns to use
        // We can either derive them from the dom, or use setup from the controller           
        var explicitColumns = [];
        element.find('th').each(function (index, elem) {
            explicitColumns.push($(elem).text());
        });
        if (explicitColumns.length > 0) {
            options["aoColumns"] = explicitColumns;
        } else if (attrs.aoColumns) {
            options["aoColumns"] = scope.$eval(attrs.aoColumns);
        }

        // aoColumnDefs is dataTables way of providing fine control over column config
        if (attrs.aoColumnDefs) {
            options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
        }

        if (attrs.fnRowCallback) {
            options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
        }

        // apply the plugin
        var dataTable = element.dataTable(options);



        // watch for any changes to our data, rebuild the DataTable
        scope.$watch(attrs.aaData, function (value) {
            var val = value || null;
            if (val) {
                dataTable.fnClearTable();
                dataTable.fnAddData(scope.$eval(attrs.aaData));
            }
        });
    };
});
app.directive("decimals", function ($filter) {

    return {
        restrict: "A", // Only usable as an attribute of another HTML element
        require: "?ngModel",
        scope: {
            decimals: "@",
            decimalPoint: "@"
        },
        link: function (scope, element, attr, ngModel) {
            var decimalCount = parseInt(scope.decimals) || 2;
            var decimalPoint = scope.decimalPoint || ".";

            // Run when the model is first rendered and when the model is changed from code
            ngModel.$render = function () {
                if (ngModel.$modelValue != null && ngModel.$modelValue >= 0) {
                    if (typeof decimalCount === "number") {
                        element.val(ngModel.$modelValue.toFixed(decimalCount).toString().replace(".", ","));
                    } else {
                        element.val(ngModel.$modelValue.toString().replace(".", ","));
                    }
                }
            }

            // Run when the view value changes - after each keypress
            // The returned value is then written to the model
            ngModel.$parsers.unshift(function (newValue) {
                if (typeof decimalCount === "number") {
                    var floatValue = parseFloat(newValue.replace(",", "."));
                    if (decimalCount === 0) {
                        return parseInt(floatValue);
                    }
                    return parseFloat(floatValue.toFixed(decimalCount));
                }

                return parseFloat(newValue.replace(",", "."));
            });

            // Formats the displayed value when the input field loses focus
            element.on("change", function (e) {
                var floatValue = parseFloat(element.val().replace(",", "."));
                if (!isNaN(floatValue) && typeof decimalCount === "number") {
                    if (decimalCount === 0) {
                        element.val(parseInt(floatValue));
                    } else {
                        var strValue = floatValue.toFixed(decimalCount);
                        element.val(strValue.replace(".", decimalPoint));
                    }
                }
            });
        }
    }
});


//app.directive('stringToNumber', function() {
//    return {
//        require: 'ngModel',
//        link: function(scope, element, attrs, ngModel) {
//            ngModel.$parsers.push(function(value) {
//                return '' + value;
//            });
//            ngModel.$formatters.push(function(value) {
//                return parseFloat(value);
//            });
//        }
//    };
//});


app.directive("limitToMax", function () {
    return {
        link: function (scope, element, attributes) {
            element.on("keydown keyup", function (e) {
                if (Number(element.val()) > Number(attributes.max) &&
                      e.keyCode != 46 // delete
                      &&
                      e.keyCode != 8 // backspace
                    ) {
                    e.preventDefault();
                    element.val(attributes.max);
                }
            });
        }
    };
});

app.directive('htmlPlain', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            // var value = ngModel.$viewValue;
            ngModel.$parsers.push(function (value) {
                return value;
            });
            ngModel.$formatters.push(function (value) {
                return value ? String(value).replace(/<[^>]+>/gm, '') : '';

            });
        }
    }
});

app.directive('containerInfo', function () {
    return {
        restrict: 'AE',
        templateURL: 'Js/declaration/Templates/k1/container-info.html'

    }
});
app.directive('resize', function ($window) {

    return function (scope, element) {

        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                //'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.iframeHeight = newValue.h - 85;
            scope.iframeHeightinner = newValue.h - 10;
            // scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                    // 'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
})

app.directive('charCount', ['$log', '$timeout', function ($log, $timeout) {
    return {
        restrict: 'A',
        compile: function compile() {
            return {
                post: function postLink(scope, iElement, iAttrs) {
                    iElement.bind('keydown', function () {
                        scope.$apply(function () {
                            scope.numberOfCharacters = iElement.val().length;
                        });
                    });
                    iElement.bind('paste', function () {
                        $timeout(function () {
                            scope.$apply(function () {
                                scope.numberOfCharacters = iElement.val().length;
                            });
                        }, 200);
                    });
                }
            }
        }
    }
}]);
app.directive('simditor', function () {

    var TOOLBAR_DEFAULT = ['title', 'bold', 'italic', 'underline', 'strikethrough', '|', 'ol', 'ul', 'blockquote', 'table', '|', 'link', 'hr', '|', 'indent', 'outdent'];

    return {
        require: "?^ngModel",
        link: function (scope, element, attrs, ngModel) {
            element.append("<div style='height:300px;'></div>");

            var toolbar = scope.$eval(attrs.toolbar) || TOOLBAR_DEFAULT;
            scope.simditor = new Simditor({
                textarea: element.children()[0],
                pasteImage: true,
                toolbar: toolbar,
                defaultImage: 'assets/images/image.png',
                upload: location.search === '?upload' ? {
                    url: '/upload'
                } : false
            });

            var $target = element.find('.simditor-body');

            function readViewText() {

                ngModel.$setViewValue($target.html());

                if (attrs.ngRequired != undefined && attrs.ngRequired != "false") {

                    var text = $target.text();

                    if (text.trim() === "") {
                        ngModel.$setValidity("required", false);
                    } else {
                        ngModel.$setValidity("required", true);
                    }
                }

            }

            ngModel.$render = function () {
                scope.simditor.focus();
                $target.html(ngModel.$viewValue);
            };

            scope.simditor.on('valuechanged', function () {
                scope.$apply(readViewText);
            });
        }
    };
});

app.directive('hasRight', function () {
    return {

        link: function (scope, element, attrs) {
            var rightvalue = attrs.rightvalue;
            var AccessRight = attrs.accessright;
            var flag = false;
            var rights = JSON.parse(sessionStorage.getItem('SECURABLES'));
            angular.forEach(rights, function (item, index) {
                if (item.OperationID == rightvalue && item.AccessRight != "1" && AccessRight != "3" && item.AccessRight != "0")
                    flag = true;
                else if (item.OperationID == rightvalue && item.AccessRight == AccessRight)
                    flag = true;
                else if (item.OperationID == rightvalue && item.AccessRight == "0")
                    flag = true;
                else if (item.OperationID == rightvalue && item.AccessRight == "4")
                    flag = true;
                if (item.OperationID == rightvalue && item.AccessRight == "1")
                    flag = false;
            });
            if (flag)
                element.show();
            else
                element.hide();
        }
    }
});

app.directive('orderStatus', [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            OrderStatus: '@status',
        },
        templateUrl: 'js/Default/Templates/status.html'
    }

}]);

app.directive('portAutocomplete', [function () {
    /*
    Usage: <port-autocomplete
                labeltext="Transhipment Port"
                isrequired="true"
                iseditable="false"
                ng-model="tr.TranshipmentPortCode"
                port-name="tr.TranshipmentPortName">
            </port-autocomplete>
    */
    return {
        restrict: 'E',
        replace: true,
        require: 'ngModel',
        scope: {
            labelText: '@labeltext',
            isrequired: '@isrequired',
            iseditable: '@iseditable',
            portName: '=portName',
            portCode: '=ngModel'
        },
        templateUrl: 'js/Default/Templates/port-autocomplete.html',
        controller: ['$scope', '$http', '$q', 'Utility', 'limitToFilter', function ($scope, $http, $q, Utility, limitToFilter) {
            $scope.portResults = function (text) {
                return $http.get(Utility.ServiceUrl + '/Master/Port/search/' + text).then(function (d) {
                    return limitToFilter(d.data, 15);
                });
            };

            $scope.PortSelected = function (obj) {
                $scope.portCode = obj.PortCode
            };
        }]
    };
}])

app.directive('merchantAutocomplete', [function () {
    /*
    Usage: <merchant-autocomplete
                filter="haulier"
                labeltext="Haulier"
                isrequired="true"
                iseditable="false"
                ng-model="tr.HaulierCode"
                merchant-name="tr.HaulierCodeDescription">
            </merchant-autocomplete>
    */

    return {
        restrict: 'E',
        replace: true,
        require: 'ngModel',
        scope: {
            filter: '@filter',
            labelText: '@labeltext',
            isrequired: '@isrequired',
            iseditable: '@iseditable',
            merchantName: '=merchantName',
            merchantCode: '=ngModel'
        },
        templateUrl: 'js/Default/Templates/merchant-autocomplete.html',
        controller: ['$scope', '$http', '$q', 'Utility', 'limitToFilter', function ($scope, $http, $q, Utility, limitToFilter) {
            $scope.GenericMerchantResults = function (text, filter) {
                return $http.get(Utility.ServiceUrl + '/master/MerchantProfile/search/' + text + '/' + filter).then(function (response) {
                    return limitToFilter(response.data, 15);
                });
            };

            $scope.merchantSelected = function (obj) {
                $scope.merchantCode = obj.Value;
            };
        }],
        link: function ($scope, element, attrs) {

        }
    }
}]);


//app.directive("lookupData", [function () {
//    /*
//    Usage:<lookup-Data 
//      type="Customer"
//      labeltext="Customer"
//      isrequired="true"
//      isdisabled="false"
//      ng-model="Customer">
//</lookup-Data>
//    */
//    return {
//        restrict: 'E',
//        replace: true,
//        require: 'ngModel',
//        scope: {
//            labelText: '@labeltext',
//            isrequired: '@isrequired',
//            isDisabled: '@isdisabled',
//            type:'@type',
//            Code: '=ngModel'
//        },
//        templateUrl: 'js/Default/Templates/md-dropdown.html',
//        controller: ['$scope', '$http', '$q', 'Utility', function ($scope, $http, $q, Utility) {
//            debugger;
//            $scope.getLookUpData = function (type) {
//                $http.get(Utility.ServiceUrl + '/master/MerchantProfile/getlookup').then(function (response) {
//                    $scope.list = response.data.result;

//                }, function (err) {
//                    debugger;
//                });
//            }
//            $scope.getLookUpData($scope.type);
//        }],
//        link: function ($scope, element, attrs) {
//            debugger;
//        }

//    }
//}]);

/*
http://rubular.com/
http://stackoverflow.com/questions/19605150/regex-for-password-must-be-contain-at-least-8-characters-least-1-number-and-bot
*/