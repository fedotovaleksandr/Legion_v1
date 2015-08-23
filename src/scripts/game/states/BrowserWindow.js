/**
 * Created by aleksandr on 07.08.2015.
 */
module.exports = (function(GlobalGame) {

    GlobalGame.BrowserWindow=function()
    {
        this.Width =document.documentElement.clientWidth;
        this.Height= document.documentElement.clientHeight;
        document.body.style.overflow='hidden';

    };

});