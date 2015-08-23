/**
 * Created by aleksandr on 06.08.2015.
 */
module.exports = (function(GlobalGame,Utils) {
    require('./PlayerVision')(GlobalGame,Utils);
    require('./UnitBlock')(GlobalGame,Utils);
    GlobalGame.PlayerArea.Player=function(name,unitfabric)
    {
        this.UnitFactory=unitfabric;

        this.Name=name;
        this.Money=0;
        this.UnitFactory.SetItIsPlayerFactory(this);
    };
    GlobalGame.PlayerArea.Player.prototype.PutUnit=function(Name,x,y,cost)
    {
        this.UnitFactory.AddNewUnit(Name);
        this.UnitFactory.SpawnUnit(x,y);
        this.Money-=cost;

    };


});