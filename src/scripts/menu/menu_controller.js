angular.module('app.menu')
    .controller('MenuController', function($scope) {



        var ctrl = this;

        ctrl.createId = function() {
            return new Date().getTime().toString();
        };

    });