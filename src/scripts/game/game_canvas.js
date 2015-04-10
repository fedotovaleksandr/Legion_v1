angular.module('app.game')
    .directive('gameCanvas', function($window,$injector) {
        var linkFn = function(scope, ele, attrs) {
            var w = angular.element($window);




        };

        return {
            scope: {

            },
            template: '<div id="game-canvas"></div>',
            compile: function(Ele, Attrs) {
                return linkFn;
            }
        }
    });