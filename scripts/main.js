var $ = jQuery;

$(document).ready(function(){
    
    function loop() {
        $('.line, .hoverLine').animate ({ top: '37px'}, 700, 'swing', function() {
            loop();
        });
        $('.line, .hoverLine').animate ({ top: '33px'}, 700, 'swing', function() {
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
     
     $('.active').mouseenter(function(){
        $('.line').remove();
     });
     
     $('.active').mouseleave(function(){
      $('.active').append('<span class ="line">');
     });
     $('.barItem').mouseenter(function(){
         $(this).append('<span class ="hoverLine">');
     });
     $('.barItem').mouseleave(function(){
         $('.hoverLine').remove();
        
     });
     circle();

});


function circle()  {

    var radius = 200;
        var fields = $('.workItem'), 
            container = $('#workContainer'), 
            width = container.width(), 
            height = container.height();
        var angle = 0, 
            step = (2*Math.PI) / fields.length;
        fields.each(function() {
            var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2)+0;
            var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2)+350;
            
            $(this).css({
                left: x + 'px',
                top: y + 'px'
            });
            angle += step;
        });

}






