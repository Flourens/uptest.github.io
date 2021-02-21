import ScrollMagic from 'scrollmagic';
import Table from './table.js';
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'

$(window).on('load',function(){
    
    let menu = $( ".main-nav__burger" );
    
    menu.on( "click", function(){
        $(this).toggleClass('open');
        $(".main-nav__menu").toggleClass('main-nav__menu--open');
    });
    $( ".table-1__btns" ).on( "click", function(){
        $(".table-1__btns").toggleClass('table-1__btns--open');
    });

    $("a[href^='#']").click(function(e) {  
        e.preventDefault();
        closeMenu();
        let dest = $(this).attr('href');  
        $('html,body').animate({ scrollTop: $(dest).offset().top }, 'slow');
    });

    function closeMenu() {
        menu.removeClass('open');
        $(".main-nav__menu").removeClass('main-nav__menu--open');
    }

    $(".bottles__item").hover(
        function () {
            $(this).addClass('active')
        },
        function () {
            $(this).removeClass('active')
        }
    );


    // scroll controller
    let controller = new ScrollMagic.Controller();

    let sections = $('.section');
    let subSections = $('.section__sub');
    let mainNavItems = $('.main-nav__list-item');
    let subNav = $('.sub-nav');


    // float scene
    new ScrollMagic.Scene({
        triggerElement: '.js-float-start',
        triggerHook: 0,
        offset: -100
    })
        // .setPin('.js-float-start') // pins the element for the the scene's duration
        .on('enter', () => {
            subNav.addClass('sub-nav--active');
        })
        .on('leave', () => {
            
            subNav.removeClass('sub-nav--active');
        })
        // .addIndicators({name: 'float'})
        .addTo(controller);
    
    // Hide float
    new ScrollMagic.Scene({
        triggerElement: '.js-float-end',
        triggerHook: 0.5,
    })
        .on('enter', () => {
            subNav.removeClass('sub-nav--active');
        })
        .on('leave', () => {
            subNav.addClass('sub-nav--active');
        })
        // .addIndicators()
        .addTo(controller);


    // SECTIONS HANDLER
    for (let i = 0; i < sections.length; i++) {
        new ScrollMagic.Scene({
            triggerElement: sections[i],
            triggerHook: 0.6,
            duration: sections[i].scrollHeight
        })
            .on('enter', () => {
                addActiveSection(i);
            })
            .on('leave', () => {
                removeActiveSection(i);
            })
            // .addIndicators()
            .addTo(controller);
    }

    // SUBSECTIONS HANDLER
    for (let i = 0; i < subSections.length; i++) {
        new ScrollMagic.Scene({
            triggerElement: subSections[i],
            triggerHook: 0.8,
            duration: subSections[i].scrollHeight
        })
            .on('enter', () => {
                addActiveSubSection(i);
            })
            .on('leave', () => {
                removeActiveSubSection(i);
            })
            // .addIndicators()
            .addTo(controller);
    }

    function addActiveSection(id) {
        $(mainNavItems[id]).addClass('active');
    }
    function removeActiveSection(id) {
        $(mainNavItems[id]).removeClass('active');
    }

    function addActiveSubSection(id) {
        let activeSubectionSelector = getSubSectionSelector(id);
        $(activeSubectionSelector).addClass('active');
    }
    function removeActiveSubSection(id) {
        let activeSubectionSelector = getSubSectionSelector(id);
        $(activeSubectionSelector).removeClass('active');
    }
    function getSubSectionSelector(id) {
        return `.sub-nav__icon--${id + 1}`;
    }

    // Init table
    const newTable = document.querySelector('#variantsTable');
    const table = new Table(newTable);
    table.selectGroup([1, 2]);

    $(".table-1__btn").click(function(e) {
        e.preventDefault();
        let target = $(this).attr('data-targetgroup');
        $(this).toggleClass('table-1__btn--active');
        table.selectGroup(target);
    });
    
});
