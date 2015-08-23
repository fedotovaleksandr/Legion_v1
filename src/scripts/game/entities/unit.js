/**
 * Created by aleksandr on 11.06.2015.
 */
module.exports = (function(GlobalGame,Utils) {
    //--------------------Unit-------------------------
    var game = GlobalGame.game;
    GlobalGame.Prefabs.Unit = function (id, x, y, targets, key,factoryparent) {
        this.Id = id;//id maybe helpfull
        this.FactoryParent =factoryparent;
        Phaser.Sprite.call(this, game, x, y, this.GetNameofSprite());//call sprite

        this.maxHp=100;
        //this.Hp={};//HP
        //this.watch("Hp",this.ChangeHp);//Event on change
        this.Hp=100;//HP
        
        this.Money = 5;
        this.graphics2 = game.add.graphics(0, 0);//hp line

        this.State="idle";//state for animation

        this.Mindistance = 70;//min distance for attack

        this.Targets = targets;//targets

        this.CurrentTarget=undefined;//currenttarget

        this.Speed = 40;//movented speed

        this.ReloadTime=500;//ml sec - reload time

        this.DieTime= 500;

        this.LastAttackTime=new Date();

        this.Damage=10;//damage that take this unit

        this.Shield=0;//Shild jf unit

        this.X = x;//start X

        this.Y = y;//start Y

        this.Dead = false;

        this.Vector= new Utils.Vector(0,0);//add vector

        this.SetAnimation();

        this.anchor.setTo(0.5, 0.5);
        this.alpha = 0.8;//порядок по оси Z
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds=true;
        this.body.bounce.x= 1;
        this.body.bounce.y= 1;
        this.body.minBounceVelocity=0;






        // Out of bounds callback
        this.events.onOutOfBounds.add(function(){
            this.Die(true);
        }, this);
    };
    GlobalGame.Prefabs.Unit.prototype = Object.create(Phaser.Sprite.prototype);
    GlobalGame.Prefabs.Unit.constructor = GlobalGame.Prefabs.Unit;
    GlobalGame.Prefabs.Unit.prototype.update = function () {
        if (this.State!="die") {
            this.UpdateUnitVector();

            this.UpdateUnitPosition();

            this.UpdatePropertyPosition();
        }
        this.UpdateAnimation();
    };
    GlobalGame.Prefabs.Unit.prototype.UpdateAnimation = function () {
        if (this.State=="idle") {

            this.animations.play(this.State, 0, true);//at speed to fps
        }
        if (this.State=="die") {

            this.animations.play(this.State, (1000/this.DieTime)*this.AnimationData.CountFrames[this.State], true);//at speed to fps
        }
        if (this.State =="attack")//play animations need refactor
        {
            this.Attack();
            this.animations.play(this.State, this.AnimationData.CountFrames[this.State]*(1000/this.ReloadTime), true);//at atackspeed to fps
        }
        if (this.State=="move")
        {
            this.animations.play(this.State, (this.Speed/100)*this.AnimationData.CountFrames[this.State], true);//at speed to fps

        }
        return;
    };
    GlobalGame.Prefabs.Unit.prototype.GetNameofSprite = function()
    {
        return 'soldier_sprite' ;
    };
    GlobalGame.Prefabs.Unit.prototype.SetAnimation = function()
    {
        this.AnimationData={};
        this.AnimationData.FrameHeight=160;
        this.AnimationData.FrameWidth=100;
        this.AnimationData.CountFrames=
        {
            idle: 1 ,
            attack: 6 ,
            move: 6 ,
            die: 3
        };

        this.animations.add('idle', [0]);
        this.animations.add('attack', [1,2,3,4,5,6]);
        this.animations.add('move', [9,10,11,12,13,14]);
        this.animations.add('die', [15,16,17]);
    };

    GlobalGame.Prefabs.Unit.prototype.GetIncomeDamage = function(Hpalfa,enemy)
    {
        this.Hp-=Hpalfa;
        if (this.Hp <= 0)
        {
            this.Die(enemy);
        }
    };

    GlobalGame.Prefabs.Unit.prototype.UpdateUnitVector = function () {
        if (this.CurrentTarget=== undefined || this.CurrentTarget.Dead===true)
        {
            this.CurrentTarget=this.GetNewCurrentTarget();
        }


        if (this.CurrentTarget=== undefined)
        {
            this.Vector.x=0;
            this.Vector.y=0;
            this.State="idle"
            return;
        }else
        {
            if (game.physics.arcade.distanceBetween(this, this.CurrentTarget) <= this.Mindistance)
            {
                this.Vector.x=0;
                this.Vector.y=0;
                this.State="attack";
                return;
            }

            this.State="move";
            var newvector = new Utils.Vector(this.CurrentTarget.X-this.X,this.CurrentTarget.Y-this.Y);
            var normvector= newvector.clone().normalize();
            normvector.x=normvector.x*this.Speed;
            normvector.y=normvector.y*this.Speed;
            this.Vector=normvector;
        }




    };
    GlobalGame.Prefabs.Unit.prototype.GetNewCurrentTarget = function () {
        var mindistance=10000;
        var selectterget=undefined;
        this.Targets.forEach(function(child)
        {
            if ((child!== undefined) &&( child!== null )&& (child.Dead===false)) {
                var newmin = game.physics.arcade.distanceBetween(this, child);
                if (newmin < mindistance) {
                    selectterget = child;
                    mindistance = newmin;
                }
            }

        },this,true);
        return selectterget;

    };
    GlobalGame.Prefabs.Unit.prototype.UpdateUnitPosition = function () {
        this.body.velocity.x = this.Vector.x;
        this.body.velocity.y =  this.Vector.y;
        this.X=this.body.x;
        this.Y=this.body.y;



    };
    GlobalGame.Prefabs.Unit.prototype.Attack = function () {
    if (this.LastAttackTime.getTime() + this.ReloadTime < (new Date()).getTime())
    {
        this.CurrentTarget.GetIncomeDamage(this.Damage,this);
        this.LastAttackTime=new Date();
    }

    };
    GlobalGame.Prefabs.Unit.prototype.UpdatePropertyPosition = function () {
        if (this.Hp>0)
        {
            this.graphics2.clear();
            this.graphics2.lineStyle(2, 0xffffff);
            this.graphics2.beginFill(this.FactoryParent.Color);
            this.graphics2.drawRect(this.X, this.Y - 10, 40 * this.Hp / this.maxHp, 5);
            this.graphics2.endFill();
        }
        else
        {
            this.graphics2.clear();
        }




    };
    GlobalGame.Prefabs.Unit.prototype.Die = function (enemy) {
        if ("IsPlayerFactory" in enemy.FactoryParent) {
        enemy.FactoryParent.Player.Money += this.Money;
        }
            this.Dead = true;
            //this.alpha = 0; push back front
            this.State="die";
        this.graphics2.clear();
       var g_this=this;
        setTimeout(function () {

            g_this.graphics2.destroy(true);
            g_this.destroy(true);
             }, g_this.DieTime);
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


    };
    //---------------------------------------------
});