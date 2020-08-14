$(document).ready(function(){
    
    new WOW().init();

    $(document).click(function(event) {
        $(event.target).closest(".navbar").length || $(".navbar-collapse.show").length && $(".navbar-collapse.show").collapse("hide")
      });

    $(".arrow-down").click(function() {
        $('html, body').animate({
            scrollTop: $("#about-section").offset().top
        }, 1200);
    });
    $('.team').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 300,
        centerMode: false,
        variableWidth: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        dots:true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    centerMode: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '70px',
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    variableWidth: true
                }
            }
        ]
    });

    
    $('#home-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        centerMode: false,
        variableWidth: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        dots:false,
        fade: true
    }).on('init', function(e, slick) {
        var $firstAnimatingElements = $('div.home-slide:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);    
    }).on('beforeChange', function(e, slick, currentSlide, nextSlide) {
              var $animatingElements = $('div.home-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
              doAnimations($animatingElements);    
    })
    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    }



   

    $('.testimonial-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 300,
        centerMode: true,
        centerPadding: '40px',
        variableWidth: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    centerMode: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '30px',
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    variableWidth: false
                }
            }
        ]
    });

    $('.clients').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 300,
        // centerMode: true,
        variableWidth: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    });

    $('.blog__content').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 300,
        // centerMode: true,
        variableWidth: false,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 2000,
        dots: true,
        responsive: [
            {
            breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
            breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    });

    $('.popup').magnificPopup({
        type: 'image'
    });

    $( "#contactFormFront" ).submit(function( event ) {
        alert( "Handler for .submit() called." );
        event.preventDefault();
      });
  
});