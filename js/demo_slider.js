// When the DOM is ready, run this function
$(document).ready(function() {
    //Set the carousel options
    $('#quote-carousel').carousel({
        pause: true,
        interval: 4000,
    });
    $("#quote-carousel").swiperight(function() {
        $(this).carousel('prev');
    });
    $("#quote-carousel").swipeleft(function() {
        $(this).carousel('next');
    });
    $(".remove-left").remove();
    $(".remove-right").remove();
});