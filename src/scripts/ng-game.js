// In /scripts/ng-game.js



angular.module('app', [
    'ui.router',
    require('./menu').name,
    require('./game').name,
    require('./network').name,
])
    .config(function($urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/menu');
    })

