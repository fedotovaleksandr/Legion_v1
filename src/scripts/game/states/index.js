/**
 * Created by aleksandr on 11.06.2015.
 */

var GlobalGame={
    States: {},
    Prefabs: {},
    Groups: {},
    FactoryofFactories:{},
    Factories:{},
    game :  new Phaser.Game(800,800, Phaser.AUTO, 'gameCanvas')
    };


require('./menu_state')(GlobalGame);
require('./play_state')(GlobalGame);


module.exports = GlobalGame;