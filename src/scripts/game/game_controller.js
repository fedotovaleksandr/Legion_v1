// in /scripts/game/game_controller.js
angular.module('app.game')
    .controller('GameController', function() {

        var game = new Phaser.Game(800,800, Phaser.AUTO, 'gameCanvas');
        var GlobalGame={};
        GlobalGame.States={};
        GlobalGame.Prefabs={};

        //--------------------Unit-------------------------
        GlobalGame.Prefabs.Unit=function(game,id,x,y,targets)
        {
            this.HP=100;
            this.minDistance=10;
            this.Speed=10;
            this.Id=id;
            Phaser.Sprite.call(this, game, x, y,'king');
            game.add.sprite(x, y, 'king');
            this.anchor.setTo(0.5);
            this.scale.setTo(0.5, 0.5);
            this.alpha = 0.8;
            this.x = x;
            this.y = y;


        };
        GlobalGame.Prefabs.Unit.prototype = Object.create(Phaser.Sprite.prototype);
        GlobalGame.Prefabs.Unit.constructor = GlobalGame.Prefabs.Unit;
        GlobalGame.Prefabs.Unit.prototype.update=function()
        {
            this.x+=0.1;
        };
        //---------------------------------------------

        //--------------------Menu State----------------------
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
                game.load.image('menu_background', 'assets/menu/menu_background.png');
                game.load.image('preloader', 'assets/menu/preloader.gif');
                game.load.image('background0', 'assets/menu/background.png');
                game.load.spritesheet('explosion', 'assets/menu/explode.png', 128, 128,16);
                game.load.image('logo', 'assets/menu/logo.png');
                game.load.audio('dink', 'assets/menu/Click.mp3');
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
        //----------------Game State--------------------------
        GlobalGame.States.GameState= function(game){}
        GlobalGame.States.GameState.Variables={
            newGame:{},
            dink:{},
            explosion:{}

        }
        GlobalGame.States.GameState.prototype= {

            preload: function () {
                game.load.image('game_background', 'assets/game/game_background.png');
                game.load.image('king', 'assets/game/king.png');
                game.load.audio('dink', 'assets/game/Click.mp3');
            },
            create: function () {
                console.log('create');
                this.Variables= GlobalGame.States.GameState.Variables;



                // Menu background
                game.background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'game_background');

                game.background.tilePosition.x = 0;
                game.background.tilePosition.y = 0;


                var targets={}
                var hero= new GlobalGame.Prefabs.Unit(game ,1 , 100 , 100,targets);




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

            }

        }
        //----------------------------------------------------
        game.state.add('MainMenuState', GlobalGame.States.MainMenuState);
        game.state.add('GameState', GlobalGame.States.GameState);
        game.state.start('MainMenuState');

    });