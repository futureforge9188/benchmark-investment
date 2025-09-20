(function ($) {
  "use strict";

  /* =============================
     Spinner
  ============================== */
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  /* =============================
     WOW.js
  ============================== */
  new WOW().init();

  /* =============================
     Sticky Navbar
  ============================== */
  $(window).on("scroll resize", function () {
    if ($(window).width() > 992) {
      if ($(this).scrollTop() > 45) {
        $(".sticky-top .container").addClass("shadow-sm").css("max-width", "100%");
      } else {
        $(".sticky-top .container")
          .removeClass("shadow-sm")
          .css("max-width", $(".topbar .container").width());
      }
    } else {
      $(".sticky-top .container").addClass("shadow-sm").css("max-width", "100%");
    }
  });

  /* =============================
     Carousels (Owl)
  ============================== */

  // HERO / HEADER — dots only + swipe/drag
  $(".header-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    smartSpeed: 700,
    dots: true,
    nav: false,               // hide arrows
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 0
  });

  // PROJECT — same behavior as before (dots on)
  $(".project-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: false,
    responsiveClass: true,
    responsive: {
      0:   { items: 1 },
      576: { items: 1 },
      768: { items: 2 },
      992: { items: 2 },
      1200:{ items: 2 }
    }
  });

  // TESTIMONIAL — dots only + swipe/drag
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 4500,
    smartSpeed: 600,
    center: false,
    dots: true,
    loop: true,
    margin: 24,
    nav: false,               // hide arrows
    mouseDrag: true,
    touchDrag: true,
    responsiveClass: true,
    responsive: {
      0:   { items: 1 },
      576: { items: 1 },
      768: { items: 2 },
      992: { items: 2 },
      1200:{ items: 2 }
    }
  });

  /* =============================
     Facts Counter
  ============================== */
  $("[data-toggle='counter-up']").counterUp({
    delay: 5,
    time: 2000
  });

  /* =============================
     Back to Top
  ============================== */
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

})(jQuery);
