/**
 * Created by aleksandr on 11.06.2015.
 */
module.exports = (function(GlobalGame) {
    var Utils = require('../Utils');
    Utils.Watcheventconfigurate();

    require('./FactoryofFactories.js')(GlobalGame,Utils);
    require('./Player.js')(GlobalGame,Utils);

});
