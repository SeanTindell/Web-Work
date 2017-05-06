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

});


var t = 0;

function circle()  {
    t += 0.01;

    var radius = 175;
        var fields = $('.landingItem'), 
            container = $('#landingContainer'), 
            width = container.width(), 
            height = container.height();
        var angle = 0, 
            step = (2*Math.PI) / fields.length;
        fields.each(function() {
            var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2)+50;
            var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2)+75;
            
            $(this).css({
                left: x + 'px',
                top: y + 'px'
            });
            angle += step;
        });
    //     fields.each(function() {
    //       var  x = Math.round(width/2 + radius * Math.cos(angle+t) - $(this).width()/2)+50;
    //       var y = Math.round(height/2 + radius * Math.sin(angle+t) - $(this).height()/2)+75;
    //   $(this).animate({
    //             left: x + 'px',
    //             top: y + 'px'
    //         });
    //     },1 ,function(){
    //         circle();
    //     });
}

    
$(document).ready(function() {
    circle();
   
});







// var t = 0;

// function moveit(id, xC, yC  {
//     t += 0.01;

//     var r = 150;
//     var xcenter = xC;
//     var ycenter = yC;
//     var newLeft = Math.floor(xcenter + (r * Math.cos(t)));
//     var newTop = Math.floor(ycenter + (r * Math.sin(t)));
//     $(id).animate({
//         top: newTop,
//         left: newLeft,
//     }, 1, function() {
//         moveit(id, xC, yC);
//     });
// }

// $(document).ready(function() {
//     moveit('#landingWork', 150, 300); 
//     moveit('#landingAbout', 150,300); 
//     moveit('#landingContact', 150,300);
// });