// in /scripts/game/game_controller.js
angular.module('app.game')
    .controller('GameController', function($scope, $stateParams, mySocket) {

        var GlobalGame = require ('./states');
        require('./entities')(GlobalGame);
        GlobalGame.game.state.add('MainMenuState', GlobalGame.States.MainMenuState);
        GlobalGame.game.state.add('GameState', GlobalGame.States.GameState);
        GlobalGame.game.state.start('MainMenuState');

    });