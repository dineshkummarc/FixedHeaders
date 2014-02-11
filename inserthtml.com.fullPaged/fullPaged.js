(function(w, d, $, undefined) {
	
	
	$.fullPaged = function(options, element) {
		
		// This object
		$t = this;
		
		// Extend defaults to options
		this.options = $.extend(true, {}, $.fullPaged.defaults, options);
		
		// Current page name
		var url = window.location.hash || '#'+this.options.defaultPage; // Home is the default page.
		this.pageName = url+'-page'; // Effectively the page ID

		// For lower IE versions just use fade since no 3D transforms.
		if(this.iedetect(9) || this.iedetect(8) || this.iedetect(7)) {
			this.options.animation = 'fade'
		}
			
		// For switching between mobile and desktop versions
		this.version = this.options.direction;
		
		// The element name
		this.element = element;
		
		// The element targeted
		this.$element = $(element);
		
		this.isScroll = false; // Is it scrolling?
		
		// Initiate Load Sequence .. 5  .. 4  .. 3 .. 2 .. 1 ..
		// Only joking there was no countdown it happens almost
		// immediately.
		
		this.init();
	}
	
	$.fullPaged.defaults = {
		
		// The background image for the #[defaultPage]-page div. We define it here
		// So that we can blur it if the user wants that. It also gives us
		// a little more room to manoeuver with customization.
		image : 'background.jpg',

		// The default direction is bottom. This is the direction in which
		// the menu will be revealed. It can be top, bottom, left or right
		direction : 'bottom',
		
		// Should the home page be fixed? That means it'll appear static as
		// scrolling occurs
		homeFixed : true,
		
		// The default page. i.e. if the id of your default page is #index-page
		// set this to index. 
		defaultPage : 'home',
		
		// The direction you wish to use on mobile devices. Vertical menus
		// may not work fit on a mobile screen, so you might want to use 
		// top or bottom
		mobiledirection : 'bottom',
		
		// This is the class of the button which you want  to  activate
		// the animation. Put a dot in front for a class and a hash for
		// an id
		activate : '.show-menu',
		
		// The height (or width) you want the left, right, top or
		// bottom bars to be.
		size : 140,
		
		// How much smaller the menu should be on mobile screens
		mobileAdj : 40,
		
		// The amount of time the animation takes to complete.
		animationTime : 1.2,
		
		// Is the blur animation enabled? This can cause some lag issues on
		// some devices. This blurs the background image on your home page
		blur : false, 
		
		// The animation you wish to use. Can be fold, slide, fade or show.
		animation : 'fold',
		
		// Scroll time, the amount of time it takes to scroll down to the next
		// page in seconds without units. The default is 1 second.
		scrollTime: 1
		
	}
	
	$.fullPaged.prototype = {
		
		init: function() {
			
			// For mobile devices
			this.mobile();
			
			// This is to get the direction we're going in
			// For transforming purposes
			$t.d = 'top bottom left right'.split(' ');
			$t.a = this.version;
			$t.$r;
				
			if($t.a === $t.d[0]) {
				$t.$element.find('.hidden-content').addClass('top');
				$r = 'X';
			} 
			else if($t.a === $t.d[1]) {
				$t.$element.find('.hidden-content').addClass('bottom');
				$r = 'X';
			}
			else if($t.a === $t.d[2]) {
				$t.$element.find('.hidden-content').addClass('left');
				$r = 'Y';
			}
			else if($t.a === $t.d[3]) {
				$t.$element.find('.hidden-content').addClass('right');
				$r = 'Y';
			}
			
			
			// Append some stuff
			this.append();	
			
			// Events
			this.events();
			
			// Corrects scrolling
			this.scrolling();
			
			
		}, 
		
		append: function() {
			
			var $height, $width;
		
			// The height and width of the window. Add 1 for mobile compatibility (i.e. so users on iPhones can still access URL bar
			// By double tapping on the top of the screen). 
			$height = $(window).outerHeight() + 1;
			$width = $(window).width();
			
			// Resize everything so it fits
			(resize = function() {
				
				// The height and width of the window
				$height = height = window.innerHeight ? window.innerHeight : $(window).height();
				$width = $(window).outerWidth();
				
				$t.$element.css({
					'width' : $width+'px',
					'height' : $height+'px'
				});
				
			})();
			
			// Running the resize function on both scroll and window resize to ensure proper size is maintained. Scrolling
			// is very difficult to do manually in this app, but if someone manages it we will have a backup.
			$(window).resize(resize).scroll(resize).on('orientationchange', resize);
			
			// Put in a timeout to allow the page to load and get the proper dimensions for the window. Ensures no problems
			// are encountered
			setTimeout(function() {
				// Run resize function
				resize();
				// Overflow hidden, so the user cannot scroll.
				$('body').css({'overflow' : 'hidden'});
			
			}, 100);

			// Set background image on the home page.
			$('<div class="background-image"></div>').appendTo($t.$element.find('#'+$t.options.defaultPage+'-page')).css({
				'background' : 'url('+this.options.image+')',
			});
			
			// If it's fixed, apply those settings to the home page.
			if(this.options.homeFixed === true) {
				$t.$element.find('.background-image').css({
					'position' : 'fixed',
					'top' : '0'
				});
				
			}
			
			
			// APPENDING
			// ---------

			// Add a div to handle the image in the menu.
			this.$element.find('.hidden-content').append('<div class="image"></div>');
			
			// Variables! Variables everywhere
			var $animTime,
				x = this.$element.find('.hidden-content').find('.image'), // Some variables to shorten.
				y = this.$element.find('.hidden-content').find('.content'), // What I'm writing.
				
				$s = this.options.size, // Just a shorter version for the size you want it to be as determined by the code.
			
				$c, // A variable for the clip on the last content div.
				
				xresize;
			
			
			// Positions the menu depending on where the user has placed it. 
			if($t.a === $t.d[0]) {
				// For the top direction
				y.css({ 'width' : '100%', 'height' : $s+'px' });
			} else if($t.a === $t.d[1]) {
				// For the right direction
				y.css({ 'bottom' : '0',  'top' : 'auto', 'width' : '100%', 'height' : $s+'px' });
			} else if($t.a === $t.d[2]) {
				// For the bottom direction
				y.css({ 'height' : '100%', 'width' : $s+'px' });
			} else if($t.a === $t.d[3]) {
				// For the left direction
				y.css({ 'right' : '0',  'left' : 'auto', 'height' : '100%', 'width' : $s+'px' });
			} 
			
			if(this.options.animation === 'fold') {
				
				// First off, duplicate the content div
				$('.hidden-content .content').clone().appendTo($t.$element.find('.hidden-content'));
				
				y = this.$element.find('.hidden-content').find('.content');
				
				// Adjust the animation time
				$animTime = this.options.animationTime / 2;
				
				// Depending on the direction the user is using we have to alter the CSS accordingly.
				// This can be a bit messy but I've cleaned it up as much as possible.
				if($t.a === $t.d[0]) { 
					// For top direction
					$c = ($s/2)+'px 99999px 999999px 0px';
					
					x.css({
						'clip' : 'rect(0px 999999px '+($s/2)+'px 0px)',
						'transform-origin' : ($s/2)+'px '+($s/2)+'px'
					});
					
					y.css({
						'clip' : 'rect(0px 999999px '+($s/2)+'px 0px)'
					});
				}
				else if($t.a === $t.d[1]) { 
					// For bottom right direction
					$c = '0px 99999px '+($s/2)+'px 0px';				
					
					(xresize = function() {
					
						x.css({
							'clip' : 'rect('+($height - ($s/2))+'px 999999px '+$height+'px 0px)',
							'transform-origin' : ($height - ($s/2))+'px '+($height - ($s/2))+'px'
						});
					
					})();
			
					y.css({
						'clip' : 'rect('+($s/2)+'px 999999px 99999px 0px)'
					});
					
				}
				else if($t.a === $t.d[2]) { 
					// For left direction
					$c = '0px 99999px 99999px '+($s/2)+'px';
					
					x.css({
						'clip' : 'rect(0px '+($s/2)+'px 99999px 0px)',
						'transform-origin' : ($s/2)+'px '+($s/2)+'px'
					});
					
					y.css({
						'clip' : 'rect(0px '+($s/2)+'px 99999px 0px)'
					});
				}
				else if($t.a === $t.d[3]) {
					// For right direction
					$c = '0px '+($s/2)+'px 99999px 0px';
					
					(xresize = function() {
						x.css({
							'clip' : 'rect(0px '+$width+'px 999999px '+($width - ($s/2))+'px)',
							'transform-origin' : ($width - ($s/2))+'px '+($width - ($s/2))+'px'
						});
					})();
					
					y.css({
						'clip': 'rect(0px '+$s+'px 999999px '+($s/2)+'px)'
					});
					
				}
				
				
				// Clip the content according to $c and transform according to $r
				$('.hidden-content .content:last-of-type').css({
					'clip' : 'rect('+$c+')',
					'transform' : 'rotate'+$r+'(90deg)'
				});
				
				
			} 
			
			// For slide and fade it's much easier. 
			else if(this.options.animation === 'slide' || this.options.animation === 'fade') {
				
				// animTime is just the animation time
				$animTime = this.options.animationTime;	
			
				if($t.a === $t.d[0]) { 
					// For top direction
					x.css({
						'clip' : 'rect(0px 999999px '+$s+'px 0px)',
						'transform-origin' : $s+'px '+$s+'px'
					});
				
				}
				else if($t.a === $t.d[1]) { 
					// For bottom right direction			
					
					(xresize = function() {
					
						x.css({
							'clip' : 'rect('+($height - $s)+'px 999999px 999999px 0px)',
							'transform-origin' : ($height - $s)+'px '+($height - $s)+'px',
							'top' : 'auto',
						});
					
					})();
					
				}
				else if($t.a === $t.d[2]) { 
					// For left direction
					
					x.css({
						'clip' : 'rect(0px '+$s+'px 99999px 0px)',
						'transform-origin' : $s+'px '+$s+'px'
					});
	
				}
				else if($t.a === $t.d[3]) {
					// For right direction
					
					(xresize = function() {
						x.css({
							'clip' : 'rect(0px '+$width+'px 999999px '+($width - $s)+'px)',
							'transform-origin' : ($width - $s)+'px '+($width - $s)+'px',
							'left' : 'auto'
						});
					})();
					
				}

			}
			else if(this.options.animation === 'show') {
				
				// This shows the menu by default. This means you don't have to have the menu fade in effects
				// if you just want to use this plugin for single page websites with no frills. 
				x.hide();
				y.show();
				
			}
			
			if(xresize !== undefined) {
						
				$(window).resize(xresize);
			
				// Chrome for mobile problems. Also android.
				setInterval(function() {
					xresize();
				}, 700);
				
			}
			// The background for the image div
			x.css('background', 'url('+this.options.image+')');
			
			// Set up transitions for images and content divs
			
			// Image div
			x.css('transition', 'all '+($animTime)+'s ease-in'); 			
			
			// Content divs	
			y.css('transition', 'all '+($animTime/2)+'s linear, height 0s linear, width 0s linear');
				
			
		},
		
		
		scrolling: function() {
			
			var url = window.location.hash || '#'+$t.options.defaultPage;
				
			$(window).on('hashchange', function() {
				
				// Current page name
				url = window.location.hash;
				this.pageName = url+'-page';
						
				if($t.isScroll === false) {
					$(window).scrollTop($($t.pageName).offset().top + 1);
				}
				
			});
			
			setTimeout(function() {
				
				if(url !== '#'+$t.options.defaultPage) {
					
					// Show the menu!
					$t.$element.find('.hidden-content .content').eq(0).css({
						'display' : 'block',
						'clip' : 'auto',
					});

					
					$t.$element.find('.image').hide();
					
					// This is if blur is enabled. This will blur the main background image
					// It currently only works in webkit browsers.
					if($t.options.blur === true) {
						$t.$element.find('.background-image').css({
							'-webkit-filter' : 'blur(3px)'
						});
					}
				}
				
			}, 20);
			
			if($t.isScroll === false) {
			
				setTimeout(function() {
			
					$(window).scrollTop($($t.pageName).offset().top + 1);
			
				}, 200);
			
			}
			
			// Mobile devices have some issues running this code.
			if(screen.width > 800) {
				
				(scrollPos = function() {
						
				if($t.isScroll === false) {
					
					$(window).scrollTop($($t.pageName).offset().top + 1);
					
				}
					
				})();
		
				// Wo-ahhh 					
				$(window).scroll(scrollPos);
				$(window).resize(scrollPos);
				
			}
			
		},
		
		events: function() {
		
			// When the user clicks on the activate button the menu activates.
			// This will be different depending on direction and animation so
			// There are a few things we have to check.
			
			var isevent = ('ontouchend' in document.documentElement) ? 'touchend' : 'click';
				
			$(this.options.activate).on(isevent, function(e) {
				
				if($('.hidden-content .content').css('display') !== 'block' && $t.options.animation !== 'show') {

					// First off, show the content (it was hidden before)
					$('.hidden-content .content').show();
					
					// Some variables. The first is just for ease during selection,
					// the second is for if the user has enabled blur
					
					var x = $t.$element.find('.hidden-content'),
						$blurtime = ($t.options.animationTime/2)*1000;
						
					// First Animation: Fold
					// ---------------------
					if($t.options.animation === 'fold') {
						
						// Set the blur time to half of the animation time for this
						$blurtime = ($t.options.animationTime/2)*1000;
						
						var $add;
						// Why? There is a 300ms delay on android devices on click and this helps fix it
						// without importing some huge library to sniff around for a fake click event. This
						// may have to be removed in the future if the android engine updates, or altered
						// in some way.
						if(navigator.userAgent.toLowerCase().indexOf("android") > -1) $add = 300;
						
						else $add = 50; // Minor delay for non android devices to fix some animation issues
						
						// Rotate first
						x.find('.image').css({
							'transform' : 'rotate'+$r+'(90deg)'
						});
							
						setTimeout(function() {
							
							// Rotate fully and remove the box shadow
							x.find('.content:last-of-type').css({
								'transform' : 'rotate'+$r+'(0)'
							});	
							
						}, ($t.options.animationTime*1000/2) + $add);
						
						// At the end of the animation
						setTimeout(function() {
							
							// Hide the rotated pieces because they are clipped
							x.find('.content:last-of-type').hide();
							// And unclip the first content piece
							x.find('.content').eq(0).css({		
								'clip' : 'auto'
							});
											
						}, $t.options.animationTime*1000 + $add);
					
					}
					
					// Second Animation: Slide
					// ----------------------
					else if($t.options.animation === 'slide') {
						
						// A bit easier this time, blurtime starts instantly, then just
						// check for the directions and alter the position of the image
						// as needed.
						$blurtime = 0;
						
						// For the top direction
						if($t.a === $t.d[0]) { x.find('.image').css('top', '-500px') }
						// For the bottom direction
						else if($t.a === $t.d[1]) { x.find('.image').css('bottom', '-500px') }
						// For the left direction
						else if($t.a === $t.d[2]) { x.find('.image').css('left', '-500px') }
						// For the right direction
						else if($t.a === $t.d[3]) { x.find('.image').css('right', '-500px') }
						
						
					}
	
					// Third Animation: Blur 
					// ---------------------
					else if($t.options.animation === 'fade') {
						
						// The easiest animation of them all.
						$blurTime = 0;
						
						x.find('.image').css({
							'opacity' : '0'
						});
						
						setTimeout(function() {
							
							x.find('.image').css({
								'display' : 'none'
							});
							
						}, $t.options.animationTime*1000)
						
					}
					
					// This is if blur is enabled. This will blur the main background image
					// It currently only works in webkit browsers.
					if($t.options.blur === true) {
						setTimeout(function() {
							$t.$element.find('.background-image').css({
								'transition' : 'all 0.3s linear',
								'-webkit-filter' : 'blur(3px)'
							});
						}, $blurtime);
					}
				}
			});
			
			// Prevents scrolling on touch devices.
			$('body').on('touchmove', function(e) {
				e.preventDefault();
			});
			
			
			$(window).on('hashchange', function(e) {
				
				// Getting the name of the page
				var pagename = window.location.hash.substr(1),
					divname = '#'+pagename+'-page';
				
				if($(divname).length !== 0) {
					
					$t.pageName = divname;
					
					$t.$element.find('.hidden-content').css({'z-index' : '99999999'});
					
					if($t.isScroll === false) {
						
						// Scrolling is now true
						$t.isScroll = true;
						
						// Animate the scroll position. 
						$('html, body').animate({
						
							scrollTop : $(divname).offset().top 
						
						}, ($t.options.scrollTime*1000));
						
						// Separate timeout set as a callback in order to ensure the smoothness
						// of the scroll. Resets variables.
						setTimeout(function() {
													
							$t.isScroll = false;
					
							$t.$element.find('.hidden-content').css({'z-index' : '999'});
						
						}, ($t.options.scrollTime*1000));
				
						return false;
						
					} else {
					
						e.preventDefault();
					
					}
					
				}

			});
					
		}, 
		
		mobile: function() {
		
			// Set the version to the mobile direction
			if(screen.width < 800) {
			
				this.version = this.options.mobiledirection;
				this.options.size = this.options.size - this.options.mobileAdj;
			
			}
			
			$t.$element.children('div').on('touchstart', function(e) {
				e.stopPropagation();
			});
			
		},
		
		// If IE, because IE messes things up a little bit.
		iedetect: function(v) {

		    var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
			return r.test(navigator.userAgent);
			
		}
		
	}
	
	
	$.fn.fullPaged = function(options) {
		
		return this.each(function() {
			
			new $.fullPaged(options, this);
			
		});
		
	}
	
	
})(window, document, jQuery);