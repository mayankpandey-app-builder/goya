

define([], function(app){
    'use strict';

    function menuToggle(){

        return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attrs) {      
                scope.toggle = function() {
                    console.log('menu toggled wrapper');
                    $(".wrapper").toggleClass("toggled");
                }
                scope.handleClick1 = function() {            
                    console.log('menu toggled wrapper1');
                    $(".wrapper1").toggleClass("toggled");
                }
                scope.handleClick2 = function() {            
                    console.log('menu toggled wrapper2');
                    $(".wrapper2").toggleClass("toggled");
                }
                

                $(document).ready(function() {
                        $(".click-mb").click(function() {
                            $(".hide-clk-tab").css("display", "none");
                        });
                        $(".mob-clk1").click(function() {
                            $(".hide-clk-tab").css("display", "block");

                        });
                });
            }
        }
    }

    menuToggle.$inject=[];

    return menuToggle;

});
