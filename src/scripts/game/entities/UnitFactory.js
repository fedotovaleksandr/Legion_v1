/**
 * Created by aleksandr on 17.06.2015.
 */
module.exports = (function(GlobalGame,Utils) {
    require('./unit')(GlobalGame,Utils);
    require('./Portal')(GlobalGame,Utils);
    GlobalGame.Factories.UnitFactory=function(id,name)
    {
        this.Id= id;
        this.Name=name;


        this.Targets=GlobalGame.game.add.group();
        this.Units=GlobalGame.game.add.group();
        this.ListofNewUnits=[];


        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '0x';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        this.Color=getRandomColor();
        this.StackEmpty = true;

    };

    GlobalGame.Factories.UnitFactory.prototype.UnitEnum=//enum of units
    {
        Unit :
        {
            Constructor : function()
            {
                this.Name ="Unit" ;
                this.Constructor = GlobalGame.Prefabs.Unit;
                this.ConstructorBlock = GlobalGame.Prefabs.Unit;
                this.Key = 1;

            },
            Value:
            {
                Name: "Unit",
                Key : 1,
                SpriteName : 'soldier_sprite',
                Cost: 10
            }

        }
    };
    GlobalGame.Factories.UnitFactory.prototype.AddNewUnit= function(name)
    {
        this.StackEmpty = false;
        var Enum = this.UnitEnum;
        for (var key in Enum) {
            if( Enum[key].Value.Name === name )
                    this.ListofNewUnits.push(new Enum[key].Constructor());


        }

    };
    GlobalGame.Factories.UnitFactory.prototype.SetItIsPlayerFactory= function(player)
    {
        this.PlayerName=player.Name;
        this.Player=player;
        this.IsPlayerFactory=true;

    };
    GlobalGame.Factories.UnitFactory.prototype.getTargets= function()
    {
        return this.Targets;

    };
    GlobalGame.Factories.UnitFactory.prototype.addTargets= function(targets)
    {
        this.Targets=targets;

    };
    GlobalGame.Factories.UnitFactory.prototype.SpawnUnit= function(x,y)
    {
        var len = this.Units.length;
        var Unit =this.ListofNewUnits.pop();

        New_unit = new Unit.Constructor(len,x,y,this.getTargets(),Unit.Key,this);
        this.Units.add(New_unit);
        if (this.ListofNewUnits.length == 0 )
        {
            this.StackEmpty = true;
        }
        //GlobalGame.game.add.existing(New_unit);


    };

});