/**
 * Created by aleksandr on 14.06.2015.
 */
module.exports = (function(Utils) {
    //наследование классов
    Utils.Extend = function EXTEND(Child, Parent) {

        var F = function() { };

        F.prototype = Parent.prototype;

        Child.prototype = new F();

        Child.prototype.constructor = Child;

        Child.superclass = Parent.prototype;

    }
});
