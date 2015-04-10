angular.module('app.menu', [
    'app.menu.playButton'
])
    .config(function($stateProvider) {
        $stateProvider
            .state('menu', {
                abstract: true,
                templateUrl: 'scripts/menu/template.html',
                url: '/menu'
            })
            .state('menu.home', {
                url: '',
                templateUrl: 'scripts/menu/main.html',
                controller: 'MenuController as ctrl'

            })
    })

