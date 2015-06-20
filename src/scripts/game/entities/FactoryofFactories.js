/**
 * Created by aleksandr on 17.06.2015.
 */
module.exports = (function(GlobalGame,Utils) {
    require('./UnitFactory')(GlobalGame,Utils);
    GlobalGame.FactoryofFactories= function()
    {
        this.ArrayofUnitFactories = [];


    }

    GlobalGame.FactoryofFactories.prototype.CreateUnitFactory= function(Name,x,y)
    {
        var len = this.ArrayofUnitFactories.length;
        this.ArrayofUnitFactories.push(new GlobalGame.Factories.UnitFactory(len,Name,x,y));

    }
    GlobalGame.FactoryofFactories.prototype.AddUnits= function()
    {
       for (factory in this.ArrayofUnitFactories)
       {
           for (var i =0 ;i < 30 ;i++) {
               this.ArrayofUnitFactories[factory].AddNewUnit("Unit");
           }

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