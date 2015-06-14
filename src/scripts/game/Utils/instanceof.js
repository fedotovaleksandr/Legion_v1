/**
 * Created by aleksandr on 14.06.2015.
 */
module.exports = (function(Utils) {
    Utils.instanceOf = function instanceOf(object, constructor) {

        var o=object;



        while (o.__proto__ != null) {

            if (o.__proto__ === constructor.prototype) return true;

            o = o.__proto__;

        }

        return false;

    }
});