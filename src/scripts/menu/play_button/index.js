    angular.module('app.menu.playButton', [])
        .directive('playButton', function() {
            return {
                scope: {
                    onClick: '&'
                },
                template: '<div class="playButton"\
                                    ng-click="onClick()">\
                                                play</div>'
            }
        })
