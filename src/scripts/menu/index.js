
module.exports =
    angular.module('app.menu', [
    'app.menu.playButton'
])
    .config(function($stateProvider) {
        $stateProvider
            .state('menu', {
                abstract: true,
                templateUrl: 'src/scripts/menu/template.html',
                url: '/menu'
            })
            .state('menu.home', {
                url: '',
                templateUrl: 'src/scripts/menu/main.html',
                controller: 'MenuController as ctrl'

            })
    })

require('./play_button');

require('./menu_controller.js')