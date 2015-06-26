/**
 * Created by aleksandr on 17.06.2015.
 */
module.exports = (function(GlobalGame,Utils) {
    require('./UnitFactory')(GlobalGame,Utils);
    GlobalGame.FactoryofFactories= function()
    {
        this.ArrayofUnitFactories = [];


    }
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
    GlobalGame.FactoryofFactories.prototype.CreateUnitFactory= function(Name,x,y)
    {
        var len = this.ArrayofUnitFactories.length;
        this.ArrayofUnitFactories.push(new GlobalGame.Factories.UnitFactory(len,Name,x,y));

    }
    GlobalGame.FactoryofFactories.prototype.AddUnits= function()
    {
       var y_test=0;
       for (factory in this.ArrayofUnitFactories)
       {
           for (var i =y_test ;i < 2 ;i++) {
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
            Array[factory].SpawnWave();
        }

    }
})