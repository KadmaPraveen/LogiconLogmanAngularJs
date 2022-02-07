
function MainModuleFunction(obj, state, title) {
    var scope = angular.element($('.TabsCtrlCss')).scope();
    sessionStorage.setItem('ROUTE_PARAMS', JSON.stringify(obj));
    scope.$apply(function () {
        scope.addTab({
            Title: title,
            State: state
        });
    });
}