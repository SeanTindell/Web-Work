var $ = jQuery;

$(document).ready(function(){
    // $('nav').hide();
    function loop() {
        $('.hWork').animate ({ top: '40px'}, 600, 'swing', function() {
            loop();
        });
        $('.hWork').animate ({ top: '32px'}, 700, 'swing', function() {
            loop();
        });
        $('.hContact').animate ({ top: '38px'}, 700, 'swing', function() {
            loop();
        });
        $('.hContact').animate ({ top: '30px'}, 600, 'swing', function() {
            loop();
        });
        
        $('.hAbout').animate ({ top: '172px'}, 650, 'swing', function() {
            loop();
        });
        $('.hAbout').animate ({ top: '178px'}, 650, 'swing', function() {
            loop();
        });

    }
    loop();
    
    
    
    
});
$(document).scroll(function(){
        
        if($('#myNavbar > ul > li').hasClass('active')){
            $('nav').fadeIn();
            
        } else{
            $('nav').fadeOut();
           
        }
            
    });


