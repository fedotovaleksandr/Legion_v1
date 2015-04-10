// In /scripts/ng-game.js
angular.module('app', [
    'ui.router',
    'app.menu',
    'app.game'
])
    .config(function($urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/menu');
    })