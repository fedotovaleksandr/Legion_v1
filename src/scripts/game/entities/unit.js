/**
 * Created by aleksandr on 11.06.2015.
 */
module.exports = (function(GlobalGame) {
    //--------------------Unit-------------------------
    var game = GlobalGame.game;
    GlobalGame.Prefabs.Unit = function (game, id, x, y, targets, key) {
        this.HP = 100;
        this.minDistance = 10;
        this.Speed = 10;
        this.Id = id;
        Phaser.Sprite.call(this, game, x, y, 'king'); //don't work((((((((
        game.physics.arcade.enableBody(this);
        //this.sprite= game.add.sprite(x, y, 'king');
        this.x = x;
        this.y = y;

        this.anchor.setTo(0.5, 0.5);
        this.alpha = 0.8;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        //game.add.sprite(x, y, 'king');
        //this.scale.setTo(0.5, 0.5);
        //this.alpha = 0.8;


    };
    GlobalGame.Prefabs.Unit.prototype = Object.create(Phaser.Sprite.prototype);
    GlobalGame.Prefabs.Unit.constructor = GlobalGame.Prefabs.Unit;
    GlobalGame.Prefabs.Unit.prototype.update = function () {
        this.updateUnit();
    };
    GlobalGame.Prefabs.Unit.prototype.updateUnit = function () {
        this.body.x += 0.1;
        //this.sprite.x+=this.body.x;
    };
    //---------------------------------------------
});