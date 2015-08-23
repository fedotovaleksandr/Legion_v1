/**
 * Created by aleksandr on 17.06.2015.
 */
module.exports = (function(GlobalGame,Utils) {
    require('./UnitFactory')(GlobalGame,Utils);


    GlobalGame.FactoryofFactories= function()
    {
        this.ArrayofUnitFactories = [];
        this.Portals = GlobalGame.game.add.group();

    }
    GlobalGame.FactoryofFactories.constructor = GlobalGame.FactoryofFactories;
    GlobalGame.FactoryofFactories.prototype.SetOpponent= function(name1,name2)
    {
        var firstfabric={};
        var secondfabric={};
        for (factory in this.ArrayofUnitFactories)
        {
            if (this.ArrayofUnitFactories[factory].Name===name1)
            {
                firstfabric= this.ArrayofUnitFactories[factory];
            };
            if (this.ArrayofUnitFactories[factory].Name===name2)
            {
                secondfabric= this.ArrayofUnitFactories[factory];
            };

        }
        firstfabric.addTargets(secondfabric.Units);
        secondfabric.addTargets(firstfabric.Units)

    }
    GlobalGame.FactoryofFactories.prototype.CreateGetUnitFactory= function(Name)
    {
        var len = this.ArrayofUnitFactories.length;
        var factory= new GlobalGame.Factories.UnitFactory(len,Name);
        this.ArrayofUnitFactories.push(factory);
        return factory;

    }
    GlobalGame.FactoryofFactories.prototype.CreatePortal= function(x,y,factory)
    {
        var len = this.Portals.length;
        var factory= new GlobalGame.Prefabs.Portal(len,x,y,factory);
        this.Portals.add(factory);


    }
    GlobalGame.FactoryofFactories.prototype.AddUnits= function()
    {
       var y_test=0;
       for (factory in this.ArrayofUnitFactories)
       {
           for (var i =y_test ;i < 10 ;i++) {
               if (!("IsPlayerFactory" in this.ArrayofUnitFactories[factory]))
               this.ArrayofUnitFactories[factory].AddNewUnit("Unit");
           }
           //y_test++;
       }

    }
    GlobalGame.FactoryofFactories.prototype.UpdateFactories= function()
    {
        var Array = this.ArrayofUnitFactories;
        for (factory in Array)
        {

            GlobalGame.game.physics.arcade.collide( Array[factory].Units);//for physics
        }

    }
})