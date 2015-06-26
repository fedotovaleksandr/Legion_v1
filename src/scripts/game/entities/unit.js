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


        this.graphics2 = game.add.graphics(0, 0);//hp line

        this.State="idle";//state for animation

        this.Mindistance = 50;//min distance for attack

        this.Targets = targets;//targets

        this.CurrentTarget=undefined;//currenttarget

        this.Speed = 1;//movented speed

        this.ReloadTime=500//ml sec - reload time

        this.LastAttackTime=new Date();

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


    };
    //events
    //GlobalGame.Prefabs.Unit.prototype.Events={}


    //events method
    GlobalGame.Prefabs.Unit.prototype.GetNameofSprite = function()
    {
        return 'soldier' ;
    };
    GlobalGame.Prefabs.Unit.prototype.SetAnimation = function()
    {
        this.AnimationData={};
        this.AnimationData.FrameHeight=160;
        this.AnimationData.FrameWidth=100;
        this.animations.add('idle', [0, 1, 2]);
        this.animations.add('attack', [0, 1, 2]);
        this.animations.add('move', [0, 1, 2]);
        this.animations.add('die', [0, 1, 2]);
    };

    GlobalGame.Prefabs.Unit.prototype.GetIncomeDamage = function(Hpalfa)
    {
        this.Hp-=Hpalfa;
        if (this.Hp <= 0)
        {
            this.Die();
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
                this.State="attack"
                return;
            }

            this.State="move"
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
        this.body.x += this.Vector.x;
        this.body.y +=  this.Vector.y;
        this.X=this.body.x;
        this.Y=this.body.y;
         if (this.State==="attack")
         {
             this.Attack();
         }


    };
    GlobalGame.Prefabs.Unit.prototype.Attack = function () {
    if (this.LastAttackTime.getTime() + this.ReloadTime < (new Date()).getTime())
    {
        this.CurrentTarget.GetIncomeDamage(this.Damage);
        this.LastAttackTime=new Date();
    }

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

            this.Dead = true;
            this.alpha = 0;
            this.State="die"
            this.destroy(true);

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