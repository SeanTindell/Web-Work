var $ = jQuery;
var ballMoving = true;


$(document).ready(function(){
    
    function loop() {
        $('.line').animate ({ top: '37px'}, 700, 'swing', function() {
            loop();
        });
        $('.line').animate ({ top: '33px'}, 700, 'swing', function() {
            loop();
        });
        $('.line2').animate ({ top: '55px'}, 700, 'swing', function() {
            loop();
        });
        $('.line2').animate ({ top: '50px'}, 600, 'swing', function() {
            loop();
        });
    }
     $('.active').append('<span class ="line"></span><span class ="line2"></span>');
     loop();
     
     
     $('.barItem').mouseenter(function(){
         $(this).append('<span class ="hoverLine">');
     })
     $('.barItem').mouseleave(function(){
         $('.hoverLine').remove();
     })
     
     
     
     
     

});