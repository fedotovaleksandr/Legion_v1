/**
 * Created by aleksandr on 17.03.2015.
 */
module.exports = (function(GlobalGame) {
//----------------Game State--------------------------
    var game=GlobalGame.game;
    GlobalGame.States.GameState= function(game){}
    GlobalGame.States.GameState.Variables={
        newGame:{},
        dink:{},
        explosion:{}

    }
    GlobalGame.States.GameState.prototype= {

        preload: function () {
            game.load.image('game_background', 'src/assets/game/game_background.png');
            game.load.image('king', 'src/assets/game/king.png');
            game.load.spritesheet('soldier_sprite', 'src/assets/game/swordsmansmall.png', 50, 78,18);
            game.load.spritesheet('portal_sprite', 'src/assets/game/portal_sprite.png');
            game.load.audio('dink', 'src/assets/game/Click.mp3');

        },
        create: function () {
            console.log('create');

            // GAme background
            this.background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'game_background');
            //-------Global variables
            this.Variables= GlobalGame.States.GameState.Variables;
            GlobalGame.Groups.UnitGroup= game.add.group();
            GlobalGame.Groups.UnitGroup.enableBody = true;









            var centerX = game.world.centerX;
            var centerY = game.world.centerY ;
            var  endY = game.world.height ;
            var  textPadding = game.device.desktop ? 100 : 30;
            // Add title
            var fontSize = (game.device.desktop ? '40px' : '20px');
            this.Variables.newGame = game.add.text(game.world.centerX,
                centerY + textPadding,
                "GameState",
                {
                    font: fontSize + " Architects Daughter",
                    align: "center",
                    fill: "#f13"
                });






           // var hero= new GlobalGame.Prefabs.Unit(game ,1 , 10 , 10,targets,'king');

           // game.add.existing(hero);
           // GlobalGame.Groups.UnitGroup.add(hero);

            //Factories#
            GlobalGame.FactoryofFactories=new GlobalGame.FactoryofFactories();
            GlobalGame.FactoryofFactories.CreatePortal(40,40,GlobalGame.FactoryofFactories.CreateGetUnitFactory("Player1"));
            GlobalGame.FactoryofFactories.CreatePortal(400,400,GlobalGame.FactoryofFactories.CreateGetUnitFactory("Player2"));

            GlobalGame.FactoryofFactories.AddUnits();
            GlobalGame.FactoryofFactories.SetOpponent("Player1","Player2");
        },
        update:function(){
            GlobalGame.FactoryofFactories.UpdateFactories();

        }

    }
    //----------------------------------------------------

});
