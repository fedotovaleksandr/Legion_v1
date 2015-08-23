/**
 * Created by aleksandr on 11.06.2015.
 */


var GlobalGame={
    Init : function()
    {
        this.BrowserWindow = new this.BrowserWindow();
        this.game=new Phaser.Game(this.BrowserWindow.Width,this.BrowserWindow.Height, Phaser.AUTO, 'gameCanvas');

    },
    States: {},
    Prefabs: {},
    Groups: {},
    FactoryofFactories:{},
    Factories:{},
    PlayerArea:{},
    BrowserWindow: {},
    Network:{},
    game :  {}
    };
require('./BrowserWindow')(GlobalGame);
GlobalGame.Init();
require('../../network')(GlobalGame);

require('./menu_state')(GlobalGame);
require('./play_state')(GlobalGame);


module.exports = GlobalGame;