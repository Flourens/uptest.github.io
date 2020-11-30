

$(window).on('load',function(){

    $( ".burger" ).on( "click", function(){
        $(this).toggleClass('open')
        $(".main-nav__list").toggleClass('main-nav__list--open')
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
