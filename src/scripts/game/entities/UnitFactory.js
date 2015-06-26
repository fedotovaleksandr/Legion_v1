/**
 * Created by aleksandr on 17.06.2015.
 */
module.exports = (function(GlobalGame,Utils) {
    GlobalGame.Factories.UnitFactory=function(id,name,x,y)
    {
        this.Id= id;
        this.Name=name;
        this.X=x;
        this.Y=y;
        this.CooldownWave= 5000;
        this.LastWaveTime=new Date();
        this.CooldownUnit= 1000;
        this.LastUnitTime=this.LastWaveTime;
        this.Targets=GlobalGame.game.add.group();
        this.Units=GlobalGame.game.add.group();
        this.ListofNewUnits=[];

    };
    GlobalGame.Factories.UnitFactory.prototype.UnitsEnumConstructor=//delete
        {
            Unit : function()
            {
                this.Name ="Unit" ;
                this.Constructor = GlobalGame.Prefabs.Unit;
                this.Key = 1;

            }
        }
    GlobalGame.Factories.UnitFactory.prototype.UnitEnum=
    {
        Unit :
        {
            Constructor : function()
            {
                this.Name ="Unit" ;
                this.Constructor = GlobalGame.Prefabs.Unit;
                this.Key = 1;

            },
            Value:
            {
                Name: "Unit",
                Key : 1
            }

        }
    };
    GlobalGame.Factories.UnitFactory.prototype.AddNewUnit= function(name)
    {

        var Enum = this.UnitEnum;
        for (var key in Enum) {
            if( Enum[key].Value.Name === name )
                    this.ListofNewUnits.push(new Enum[key].Constructor());


        }

    };
    GlobalGame.Factories.UnitFactory.prototype.getTargets= function()
    {
        return this.Targets;

    };
    GlobalGame.Factories.UnitFactory.prototype.addTargets= function(targets)
    {
        this.Targets=targets;

    };
    GlobalGame.Factories.UnitFactory.prototype.SpawnUnit= function()
    {
        var len = this.Units.length;
        var Unit =this.ListofNewUnits.pop();

        New_unit = new Unit.Constructor(len,this.X,this.Y,this.getTargets(),Unit.Key);
        this.Units.add(New_unit);
        //GlobalGame.game.add.existing(New_unit);


    };
    GlobalGame.Factories.UnitFactory.prototype.SpawnWave= function()
    {
        if ((this.LastWaveTime.getTime() + this.CooldownWave) < (new Date()).getTime())
        {

            if (((this.LastUnitTime.getTime() + this.CooldownUnit) < (new Date()).getTime())&& (this.ListofNewUnits.length > 0))
            {

                    this.SpawnUnit();
                    this.LastUnitTime=new Date();

            }
            if (this.ListofNewUnits.length === 0) {
                this.LastWaveTime = new Date();
            }

        }

    }
});