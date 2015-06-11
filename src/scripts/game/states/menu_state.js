/**
 * Created by aleksandr on 11.06.2015.
 */
module.exports = (function(GlobalGame) {
    var game =GlobalGame.game;
    GlobalGame.States.MainMenuState= function(game){}
    GlobalGame.States.MainMenuState.Variables={
        newGame:{},
        dink:{},
        explosion:{}

    }
    GlobalGame.States.MainMenuState.prototype= {


        overNewgame:function () {
            game.add.tween(this.Variables.newGame.scale)
                .to({x: 1.3, y: 1.3}, 300, Phaser.Easing.Exponential.Out, true)
            this.Variables.dink.play();
        },

        outNewgame:function () {
            game.add.tween(this.Variables.newGame.scale)
                .to({x: 1, y: 1}, 300, Phaser.Easing.Exponential.Out, true);
        },

        onNewgameDown:function() {
            // explosion
            this.Variables.explosion = game.add.sprite(0, 0, 'explosion');
            this.Variables.explosion.anchor.setTo(0.5);
            this.Variables.explosion.smoothed=false;
            var anim=this.Variables.explosion.animations.add('fire');


            this.Variables.explosion.reset(this.Variables.newGame.x, this.Variables.newGame.y);
            this.Variables.explosion.alpha = 0;
            this.Variables.explosion.scale.x = 0.2;
            this.Variables.explosion.scale.y = 0.2;
            game.add.tween(this.Variables.explosion)
                .to({alpha: 1}, 500, Phaser.Easing.Linear.NONE, true, 0)
                .to({alpha: 0}, 500, Phaser.Easing.Linear.NONE, true, 0);
            game.add.tween(this.Variables.explosion.scale)
                .to({x: 1.5, y: 1.5}, 500, Phaser.Easing.Cubic.Out, true, 0);



            anim.onComplete.add(this.StartGameState,this);
            anim.play('fire',1, false);




        },
        StartGameState:function(sprite, animation){
            game.state.start('GameState');
        },

        preload: function () {
            game.load.image('menu_background', 'src/assets/menu/menu_background.png');
            game.load.image('preloader', 'src/assets/menu/preloader.gif');
            game.load.image('background0', 'src/assets/menu/background.png');
            game.load.spritesheet('explosion', 'src/assets/menu/explode.png', 128, 128,16);
            game.load.image('logo', 'src/assets/menu/logo.png');
            game.load.audio('dink', 'src/assets/menu/Click.mp3');
        },
        create: function () {
            console.log('create');
            this.Variables= GlobalGame.States.MainMenuState.Variables;
            var image = game.cache.getImage('logo'),
                centerX = game.world.centerX,
                centerY = game.world.centerY - image.height,
                endY = game.world.height + image.height,
                textPadding = game.device.desktop ? 100 : 30;

            // Menu background
            game.background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'menu_background');
            game.background.autoScroll(-50, -20);
            game.background.tilePosition.x = 0;
            game.background.tilePosition.y = 0;
            this.Variables.dink = game.add.audio('dink');



            var sprite = game.add.sprite(centerX, centerY - textPadding, 'logo');
            sprite.anchor.set(0.5);

            if (game.device.desktop) {
                sprite.scale.set(2);
            }

            // Add title
            var fontSize = (game.device.desktop ? '40px' : '20px');
            this.Variables.newGame = game.add.text(game.world.centerX,
                centerY + textPadding,
                "New game",
                {
                    font: fontSize + " Architects Daughter",
                    align: "center",
                    fill: "#f13"
                });
            this.Variables.newGame.inputEnabled = true;
            this.Variables.newGame.anchor.set(0.5);

            this.Variables.newGame.events.onInputOver.add(this.overNewgame, this);
            this.Variables.newGame.events.onInputOut.add(this.outNewgame, this);
            this.Variables.newGame.events.onInputDown.add(this.onNewgameDown, this);
        }

    }
    //----------------------------------------------------
});