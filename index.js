

$(window).on('load',function(){

    $( ".main-nav__burger" ).on( "click", function(){
        $(this).toggleClass('open')
        $(".main-nav__menu").toggleClass('main-nav__menu--open')
    });

    $(".bottles__item").hover(
        function () {
            $(this).addClass('active')
        },
        function () {
            $(this).removeClass('active')
        }
    );
    
});
