angular.module('app.game', ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('game', {
                url: '/game',
                abstract: true,
                templateUrl: 'scripts/game/template.html'

            })
            .state('game.play', {
                url: '',
                templateUrl: 'scripts/game/main.html',
                controller: 'GameController'


            })
    });