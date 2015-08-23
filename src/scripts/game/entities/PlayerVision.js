/**
 * Created by aleksandr on 06.08.2015.
 */
module.exports = (function(GlobalGame,Utils) {

    GlobalGame.PlayerArea.PlayerVision=function(player)
    {
        this.Player= player;
        this.ArrayUnitBlock=GlobalGame.game.add.group();
        this.Money=1;
        // Add title money
        var strMoney=this.Money+"";
        var fontSize = (GlobalGame.game.device.desktop ? 40 : 20);
        var textPadding = GlobalGame.game.device.desktop ? 30 : 15;
        var coorX= GlobalGame.game.world.width-strMoney.length*fontSize;
        var coorY =10;
        this.MoneyText = GlobalGame.game.add.text(coorX,
            coorY + textPadding,
            strMoney,
            {
                font: fontSize + "px Architects Daughter",
                align: "center",
                fill: "#CCFF33"
            });
///money
        //event
        this.Events.EventChangePlayerMoney =new Phaser.Signal();
        this.Events.EventChangePlayerMoney.add(this.ChangeMoney,this);
        //add unitsblock
        var coorX1= GlobalGame.game.world.centerX;
        var coorY1 =GlobalGame.game.world.height-50;

        var value = this.Player.UnitFactory.UnitEnum.Unit.Value;
        this.ArrayUnitBlock.add(new GlobalGame.PlayerArea.UnitBlock(this,coorX1,coorY1,value.Name,value.Key,value.SpriteName,value.Cost))


    };
    GlobalGame.PlayerArea.PlayerVision.prototype.Events={};
    GlobalGame.PlayerArea.PlayerVision.prototype.Update=function()
    {
        this.CheckMoney();
    };
    GlobalGame.PlayerArea.PlayerVision.prototype.CheckMoney=function()
    {
        if (this.Player.Money != this.Money)
            {
            this.Events.EventChangePlayerMoney.dispatch(this.Player.Money);
            }

    };
    GlobalGame.PlayerArea.PlayerVision.prototype.ChangeMoney=function(newcost)
    {
        this.Money=newcost;
        var strMoney=this.Money+"";
        var fontSize = (GlobalGame.game.device.desktop ? 40 : 20);
        var textPadding = GlobalGame.game.device.desktop ? 100 : 30;
        var coorX= GlobalGame.game.world.width-strMoney.length*fontSize;
        var coorY =textPadding;

        this.MoneyText.x=coorX;
        this.MoneyText.text=strMoney;

    };
    GlobalGame.PlayerArea.PlayerVision.prototype.PutUnitBlock=function(Name,x,y,cost)
    {
        this.Player.PutUnit(Name,x,y,cost);
    };


});