var $ = jQuery;

$(document).ready(function(){
    
    function loop() {
        $('.hWork').animate ({ top: '38px'}, 600, 'swing', function() {
            loop();
        });
        $('.hWork').animate ({ top: '32px'}, 700, 'swing', function() {
            loop();
        });
        $('.hContact').animate ({ top: '38px'}, 700, 'swing', function() {
            loop();
        });
        $('.hContact').animate ({ top: '32px'}, 600, 'swing', function() {
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
