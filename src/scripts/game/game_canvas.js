angular.module('app.game')
    .directive('gameCanvas', function($window,mySocket,$injector) {
        var linkFn = function(scope, ele, attrs) {
            var w = angular.element($window);




        };

        return {
            scope: {
				ngModel: '=',
				mapId: '='
            },
            template: '<div id="game-canvas"></div>',
            compile: function(Ele, Attrs) {
                return linkFn;
            }
        }
    });