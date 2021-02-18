

$(window).on('load',function(){

    $( ".main-nav__burger" ).on( "click", function(){
        $(this).toggleClass('open')
        $(".main-nav__menu").toggleClass('main-nav__menu--open')
    });
    $( ".table-1__btns" ).on( "click", function(){
        $(".table-1__btns").toggleClass('table-1__btns--open')
    });

    $("a[href^='#']").click(function(e) {  
        e.preventDefault();
        var dest = $(this).attr('href');  
        $('html,body').animate({ scrollTop: $(dest).offset().top }, 'slow');
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
