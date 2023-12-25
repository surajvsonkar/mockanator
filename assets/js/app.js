var GPTHEME = GPTHEME || {};

(function ($) {

	/*!----------------------------------------------
		# This beautiful code written with heart
		# by Mominul Islam <hello@mominul.me>
		# In Dhaka, BD at the GpTheme workstation.
		---------------------------------------------*/

	// USE STRICT
	"use strict";

	window.Gp = {
		init: function () {
			// Header
			this.header = $('.site-header');
			this.body = $('body');

			this.headerFixed = {
				initialOffset: parseInt(this.header.attr('data-fixed-initial-offset')) || 100,

				enabled: $('[data-header-fixed]').length,
				value: false,

				mobileEnabled: $('[data-mobile-header-fixed]').length,
				mobileValue: false
			};

			// Menus
			this.megaMenu = this.header.find('#mega-menu-wrap');
			this.mobileMenu = $('[data-mobile-menu-resolution]').data('mobile-menu-resolution');

			this.resize();
		},

		resize: function () {
			this.isDesktop = $(window).width() >= 991;
			this.isMobile = $(window).width() <= 991;
			this.isPad = $(window).width() <= 1024;
			this.isMobileMenu = $(window).width() <= Gp.mobileMenu;
		}
	};

	GPTHEME.initialize = {

		init: function () {
			GPTHEME.initialize.general();
			GPTHEME.initialize.swiperSlider();
			GPTHEME.initialize.sectionBackground();
			GPTHEME.initialize.portfolio();
			GPTHEME.initialize.sectionSwitch();
			GPTHEME.initialize.countUp();
			GPTHEME.initialize.countDown();
			GPTHEME.initialize.tab();
			GPTHEME.initialize.googleMap();
			GPTHEME.initialize.footer();
			GPTHEME.initialize.contactFrom();
		},

		/*========================================================*/
		/*=           Collection of snippet and tweaks           =*/
		/*========================================================*/

		general: function () {

			// Mouse Move Parallax Element
			var $scene = $('.parallax-element').parallax({
				scalarX: 100,
				scalarY: 100,
			});

			var svgContainer = document.getElementById('svgContainer');
			var animItem = bodymovin.loadAnimation({
				wrapper: svgContainer,
				animType: 'svg',
				loop: true,
				path: 'assets/js/data.json'
			});

			if ($('.astriol__blog-filter').length > 0) {
				$('.astriol__blog-filter').append('<li class="indicator"></li>');
				if ($('.astriol__blog-filter li a').hasClass('isActive')) {
					var cLeft = $('.astriol__blog-filter li a.isActive').position().left + 'px',
						cWidth = $('.astriol__blog-filter li a.isActive').css('width');
					$('.indicator').css({
						left: cLeft,
						width: cWidth
					})
				}
				$('.astriol__blog-filter li a').on('click', function () {
					$('.astriol__blog-filter li a').removeClass('isActive');
					$(this).addClass('isActive');
					var cLeft = $('.astriol__blog-filter li a.isActive').position().left + 'px',
						cWidth = $('.astriol__blog-filter li a.isActive').css('width');
					$('.indicator').css({
						left: cLeft,
						width: cWidth
					})
				});
			}

			// $(".banner-title").lettering();

			$(document).ready(function () {
				animation();
			}, 1000);

			function animation() {
				var title1 = new TimelineMax();

				title1.staggerFromTo(".banner-title span", 0.5, {
					ease: Back.easeOut.config(1.7),
					opacity: 0,
					bottom: -80
				}, {
					ease: Back.easeOut.config(1.7),
					opacity: 1,
					bottom: 0
				}, 0.05);

			}

			$('.marquee-wrap').marquee({
				speed: 50, // this echos 20
				gap: 30,
				delayBeforeStart: 0,
				direction: 'left',
				duplicated: true,
				startVisible: true
			});

			var $body = $('body');

			var $popup = $('.canvas-menu-wrapper');

			$("#mobile-menu-open").on('click', function (e) {
				e.preventDefault();
				var mask = '<div class="mask-overlay">';
				$(mask).hide().appendTo('body').fadeIn('fast');
				$popup.addClass('open');
				$(this).addClass('active');
				$body.addClass('page-popup-open');
				$("html").addClass("no-scroll sidebar-open").height(window.innerHeight + "px");
			});

			$(".close-menu, .mask-overlay").on('click', function (e) {
				e.preventDefault();
				$('.mask-overlay').remove();
				$body.removeClass('page-popup-open');
				$popup.removeClass('open');
				$('.sub-menu, .sub-menu-wide').removeAttr('style');
				$("html").removeClass("no-scroll sidebar-open").height("auto");
				$("#mobile-menu-open").removeClass('active');
				$('.has-submenu .menu-link').removeClass('active');
			});

			/* Magnefic Popup */
			$('.popup-video').each(function () {
				$('.popup-video').magnificPopup({
					type: 'iframe'
				});
			});


			$('.jarallax').jarallax({
				speed: 0.2
			});


			$('.popup-image').magnificPopup({
				type: 'image',
				midClick: true,
			});

			/*  Active Menu */
			$('.astriol-main-menu li > a').each(function () {
				if ($(this).attr('href') == location.href.split("/").slice(-1)) {
					$(this).addClass('current-menu-item');
				}
			});

			$(window).scroll(function (event) {
				var scrollPos = $(this).scrollTop();

				$('.call-to-action-creative').each(function () {
					var $el = $('.call-to-action-creative');
					var elPosRelToWindow = $el.offset().top - $(window).scrollTop();
					var inView = ((elPosRelToWindow > 0) && (elPosRelToWindow < $(window).height() - 250));

					$('#debug').html('elPosRelToWindow = ' + elPosRelToWindow + '<br>inView = ' + inView);

					$el.toggleClass('highlighter', inView);
					$('body').toggleClass('highlighter-hidden', inView);
				});

			});
		},

		/*===========================================*/
		/*=           handle Mobile Header          =*/
		/*===========================================*/
		handleMobileHeader: function () {
			if (Gp.header && Gp.header.length) {
				if (Gp.isMobileMenu) {
					Gp.header.addClass('mobile-header');
					Gp.body.addClass('is-mobile-menu');
					setTimeout(function () {
						$('.main-nav').addClass('unhidden');
					}, 300);
				} else {
					Gp.header.removeClass('mobile-header');
					Gp.body.removeClass('is-mobile-menu');
					$('.main-nav').addClass('visible');
				}
			}
		},

		/*==========================================*/
		/*=           Handle Fixed Header          =*/
		/*==========================================*/

		handleFixedHeader: function () {
			var fixed = Gp.headerFixed;

			if ($(document).scrollTop() > fixed.initialOffset) {

				if ((!Gp.isMobileMenu && fixed.enabled && !fixed.value) ||
					(Gp.isMobileMenu && fixed.mobileEnabled && !fixed.mobileValue)) {

					if (Gp.isMobileMenu) {
						fixed.mobileValue = true;
					} else {
						fixed.value = true;
					}
					Gp.header.addClass('header-fixed no-transition');
				}

			} else if (fixed.value || fixed.mobileValue) {
				fixed.value = false;
				fixed.mobileValue = false;
				Gp.header.removeClass('header-fixed');
			}

			// Effect appearance
			if ($(document).scrollTop() > fixed.initialOffset + 50) {
				Gp.header.removeClass('no-transition').addClass('showed');
			} else {
				Gp.header.removeClass('showed').addClass('no-transition');
			}
		},

		/*=====================================*/
		/*=           Swiper Slider           =*/
		/*=====================================*/

		swiperSlider: function () {
			$('.swiper-container').each(function () {
				var id = $(this).attr('id');
				var perpage = $(this).data('perpage') || 1;
				var loop = $(this).data('loop') || true;
				var speed = $(this).data('speed') || 700;
				var autoplay = $(this).data('autoplay') || 5000;
				var space = $(this).data('space') || 0;
				var effect = $(this).data('effect');
				var direction = $(this).data('direction') || 'horizontal';
				var breakpoints = $(this).data('breakpoints');

				var swiper = new Swiper('#' + id, {
					slidesPerView: perpage,
					spaceBetween: space,
					effect: effect,
					direction: direction,
					loop: loop,
					speed: speed,
					watchSlidesVisibility: true,
					slideVisibleClass: 'astriol-active-slide',
					breakpoints: breakpoints,
					autoplay: {
						delay: autoplay,
					},
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.gp-nav-next, .slider-next',
						prevEl: '.gp-nav-prev, .slider-prev',
					},

					thumbs: {
						swiper: galleryThumbs
					}
				});
			});

			/* Tab Slider */
			var exportFeatures = $(".previewSlider");

			if (exportFeatures) {
				var
					sliderFeature = $(".swiper-wrapper", exportFeatures),
					childSlide = sliderFeature.children(),
					i,
					pictos = [],
					titles = [];

				childSlide.each(function () {
					var $this = $(this);
					var picto = $this.data('image'),
						title = $this.data('title');
					pictos.push(picto);
					titles.push(title);
				});


				var swiperExport = new Swiper(".previewSlider", {
					effect: "fade",
					autoplay: {
						delay: 5000,
					},
					fadeEffect: {
						crossFade: true
					},
					pagination: {
						el: ".astriol-pagination",
						clickable: !0,
						renderBullet: function (e, t) {
							return '<span class="' + t + '"><i class="' + pictos[e] + '"></i><span>' + titles[e] + "</span></span>"
						}
					}
				});

				swiperExport.on("slideChange", function () {
					var e = this.activeIndex;
					document.getElementById("slider-tab").classList = "dashboard-preview active-tab-" + e
				})
			}


			var galleryThumbs = new Swiper('.thumb-slider', {
				slidesPerView: 4,
				loop: true,
				effect: 'coverflow',
				centeredSlides: true,
				// slideToClickedSlide: true,
				coverflowEffect: {
					rotate: 0,
					stretch: -25,
					slideShadows: false,
					depth: 200
				},
				freeMode: false,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
			});

			var galleryTop = new Swiper('.gallery-slider', {
				// spaceBetween: 10,
				// effect: 'fade',
				loop: true,
				centeredSlides: true,
				// fadeEffect: {
				// 	crossFade: true
				// },
				thumbs: {
					swiper: galleryThumbs
				}
			});

			$('.testimonial-top').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.testimonial-bottom'
			});
			$('.testimonial-bottom').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: '.testimonial-top',
				arrows: false,
				dots: false,
				centerMode: true,
				focusOnSelect: true,
				responsive: [{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			});
		},

		/*==============================*/
		/*=           Portfolio          =*/
		/*==============================*/

		portfolio: function () {
			if ((typeof $.fn.imagesLoaded !== 'undefined') && (typeof $.fn.isotope !== 'undefined')) {
				$(".astriol__portfolio-items").imagesLoaded(function () {
					var container = $(".astriol__portfolio-items");

					container.isotope({
						itemSelector: '.astriol__portfolio',
						percentPosition: true,
						transitionDuration: '0.5s',
						masonry: {
							columnWidth: '.grid-sizer',
							layoutMode: 'masonry',
						}
					});

					$('.astriol__isotope-filter a').on('click', function () {
						$('.astriol__isotope-filter').find('.current').removeClass('current');
						$(this).parent().addClass('current');

						var selector = $(this).attr("data-filter");
						container.isotope({
							filter: selector
						});

						return false;
					});

					$(window).resize(function () {
						container.isotope();
					});

				});

				var container = $(".astriol__blog-items");
				$(".astriol__blog-items").imagesLoaded(function () {


					container.isotope({
						itemSelector: '.astriol__blog-grid',
						percentPosition: true,
						transitionDuration: '0.5s',
						masonry: {
							layoutMode: 'masonry',
						}
					});

					$('.astriol__blog-filter a').on('click', function () {
						$('.astriol__blog-filter').find('.current').removeClass('current');
						$(this).parent().addClass('current');

						var selector = $(this).attr("data-filter");
						container.isotope({
							filter: selector
						});

						return false;
					});

					$(window).resize(function () {
						container.isotope();
					});
				});
			}
		},

		/*==========================================*/
		/*=           Section Background           =*/
		/*==========================================*/

		sectionBackground: function () {

			// Section Background Image
			$('[data-bg-image]').each(function () {
				var img = $(this).data('bg-image');
				$(this).css({
					backgroundImage: 'url(' + img + ')',
				});
			});

			//Parallax Background
			$('[data-parallax="image"]').each(function () {

				var actualHeight = $(this).position().top;
				var speed = $(this).data('parallax-speed');
				var reSize = actualHeight - $(window).scrollTop();
				var makeParallax = -(reSize / 2);
				var posValue = makeParallax + "px";

				$(this).css({
					backgroundPosition: '50% ' + posValue,
				});
			});
		},

		/*=========================================*/
		/*=           Section Background          =*/
		/*=========================================*/

		sectionSwitch: function () {
			$('[data-type="section-switch"], .gp-btn, .astriol-main-menu li a').on('click', function () {
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					var target = $(this.hash);
					if (target.length > 0) {

						target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
						$('html,body').animate({
							scrollTop: target.offset().top
						}, 1000);
						return false;
					}
				}
			});
		},

		/*==============================*/
		/*=           Countup          =*/
		/*==============================*/
		countUp: function () {
			var options = {
				useEasing: true,
				useGrouping: true,
				separator: ',',
				decimal: '.',
				prefix: '',
				suffix: ''
			};

			var counteEl = $('[data-counter]');

			if (counteEl) {
				counteEl.each(function () {
					var val = $(this).data('counter');

					var countup = new CountUp(this, 0, val, 0, 2.5, options);
					$(this).appear(function () {
						countup.start();
					}, {
						accX: 0,
						accY: 0
					})
				});
			}
		},

		/*=================================*/
		/*=           Count Down          =*/
		/*=================================*/

		countDown: function () {
			$('.countdown').each(function (index, value) {
				var count_year = $(this).attr("data-count-year");
				var count_month = $(this).attr("data-count-month");
				var count_day = $(this).attr("data-count-day");
				var count_date = count_year + '/' + count_month + '/' + count_day;
				$(this).countdown(count_date, function (event) {
					$(this).html(
						event.strftime('<span class="CountdownContent">%D<span class="CountdownLabel">Days</span></span><span class="CountdownSeparator"></span><span class="CountdownContent">%H <span class="CountdownLabel">HR</span></span><span class="CountdownSeparator"></span><span class="CountdownContent">%M <span class="CountdownLabel">MIN</span></span><span class="CountdownSeparator"></span><span class="CountdownContent">%S <span class="CountdownLabel">SC</span></span>')
					);
				});
			});
		},

		/*=============================*/
		/*=           Skills          =*/
		/*=============================*/

		skills: function () {

			$('.skill-bar li').each(function () {

				$(this).appear(function () {
					$(this).css({
						opacity: 1,
						left: "0px"
					});
					var b = $(this).find(".progress-bar").attr("data-width");
					$(this).find(".progress-bar").css({
						width: b + "%"
					});
				});

			});
		},

		/*==========================*/
		/*=           Tab          =*/
		/*==========================*/
		tab: function () {
			$('.gp-tab ul.gp-tabs-nav').addClass('active').find('> li:eq(0)').addClass('current');

			$('.gp-tab ul.gp-tabs-nav li a').click(function (g) {
				var tab = $(this).closest('.gp-tab'),
					index = $(this).closest('li').index();

				tab.find('ul.gp-tabs-nav > li').removeClass('current');
				$(this).closest('li').addClass('current');

				tab.find('.tab_content').find('div.gp_tabs_item').not('div.gp_tabs_item:eq(' + index + ')').slideUp();
				tab.find('.tab_content').find('div.gp_tabs_item:eq(' + index + ')').slideDown();

				g.preventDefault();
			});

			if ($('.tab-swipe').length > 0) {
				$('.tab-swipe li a').on('click', function () {
					$('.tab-swipe li a').removeClass('isActive');
					$(this).addClass('isActive');
				});
			}


			var tabItems = $('.gp-tabs-navigation li'),
				tabContentWrapper = $('.gp-tabs-content');

			tabItems.on('click', function (event) {
				event.preventDefault();
				var selectedItem = $(this);
				if (!selectedItem.hasClass('active-tab')) {
					var selectedTab = selectedItem.data('content'),
						selectedContent = tabContentWrapper.find('li[data-content="' + selectedTab + '"]'),
						slectedContentHeight = selectedContent.innerHeight();

					tabItems.removeClass('active-tab');
					selectedItem.addClass('active-tab');
					selectedContent.addClass('active-tab').siblings('li').removeClass('active-tab');
					//animate tabContentWrapper height when content changes
					tabContentWrapper.animate({
						'height': slectedContentHeight
					}, 500);
				}
			});


			//hide the .gp-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
			checkScrolling($('.gp-tabs nav'));
			$(window).on('resize', function () {
				checkScrolling($('.gp-tabs nav'));
				tabContentWrapper.css('height', 'auto');
			});

			$('.gp-tabs nav').on('scroll', function () {
				checkScrolling($(this));
			});

			function checkScrolling(tabs) {
				var totalTabWidth = parseInt(tabs.children('.gp-tabs-navigation').width()),
					tabsViewport = parseInt(tabs.width());
				if (tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
					tabs.parent('.gp-tabs').addClass('is-ended');
				} else {
					tabs.parent('.gp-tabs').removeClass('is-ended');
				}
			}
		},


		/*=================================*/
		/*=           Google Map          =*/
		/*=================================*/
		googleMap: function () {
			$('.gmap3-area').each(function () {
				var $this = $(this),
					key = $this.data('key'),
					lat = $this.data('lat'),
					lng = $this.data('lng'),
					mrkr = $this.data('mrkr'),
					address = $this.data('address'),
					addr = $this.data('addr');

				$this.gmap3({
					center: [lat, lng],
					zoom: 14,
					scrollwheel: false,

					mapTypeId: google.maps.MapTypeId.ROADMAP,
					styles: [{
						"featureType": "all",
						"elementType": "labels.text.fill",
						"stylers": [{
							"saturation": 36
						},
							{
								"color": "#000000"
							},
							{
								"lightness": 40
							}
						]
					},
						{
							"featureType": "all",
							"elementType": "labels.text.stroke",
							"stylers": [{
								"visibility": "on"
							},
								{
									"color": "#000000"
								},
								{
									"lightness": 16
								}
							]
						},
						{
							"featureType": "all",
							"elementType": "labels.icon",
							"stylers": [{
								"visibility": "off"
							}]
						},
						{
							"featureType": "administrative",
							"elementType": "geometry.fill",
							"stylers": [{
								"color": "#000000"
							},
								{
									"lightness": 20
								}
							]
						},
						{
							"featureType": "administrative",
							"elementType": "geometry.stroke",
							"stylers": [{
								"color": "#000000"
							},
								{
									"lightness": 17
								},
								{
									"weight": 1.2
								}
							]
						},
						{
							"featureType": "landscape",
							"elementType": "geometry",
							"stylers": [{
								"color": "#000000"
							},
								{
									"lightness": 20
								}
							]
						},
						{
							"featureType": "poi",
							"elementType": "geometry",
							"stylers": [{
								"color": "#000000"
							},
								{
									"lightness": 21
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "geometry.fill",
							"stylers": [{
								"color": "#000000"
							},
								{
									"lightness": 17
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "geometry.stroke",
							"stylers": [{
								"color": "#000000"
							},
								{
									"lightness": 29
								},
								{
									"weight": 0.2
								}
							]
						},
						{
							"featureType": "road.arterial",
							"elementType": "geometry",
							"stylers": [{
								"color": "#000000"
							},
								{
									"lightness": 18
								}
							]
						},
						{
							"featureType": "road.local",
							"elementType": "geometry",
							"stylers": [{
								"color": "#000000"
							},
								{
									"lightness": 16
								}
							]
						},
						{
							"featureType": "transit",
							"elementType": "geometry",
							"stylers": [{
								"color": "#000000"
							},
								{
									"lightness": 19
								}
							]
						},
						{
							"featureType": "water",
							"elementType": "geometry",
							"stylers": [{
								"color": "#000000"
							},
								{
									"lightness": 17
								}
							]
						}
					]
				})
					.marker(function (map) {
						return {
							position: map.getCenter(),
							icon: mrkr,
						};
					})

			});
		},

		/*=============================*/
		/*=           Footer          =*/
		/*=============================*/

		footer: function () {
			/* Footer Fixed */
			var footerFixed = $('#footer-btc').outerHeight();

			if ($(document).width() > 768) {
				$('#main_content').css('margin-bottom', footerFixed);
			}
		},

		/*=================================*/
		/*=           Contact Form          =*/
		/*=================================*/

		contactFrom: function () {

			$('[data-gp-form]').each(function () {
				var $this = $(this);
				$('.form-result', $this).css('display', 'none');

				$this.submit(function () {

					$('button[type="submit"]', $this).addClass('clicked');

					// Create a object and assign all fields name and value.
					var values = {};

					$('[name]', $this).each(function () {
						var $this = $(this),
							$name = $this.attr('name'),
							$value = $this.val();
						values[$name] = $value;
					});

					// Make Request
					$.ajax({
						url: $this.attr('action'),
						type: 'POST',
						data: values,
						success: function success(data) {

							if (data.error == true) {
								$('.form-result', $this).addClass('alert-warning').removeClass('alert-success alert-danger').css('display', 'block');
							} else {
								$('.form-result', $this).addClass('alert-success').removeClass('alert-warning alert-danger').css('display', 'block');
							}
							$('.form-result > .content', $this).html(data.message);
							$('button[type="submit"]', $this).removeClass('clicked');
						},
						error: function error() {
							$('.form-result', $this).addClass('alert-danger').removeClass('alert-warning alert-success').css('display', 'block');
							$('.form-result > .content', $this).html('Sorry, an error occurred.');
							$('button[type="submit"]', $this).removeClass('clicked');
						}
					});
					return false;
				});

			});
		}

	};

	GPTHEME.documentOnReady = {
		init: function () {
			GPTHEME.initialize.init();

			$('#animated-wave-one').wavify({
				height: 20,
				bones: 4,
				amplitude: 70,
				color: "rgba(218, 222, 255, 0.2)",
				speed: .15
			});

			$('#animated-wave-two').wavify({
				height: 30,
				bones: 4,
				amplitude: 100,
				color: 'rgba(218, 222, 255, 0.2)',
				speed: .2
			});
			$('#animated-wave-three').wavify({
				height: 30,
				bones: 4,
				amplitude: 100,
				color: 'rgba(255, 255, 255, 0.039)',
				speed: .15
			});
			$('#animated-wave-four').wavify({
				height: 30,
				bones: 4,
				amplitude: 100,
				color: 'rgba(255, 255, 255, 0.039)',
				speed: .2
			});

		},
	};

	GPTHEME.documentOnLoad = {
		init: function () {
			$(".page-loader").fadeOut("slow");
			GPTHEME.initialize.handleMobileHeader();
		},
	};

	GPTHEME.documentOnResize = {
		init: function () {
			Gp.resize();
			GPTHEME.initialize.handleMobileHeader();
			GPTHEME.initialize.handleFixedHeader();
		},
	};

	GPTHEME.documentOnScroll = {
		init: function () {
			GPTHEME.initialize.sectionBackground();
			GPTHEME.initialize.handleFixedHeader();

			if ($(window).scrollTop() > 300) {
				$('.return-to-top').addClass('back-top');
			} else {
				$('.return-to-top').removeClass('back-top');
			}

			/* Header Sticky */
			if ($(this).scrollTop() > 150) {
				$('#header').addClass("fixed")
			} else {
				$('#header').removeClass("fixed")
			}

			/* Mobile Nav */
			if ($(window).scrollTop() > 54) {
				$('#mobile-nav-wrap,.mobile-menu-inner').addClass('mnav-fixed');
			} else {
				$('#mobile-nav-wrap, mobile-menu-inner').removeClass('mnav-fixed');
			}
		},
	};

	Gp.init();

	// Initialize Functions
	$(document).ready(GPTHEME.documentOnReady.init);
	$(window).on('load', GPTHEME.documentOnLoad.init);
	$(window).on('resize', GPTHEME.documentOnResize.init);
	$(window).on('scroll', GPTHEME.documentOnScroll.init);

})(jQuery);