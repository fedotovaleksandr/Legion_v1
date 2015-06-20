/**
 * Created by aleksandr on 11.06.2015.
 */
module.exports = (function(GlobalGame,Utils) {
    //--------------------Unit-------------------------
    var game = GlobalGame.game;
    GlobalGame.Prefabs.Unit = function (id, x, y, targets, key) {
        this.Id = id;//id maybe helpfull
        Phaser.Sprite.call(this, game, x, y, this.GetNameofSprite());//call sprite

        this.maxHp=100;
        //this.Hp={};//HP
        //this.watch("Hp",this.ChangeHp);//Event on change
        this.Hp=100;//HP


        this.graphics2 = game.add.graphics(0, 0);

        this.Mindistance = 10;//min distance for attack

        this.Targets = targets;//targets

        this.Speed = 10;//movented speed

        this.Realoadtime=100//ml sec - reload time

        this.Damage=10;//damage that take this unit

        this.Shield=0;//Shild jf unit

        this.X = x;//start X

        this.Y = y;//start Y

        this.Dead = false;

        this.Vector= new Utils.Vector(0,0);//add vector



        this.anchor.setTo(0.5, 0.5);
        this.alpha = 0.8;//порядок по оси Z
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;


        game.physics.arcade.enableBody(this);

        // Out of bounds callback
        this.events.onOutOfBounds.add(function(){
            this.Die(true);
        }, this);
    };
    GlobalGame.Prefabs.Unit.prototype = Object.create(Phaser.Sprite.prototype);
    GlobalGame.Prefabs.Unit.constructor = GlobalGame.Prefabs.Unit;
    GlobalGame.Prefabs.Unit.prototype.update = function () {
        this.UpdateUnitVector();
        this.UpdateUnitPosition();
        this.UpdatePropertyPosition();
        this.Hp=this.Hp - 0.1//for test
    };
    //events
    GlobalGame.Prefabs.Unit.prototype.Events={}


    //events method
    GlobalGame.Prefabs.Unit.prototype.GetNameofSprite = function()
    {
       return 'king' ;
    };
    GlobalGame.Prefabs.Unit.prototype.ChangeHp = function(id, oldval, newval)//event on change hp
    {

    };


    GlobalGame.Prefabs.Unit.prototype.UpdateUnitVector = function () {
        this.Vector.x+=0.001;
        this.Vector.y+=0.001;

    };
    GlobalGame.Prefabs.Unit.prototype.UpdateUnitPosition = function () {
        this.body.x += this.Vector.x;
        this.body.y +=  this.Vector.y;

    };
    GlobalGame.Prefabs.Unit.prototype.UpdatePropertyPosition = function () {
        if (this.Hp>0)
        {
            this.graphics2.clear();
            this.graphics2.lineStyle(2, 0xffffff);
            this.graphics2.beginFill(0xa000f3);
            this.graphics2.drawRect(this.body.x, this.body.y - 10, 40 * this.Hp / this.maxHp, 5);
            this.graphics2.endFill();
        }
        else
        {
            this.graphics2.clear();
        }




    };
    GlobalGame.Prefabs.Unit.prototype.Die = function (autokill) {
        if(!this.dead){
            this.dead = true;
            this.alpha = 0;

            // Explosion
            /*if(!autoKill){
                this.explosion.reset(this.x, this.y);
                this.explosion.angle = this.game.rnd.integerInRange(0, 360);
                this.explosion.alpha = 0;
                this.explosion.scale.x = 0.2;
                this.explosion.scale.y = 0.2;
                this.game.add.tween(this.explosion)
                    .to({alpha: 1, angle: "+30"}, 200, Phaser.Easing.Linear.NONE, true, 0).to({alpha: 0, angle: "+30"}, 300, Phaser.Easing.Linear.NONE, true, 0);
                this.game.add.tween(this.explosion.scale)
                    .to({x:1.5, y:1.5}, 500, Phaser.Easing.Cubic.Out, true, 0);
            }*/

            // Update parent group
            //this.parent.updateStatus(this, autoKill);
        }

    };
    //---------------------------------------------
});