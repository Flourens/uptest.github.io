
import ScrollMagic from 'scrollmagic';
import Table from './table.js';
import { TweenMax, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

$(window).on('load',function(){

    let sections = $('.js-menu-trigger');
    let subSections = $('.section__sub');
    let mainNavItems = $('.js-main-nav-item');
    let subNav = $('.sub-nav');
    let from = '';

    (function processUrl(){
        from = getUrlParameter('from');
        if (from === 'agencies') {
            console.log(from);
        }
        if (from === 'pharma') {
            console.log(from);
        }
    })();

    (function initNBavigation() {
        // scroll controller
        let controller = new ScrollMagic.Controller();
        // float scene
        new ScrollMagic.Scene({
            triggerElement: '.js-float-start',
            triggerHook: 0.6,
            offset: 0
        })
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


        // // scene
        // new ScrollMagic.Scene({
        //     triggerElement: '.js-float-start',
        //     triggerHook: 0,
        //     offset: -100
        // })
        //     .setPin(".sub__list-icon--1")
        //     .setTween(".sub__list-icon--1", 0.5, {x: '25vw', y: `${window.innerHeight - 280}`, scale: 0.3})
        //     .addTo(controller);
        // // scene
        // new ScrollMagic.Scene({
        //     triggerElement: '.js-float-start',
        //     triggerHook: 0,
        //     offset: -100
        // })
        //     .setPin(".sub__list-icon--2")
        //     .setTween(".sub__list-icon--2", 0.5, {x:0, y: `${window.innerHeight - 280}`, scale: 0.3})
        //     .addTo(controller);
        // // scene
        // new ScrollMagic.Scene({
        //     triggerElement: '.js-float-start',
        //     triggerHook: 0,
        //     offset: -100
        // })
        //     .setPin(".sub__list-icon--3")
        //     .setTween(".sub__list-icon--3", 0.5, {x: '-25vw', y: `${window.innerHeight - 280}`, scale: 0.3})
        //     .addTo(controller);


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
    })();

    (function initMenu() {
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
    })();

    (function initTable() {
        const newTable = document.querySelector('#variantsTable');
        const table = new Table(newTable);
        table.selectGroup([1, 2]);
    
        $(".table-1__btn").click(function(e) {
            e.preventDefault();
            let target = $(this).attr('data-targetgroup');
            $(this).toggleClass('table-1__btn--active');
            table.selectGroup(target);
        });
    })()

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

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };

});
