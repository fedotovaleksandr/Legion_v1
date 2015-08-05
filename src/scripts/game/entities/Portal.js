/**
 * Created by aleksandr on 05.08.2015.
 */
module.exports = (function(GlobalGame,Utils) {
    //--------------------Portal-------------------------
    var game = GlobalGame.game;
    GlobalGame.Prefabs.Portal = function (id, x, y,factoryparent) {
        this.Id = id;//id maybe helpfull
        this.UnitFactory =factoryparent;
        Phaser.Sprite.call(this, game, x, y, this.GetNameofSprite());//call sprite


        this.CooldownWave= 50000;
        this.LastWaveTime=new Date();
        this.CooldownUnit= 3000;
        this.LastUnitTime=this.LastWaveTime;

        this.X = x;//start X

        this.Y = y;//start Y
        this.State="idle";

        this.graphics2 = game.add.graphics(0, 0);//time line
        //this.SetAnimation();

        this.anchor.setTo(0.5, 0.5);
        this.alpha = 0.8;//порядок по оси Z
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;


    };
    GlobalGame.Prefabs.Portal.prototype = Object.create(Phaser.Sprite.prototype);
    GlobalGame.Prefabs.Portal.constructor = GlobalGame.Prefabs.Portal;


    GlobalGame.Prefabs.Portal.prototype.update = function () {
            this.UpdateState();
        this.UpdateProperty();
        //Array[factory].SpawnWave();
    };
    GlobalGame.Prefabs.Portal.prototype.UpdateState = function () {
        var curdate=new Date();
    if (this.CooldownWave< (curdate-this.LastWaveTime))
    {
        if (this.UnitFactory.StackEmpty){
            this.State="idle"
        }else{
            this.State="waitwave"
        }
    }
        else{
        if (this.UnitFactory.StackEmpty)
        {
            this.LastWaveTime=new Date();
        }
        else
        {
            if (this.CooldownUnit< (curdate-this.LastUnitTime))
            {
                this.UnitFactory.SpawnUnit(this.X,this.Y)
                this.LastUnitTime=curdate;

            }
            else
            {
                this.State="waitunit"
            }
        }
    }


    };
    GlobalGame.Prefabs.Portal.prototype.GetNameofSprite = function()
    {
        return 'portal_sprite' ;
    };
    GlobalGame.Prefabs.Portal.prototype.SetAnimation = function()
    {
        //see to unit
    };
    GlobalGame.Prefabs.Portal.prototype.UpdateProperty = function () {
        if (this.UnitFactory.StackEmpty || this.State == "idle")
        {

            this.graphics2.clear();
            this.graphics2.lineStyle(2, 0xffffff);
            if (this.State === "waitwave" ) {

                this.graphics2.beginFill("0x006600");
                this.graphics2.drawRect(this.X, this.Y - 10, 40 * this.CooldownWave / ( new Date() - this.LastWaveTime), 5);
            }
            if (this.State === "waitunit") {
                this.graphics2.beginFill("0xCCFF66");
                this.graphics2.drawRect(this.X, this.Y - 10, 40 * this.CooldownUnit / ( new Date() - this.LastWaveUnit), 5);
            }
            this.graphics2.endFill();
        }
        else
        {
            this.graphics2.clear();
        }




    };
    //---------------------------------------------
});