var main_window = jQuery(window);
var body = jQuery('body');

jQuery(document).on('ready', function() {
    "use strict";
	holy_word_init_actions();
});

main_window.on('load', function() {
    "use strict";
    var side_menu_wrap = jQuery('.side-menu-wrap');
    if(side_menu_wrap.length > 0){
        side_menu_wrap.mCustomScrollbar({
            scrollInertia:500
        });
    }
});

// Theme init actions
function holy_word_init_actions() {
	"use strict";

    holy_word_testimonials();
    holy_word_fullscreen_slider();
    holy_word_twitter();
    holy_word_sermons();
    holy_word_slide_items();

    holy_word_init_isotope();
	holy_word_ready_actions();
	holy_word_resize_actions();
	holy_word_scroll_actions();
    holy_word_init_tab_ui();

    // Resize handlers
    main_window.on('resize', function() {
		"use strict";
		holy_word_resize_actions();
	});

	// Scroll handlers
    main_window.on('scroll', function() {
		"use strict";
		holy_word_scroll_actions();
	});
}




// Theme first load actions
//==============================================
function holy_word_ready_actions() {
	"use strict";

     /*--------------------------------------------------------------
     // OPEN AND CLOSE SIDE MENU
     --------------------------------------------------------------*/

    // Open
    jQuery('.side-menu-button').on('click', function(e){
        "use strict";
        body.addClass('side-menu-open');
        e.preventDefault();
        return false;
    });
    // Close
    jQuery('.side-menu-open #side-menu, .side-menu-open .side-menu-close').live('click', function (e) {
        "use strict";
        var target = jQuery(e.target);
        if ( target.is('#side-menu') || target.is('.side-menu-close')) {
            body.removeClass('side-menu-open');
        }
    });


    /*--------------------------------------------------------------
     // MENU
     --------------------------------------------------------------*/

	// Clone main menu for responsive
    var menu_main = jQuery('ul#menu-main');
    var menu_main_mobil_button = jQuery('.menu-main-mobil-button');
    var menu_main_responsive = '';
    if (menu_main.length > 0) {
		var menu_responsive = menu_main.clone().removeAttr('id').removeClass('menu-main-nav').addClass('menu-main-responsive');
        menu_main.parent().parent().append(menu_responsive);
        menu_main_responsive = jQuery('.menu-main-responsive');
		holy_word_show_current_menu_item(menu_main_responsive, menu_main_mobil_button);
	}

	// Responsive menu button
    menu_main_mobil_button.on('click', function(e){
		"use strict";
        body.toggleClass('menu-mobil-opened');
		jQuery(this).toggleClass('opened');
		if (jQuery(this).hasClass('menu-main-mobil-button'))
            menu_main_responsive.slideToggle();
		e.preventDefault();
		return false;
	});

    // Add arrows in mobile menus
    jQuery('.menu-main-responsive .menu-item-has-children > a, .menu-main-nav-side .menu-item-has-children > a').prepend('<span class="open-children"></span>');


	// Submenu click handler for the responsive menu
	jQuery('.menu-main-responsive, .menu-main-nav-side').on('click', 'li a, li a .open-children', function(e) {
		"use strict";
        var $a = jQuery(this).hasClass('open-children') ? jQuery(this).parent() : jQuery(this);
        if ($a.parent().hasClass('menu-item-has-children')) {
            if ($a.attr('href')==='#' || jQuery(this).hasClass('open-children')) {
                if ($a.siblings('ul:visible').length > 0)
                    $a.siblings('ul').slideUp().parent().removeClass('opened');
                else {
                    jQuery(this).parents('li').siblings('li').find('ul:visible').slideUp().parent().removeClass('opened');
                    $a.siblings('ul').slideDown().parent().addClass('opened');
                }
            }
        }
        if (jQuery(this).hasClass('open-children') || $a.attr('href')==='#') {
            e.preventDefault();
            return false;
        }
	});

	// Init superfish menus
	holy_word_init_sfmenu('ul#menu-main');

	// Store height of the top panel
	HOLYWORD_STORAGE['top_panel_height'] = 0;



     /*--------------------------------------------------------------
     // SEARCH FORM
     --------------------------------------------------------------*/

    if (jQuery('.search-button:not(.joint)').length > 0) {
        // Click "Search submit"
        var search_form_wrap_fixed = jQuery('#search-form-wrap-fixed');
        body.find('.search-button').on('click', function(e) {
            "use strict";
            search_form_wrap_fixed.fadeIn();
            body.addClass('search-fixed');
            jQuery('#search-form-wrap-fixed .search-field').focus();
            e.preventDefault();
            return false;
        });
        // Click "Close search results"
        body.find('.search-close').on('click', function(e) {
            "use strict";
            search_form_wrap_fixed.fadeOut();
            body.removeClass('search-fixed');
            e.preventDefault();
            return false;
        });
    }


     /*--------------------------------------------------------------
     // SOCIALS
     --------------------------------------------------------------*/

	if (jQuery('.socials-button:not(.joint)').length > 0) {
		// Click "socials submit"
        var socials_wrap_fixed = jQuery('#socials-wrap-fixed');
        body.find('.socials-button').on('click', function(e) {
			"use strict";
            socials_wrap_fixed.fadeIn();
            body.addClass('socials-fixed');
			e.preventDefault();
			return false;
		});
		// Click "Close socials results"
        body.find('.socials-close').on('click', function(e) {
			"use strict";
            socials_wrap_fixed.fadeOut();
            body.removeClass('socials-fixed');
			e.preventDefault();
			return false;
		});
	}



     /*--------------------------------------------------------------
     // WIDGETS DECORATION
     --------------------------------------------------------------*/

	// Decorate nested lists in widgets
	jQuery('.widget ul > li').each(function() {
		"use strict";
		if (jQuery(this).find('ul').length > 0) {
			jQuery(this).addClass('has-children');
		}
	});

	// Archive widget decoration
	jQuery('.widget_archive a').each(function() {
		"use strict";
		var val = jQuery(this).html().split(' ');
		if (val.length > 1) {
			val[val.length-1] = '<span>' + val[val.length-1] + '</span>';
			jQuery(this).html(val.join(' '))
		}
	});

	// Calendar widget decoration
	jQuery('.widget_calendar #prev a').each(function() {
		"use strict";
		var val = jQuery(this).html().split(' ');
		if (val.length > 1) {
			val[0] = '<span class="icon-arrow-left"></span>';
			jQuery(this).html(val.join(''))
		}
	});
	jQuery('.widget_calendar #next a').each(function() {
		"use strict";
		var val = jQuery(this).html().split(' ');
		if (val.length > 1) {
			val[val.length-1] = '<span class="icon-arrow-right"></span>';
			jQuery(this).html(val.join(''))
		}
	});



     /*--------------------------------------------------------------
     // FORMS VALIDATION
     --------------------------------------------------------------*/

	jQuery("#wrapper select").wrap('<div class="select_container"></div>');
	// Comment form
    jQuery("form#commentform").on( "submit", function(e) {
		"use strict";
		var rezult = holy_word_comments_validate(jQuery(this));
		if (!rezult)
			e.preventDefault();
		return rezult;
	});


     /*--------------------------------------------------------------
     // Socials share
     --------------------------------------------------------------*/

    var socials_drop = jQuery('.socials-drop .share-links:not(.joint)');
	if (socials_drop.length > 0) {
        socials_drop.each(function() {
			jQuery(this).addClass('joint').on('click', function(e) {
				"use strict";
                jQuery(this).parent().toggleClass('clicked');
				jQuery(this).siblings('.social-items').fadeToggle(300, function() {});
				e.preventDefault();
				return false;
			});
		});
	}

    var socials_drop_line = jQuery('.socials-drop-line .share-links:not(.joint)');
    if (socials_drop_line.length > 0) {
        socials_drop_line.each(function() {
            jQuery(this).addClass('joint').on('click', function(e) {
                "use strict";
                jQuery(this).parent().toggleClass('clicked');
                e.preventDefault();
                return false;
            });
        });
    }



     /*--------------------------------------------------------------
     // Other settings
     --------------------------------------------------------------*/

	// Scroll to top button
	jQuery('.to-top').on('click', function(e) {
		"use strict";
		jQuery('html,body').animate({
			scrollTop: 0
		}, 'slow');
		e.preventDefault();
		return false;
	});

	// Init post format specific scripts
	holy_word_init_post_formats();



     /*--------------------------------------------------------------
     // Countdown
     --------------------------------------------------------------*/

    var mt_countdown_timer = jQuery('.mt-countdown-timer:not(.joint)');
    if (mt_countdown_timer.length > 0) {
        mt_countdown_timer.each(function () {
                "use strict";
                jQuery(this).addClass('joint');
                var id = jQuery(this).attr('id');
                var curDate = new Date();
                var curDateTimeStr = curDate.getFullYear()+'-'+(curDate.getMonth()<9 ? '0' : '')+(curDate.getMonth()+1)+'-'+(curDate.getDate()<10 ? '0' : '')+curDate.getDate()
                    +' '+(curDate.getHours()<10 ? '0' : '')+curDate.getHours()+':'+(curDate.getMinutes()<10 ? '0' : '')+curDate.getMinutes()+':'+(curDate.getSeconds()<10 ? '0' : '')+curDate.getSeconds();
                var interval = 1;
                var endDateStr = jQuery(this).data('date');
                var endDateParts = endDateStr.split('-');
                var endTimeStr = jQuery(this).data('time');
                var endTimeParts = endTimeStr.split(':');
                if (endTimeParts.length < 3) endTimeParts[2] = '00';
                var endDateTimeStr = endDateStr+' '+endTimeStr;
                var countdown_this = jQuery(this).find('.mt-countdown-original');
                if (curDateTimeStr < endDateTimeStr) {
                    countdown_this.countdown({
                        until: new Date(endDateParts[0], endDateParts[1]-1, endDateParts[2], endTimeParts[0], endTimeParts[1], endTimeParts[2]),
                        tickInterval: interval,
                        onTick: holy_word_countdown
                    });
                } else {
                    countdown_this.countdown({
                        since: new Date(endDateParts[0], endDateParts[1]-1, endDateParts[2], endTimeParts[0], endTimeParts[1], endTimeParts[2]),
                        tickInterval: interval,
                        onTick: holy_word_countdown
                    });
                }
        });
    }

    // Countdown update
    function holy_word_countdown(dt) {
        "use strict";
        var counter = jQuery(this).parent();
        for (var i=3; i<dt.length; i++) {
            var v = (dt[i]<10 ? '0' : '') + dt[i];
            counter.find('.mt-countdown-item').eq(i-3).find('.mt-countdown-digits span').addClass('hide');
            for (var ch=v.length-1; ch>=0; ch--) {
                counter.find('.mt-countdown-item').eq(i-3).find('.mt-countdown-digits span').eq(ch+(i===3 && v.length<3 ? 1 : 0)).removeClass('hide').text(v.substr(ch, 1));
            }
        }
    }

    // Form
    var wpcf7 = body.find('.wpcf7:not(.joint) form');
    if (wpcf7.length > 0) {
        wpcf7.each(function() {
            "use strict";
            jQuery(this).addClass('joint');
            jQuery(this).on( "submit", function(e) {
                "use strict";
                holy_word_form_validate(jQuery(this));
                e.preventDefault();
                return false;
            });
        });
    }

} //end ready



/*--------------------------------------------------------------
// Scroll actions
--------------------------------------------------------------*/

// Do actions when page scrolled
function holy_word_scroll_actions() {
	"use strict";

	var scroll_offset = main_window.scrollTop();
	var scroll_to_top_button = jQuery('.to-top');
	var adminbar_height = Math.max(0, jQuery('#wpadminbar').height());

	if (HOLYWORD_STORAGE['top_panel_height'] === 0)	HOLYWORD_STORAGE['top_panel_height'] = jQuery('.top-panel').height();

	// Scroll to top button show/hide
	if (scroll_offset > HOLYWORD_STORAGE['top_panel_height'])
		scroll_to_top_button.addClass('show');
	else
		scroll_to_top_button.removeClass('show');


    // Sticky top panel
    jQuery('.top-panel-sticky-wrap').height(HOLYWORD_STORAGE['top_panel_height']);

    var body_this = jQuery('body');
    if (!body_this.hasClass('menu_mode_responsive') && !body_this.hasClass('menu-side')) {
        if (scroll_offset <= 0) {
            if (body_this.hasClass('top-panel-sticky')) {
                body_this.removeClass('top-panel-sticky');
            }
        } else if (scroll_offset > 0) {
            if (!body_this.hasClass('top-panel-sticky')) {
                body_this.addClass('top-panel-sticky');
            }
        }
        // Show main menu
        if (!jQuery('#header').hasClass('menu-ready')) {
            setTimeout(function(){ jQuery('#header').addClass('menu-ready'); },1000);
        }
    }
}


/*--------------------------------------------------------------
// Resize actions
--------------------------------------------------------------*/

// Do actions when page scrolled
function holy_word_resize_actions() {
	"use strict";
	holy_word_responsive_menu();
	holy_word_video_dimensions();
    holy_word_audio_elements(body);
    setEqualHeight(jQuery('.mt-events .equal-height'));
    setEqualHeight(jQuery('.mt-about .equal-height'));
}


// Check size and do responsive menu
function holy_word_responsive_menu() {
	"use strict";
	// Check responsive mode
	if (HOLYWORD_STORAGE['menu_mode_responsive_width'] > 0) {
        var body_this = jQuery('body');
		if (holy_word_is_responsive_need(HOLYWORD_STORAGE['menu_mode_responsive_width'])) {
			if (!body_this.hasClass('menu_mode_responsive')) {
                body_this.removeClass('top-panel-sticky').addClass('menu_mode_responsive');
				if (body_this.hasClass('menu_mode_relayout'))
                    body_this.removeClass('menu_mode_relayout');

                var ul_menu_main_nav = jQuery('ul.menu-main-nav');
				if (ul_menu_main_nav.hasClass('joint')) {
                    ul_menu_main_nav.removeClass('joint').superfish('destroy');
				}
                setTimeout(function(){ body_this.addClass('menu-ready'); },300);
			}
		} else {
			if (body_this.hasClass('menu_mode_responsive')) {
                body_this.removeClass('menu_mode_responsive');
				jQuery('.menu-main-responsive').hide();
				holy_word_init_sfmenu('ul.menu-main');
				jQuery('.menu-main-area').show();
                body_this.removeClass('menu-mobil-opened');
			}
		}
	}
}


// Check if responsive menu need
function holy_word_is_responsive_need(max_width) {
	"use strict";
	var rez = false;
	if (max_width > 0) {
		var w = window.innerWidth;
		if (w === undefined) {
            var go_size = jQuery(window);
			w = go_size.width()+(go_size.height() < jQuery(document).height() || go_size.scrollTop() > 0 ? 16 : 0);
		}
		rez = max_width > w;
	}
	return rez;
}


// Fit video frames to document width
function holy_word_video_dimensions() {
	jQuery('video').each(function() {
		"use strict";
		var video = jQuery(this).eq(0);
		var ratio = (video.data('ratio')!=undefined ? video.data('ratio').split(':') : [16,9]);
		ratio = ratio.length!=2 || ratio[0]===0 || ratio[1]===0 ? 16/9 : ratio[0]/ratio[1];
		var mejs_cont = video.parents('.mejs-video');
		var w_attr = video.data('width');
		var h_attr = video.data('height');
		if (!w_attr || !h_attr) {
			w_attr = video.attr('width');
			h_attr = video.attr('height');
			if (!w_attr || !h_attr) return;
			video.data({'width': w_attr, 'height': h_attr});
		}
		var percent = (''+w_attr).substr(-1)==='%';
		w_attr = parseInt(w_attr, 16);
		h_attr = parseInt(h_attr, 16);
		var w_real = Math.round(mejs_cont.length > 0 ? Math.min(percent ? 10000 : w_attr, mejs_cont.parents('div,article').width()) : video.width()),
			h_real = Math.round(percent ? w_real/ratio : w_real/w_attr*h_attr);
		if (parseInt(video.attr('data-last-width'),16)===w_real) return;
		if (mejs_cont.length > 0 && mejs) {
			holy_word_set_mejs_player_dimensions(video, w_real, h_real);
		}
		if (percent) {
			video.height(h_real);
		} else {
			video.attr({'width': w_real, 'height': h_real}).css({'width': w_real+'px', 'height': h_real+'px'});
		}
		video.attr('data-last-width', w_real);
	});
	jQuery('.post-featured iframe').each(function() {
		"use strict";
		var iframe = jQuery(this).eq(0);
		if (iframe.attr('src').indexOf('soundcloud')>0) return;
		var ratio = (iframe.data('ratio')!=undefined ? iframe.data('ratio').split(':') : (iframe.find('[data-ratio]').length>0 ? iframe.find('[data-ratio]').data('ratio').split(':') : [16,9]));
		ratio = ratio.length!=2 || ratio[0]===0 || ratio[1]===0 ? 16/9 : ratio[0]/ratio[1];
		var w_attr = iframe.attr('width');
		var h_attr = iframe.attr('height');
		if (!w_attr || !h_attr) {
			return;
		}
		var percent = (''+w_attr).substr(-1)==='%';
		w_attr = parseInt(w_attr, 16);
		h_attr = parseInt(h_attr, 16);
		var w_real = iframe.parent().width(),
			h_real = Math.round(percent ? w_real/ratio : w_real/w_attr*h_attr);
		if (parseInt(iframe.attr('data-last-width'),16)===w_real) return;
		iframe.css({'width': w_real+'px', 'height': h_real+'px'});
		iframe.attr('data-last-width', w_real);
	});
}


// Set Media Elements player dimensions
function holy_word_set_mejs_player_dimensions(video, w, h) {
	"use strict";
	if (mejs) {
		for (var pl in mejs.players) {
			if (mejs.players[pl].media.src === video.attr('src')) {
				if (mejs.players[pl].media.setVideoSize) {
					mejs.players[pl].media.setVideoSize(w, h);
				}
				mejs.players[pl].setPlayerSize(w, h);
				mejs.players[pl].setControlsSize();
			}
		}
	}
}


// Audio Elements
function holy_word_audio_elements(cont) {
    if (cont.find('audio').length > 0) {
        var audio_mejs = window.mejs;
        if (audio_mejs) {
            audio_mejs.MepDefaults.enableAutosize = false;
            audio_mejs.MediaElementDefaults.enableAutosize = false;
            cont.find('audio').each(function() {
                if (jQuery(this).parents('.mejs-mediaelement').length === 0) {
                    var media_tag = jQuery(this);
                    var settings = {
                        enableAutosize: true,
                        videoWidth: -1,
                        videoHeight: -1,
                        audioWidth: '100%',
                        audioHeight: 30,
                        success: function(mejs) {
                            var autoplay, loop;
                            if ( 'flash' === mejs.pluginType ) {
                                autoplay = mejs.attributes.autoplay && 'false' !== mejs.attributes.autoplay;
                                loop = mejs.attributes.loop && 'false' !== mejs.attributes.loop;
                                autoplay && mejs.addEventListener( 'canplay', function () {
                                    mejs.play();
                                }, false );
                                loop && mejs.addEventListener( 'ended', function () {
                                    mejs.play();
                                }, false );
                            }
                        }
                    };
                    jQuery(this).mediaelementplayer(settings);
                }
            });
        } else
            setTimeout(function() { holy_word_audio_elements(cont); }, 400);
    }
}



/*--------------------------------------------------------------
// Navigation
--------------------------------------------------------------*/

// Init Superfish menu
function holy_word_init_sfmenu(selector) {
	"use strict";
	jQuery(selector).show().each(function() {
		"use strict";
		if (holy_word_is_responsive_need() && (jQuery(this).attr('id')==='menu-main' || jQuery(this).attr('id')==='menu_side')) return;
		jQuery(this).addClass('joint').superfish({
			delay: 500,
			animation: {
				opacity: 'show'
			},
			animationOut: {
				opacity: 'hide'
			},
			speed: 		200,
			speedOut:	200,
			autoArrows: false,
			dropShadows: false,
			onBeforeShow: function(ul) {
				"use strict";
				if (jQuery(this).parents("ul").length > 1){
					var w = jQuery(window).width();
					var par_offset = jQuery(this).parents("ul").offset().left;
					var par_width  = jQuery(this).parents("ul").outerWidth();
					var ul_width   = jQuery(this).outerWidth();
					if (par_offset+par_width+ul_width > w-20 && par_offset-ul_width > 0)
						jQuery(this).addClass('submenu_left');
					else
						jQuery(this).removeClass('submenu_left');
				}
			},
			onBeforeHide: function(ul) {
				"use strict";
			}
		});
	});
}


// Show current page title on the responsive menu button
function holy_word_show_current_menu_item(menu, button) {
	"use strict";
	var text = '';
	menu.find('a').each(function () {
		"use strict";
		if (text) return;
		var menu_link = jQuery(this);
		if (menu_link.text() === "") {
			return;
		}
		if (menu_link.attr('href') === window.location.href)
			text = menu_link.text();
	});
	button.html("<span>" + (text ? text : button.data('title')) + "</span>");
}




/*--------------------------------------------------------------
// Post formats init
--------------------------------------------------------------*/


function holy_word_init_post_formats() {
	"use strict";
	// Popup init
	if (HOLYWORD_STORAGE['popup_engine']==='magnific') {
        jQuery("a[href$='jpg'],a[href$='jpeg'],a[href$='png'],a[href$='gif']").attr('data-rel', 'magnific');
        var images = jQuery("a[data-rel*='magnific']:not(.social-icons):not(.joint):not(.prettyphoto):not([data-rel*='pretty']):not([data-rel*='pretty'])").addClass('joint');
        try {
            images.magnificPopup({
                type: 'image',
                mainClass: 'mfp-img-mobile',
                closeOnContentClick: true,
                closeBtnInside: true,
                fixedContentPos: true,
                midClick: true,
                preloader: true,
                tLoading: HOLYWORD_STORAGE['strings']['magnific_loading'],
                gallery: {enabled: true},
                image: {tError: HOLYWORD_STORAGE['strings']['magnific_error'], verticalFit: true, titleSrc: false }
            });
        } catch (e) {
        }
	}

}

// Contact form
function holy_word_form_validate(form){
    "use strict";

    var url = form.attr('action');
    if (url === '') return false;
    form.find('input').removeClass('error-fields-class');

    var error = holy_word_comments_validate_form(form, {
        error_message_text: HOLYWORD_STORAGE['strings']['error_global'],// Global error message text (if don't write in checked field)
        error_message_show: true,									// Display or not error message
        error_message_time: 6000,									// Error message display time
        error_message_class: 'mt-info-box mt-info-box-error',	    // Class appended to error message block
        error_fields_class: 'error-fields-class',					// Class appended to error fields
        exit_after_first_error: false,								// Cancel validation and exit after first error
        rules: [
            { field: 'name', min_length: { value: 1, message: HOLYWORD_STORAGE['strings']['name_empty']}, max_length: { value: 60, message: HOLYWORD_STORAGE['strings']['name_long']}},
            { field: 'email', min_length: { value: 7, message: HOLYWORD_STORAGE['strings']['email_empty']}, max_length: { value: 60, message: HOLYWORD_STORAGE['strings']['email_long']}, mask: { value: HOLYWORD_STORAGE['email_mask'], message: HOLYWORD_STORAGE['strings']['email_not_valid']}},
            { field: 'message', min_length: { value: 1, message: HOLYWORD_STORAGE['strings']['text_empty'] }, max_length: { value: 1000, message: HOLYWORD_STORAGE['strings']['text_long']}}
        ]
    });

    if (!error && url!='#') {
        jQuery.post(url, {
            action: "send_form",
            nonce: HOLYWORD_STORAGE['ajax_nonce'],
            data: form.serialize()
        }).done(function(response) {
            "use strict";
            var rez = {};
            try {
                rez = JSON.parse(response);
            } catch (e) {
                rez = { error: HOLYWORD_STORAGE['ajax_error'] };
            }
            var result = form.find(".result").toggleClass("mt-info-box-error", false).toggleClass("mt-info-box-success", false);
            if (rez.error === '') {
                form.get(0).reset();
                result.addClass("mt-info-box-success").html(HOLYWORD_STORAGE['strings']['send_complete']);
            } else {
                result.addClass("mt-info-box-error").html(HOLYWORD_STORAGE['strings']['send_error'] + ' ' + rez.error);
            }
            result.fadeIn().delay(3000).fadeOut();
        });
    }
    return !error;
}

// Comments form validate
function holy_word_comments_validate(form) {
	"use strict";
	form.find('input').removeClass('error-fields-class');
	var error = holy_word_comments_validate_form(form, {
		error_message_text: HOLYWORD_STORAGE['strings']['error_global'],// Global error message text (if don't write in checked field)
		error_message_show: true,									// Display or not error message
		error_message_time: 6000,									// Error message display time
		error_message_class: 'mt-info-box mt-info-box-error',	    // Class appended to error message block
		error_fields_class: 'error-fields-class',					// Class appended to error fields
		exit_after_first_error: false,								// Cancel validation and exit after first error
		rules: [
			{ field: 'author', min_length: { value: 1, message: HOLYWORD_STORAGE['strings']['name_empty']}, max_length: { value: 60, message: HOLYWORD_STORAGE['strings']['name_long']}},
			{ field: 'email', min_length: { value: 7, message: HOLYWORD_STORAGE['strings']['email_empty']}, max_length: { value: 60, message: HOLYWORD_STORAGE['strings']['email_long']}, mask: { value: HOLYWORD_STORAGE['email_mask'], message: HOLYWORD_STORAGE['strings']['email_not_valid']}},
			{ field: 'comment', min_length: { value: 1, message: HOLYWORD_STORAGE['strings']['text_empty'] }, max_length: { value: 1000, message: HOLYWORD_STORAGE['strings']['text_long']}}
        ]
	});
	return !error;
}

function holy_word_comments_validate_form(form, opt) {
    "use strict";
    var error_msg = '';
    form.find(":input").each(function() {
        "use strict";
        if (error_msg!='' && opt.exit_after_first_error) return;
        for (var i = 0; i < opt.rules.length; i++) {
            if (jQuery(this).attr("name") === opt.rules[i].field) {
                var val = jQuery(this).val();
                var error = false;
                if (typeof(opt.rules[i].min_length) === 'object') {
                    if (opt.rules[i].min_length.value > 0 && val.length < opt.rules[i].min_length.value) {
                        if (error_msg==='') jQuery(this).get(0).focus();
                        error_msg += '<span class="error">' + (typeof(opt.rules[i].min_length.message)!='undefined' ? opt.rules[i].min_length.message : opt.error_message_text ) + '</span>';
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].max_length) === 'object') {
                    if (opt.rules[i].max_length.value > 0 && val.length > opt.rules[i].max_length.value) {
                        if (error_msg==='') jQuery(this).get(0).focus();
                        error_msg += '<span class="error">' + (typeof(opt.rules[i].max_length.message)!='undefined' ? opt.rules[i].max_length.message : opt.error_message_text ) + '</span>';
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].mask) === 'object') {
                    if (opt.rules[i].mask.value != '') {
                        var regexp = new RegExp(opt.rules[i].mask.value);
                        if (!regexp.test(val)) {
                            if (error_msg==='') jQuery(this).get(0).focus();
                            error_msg += '<span class="error">' + (typeof(opt.rules[i].mask.message)!='undefined' ? opt.rules[i].mask.message : opt.error_message_text ) + '</span>';
                            error = true;
                        }
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].equal_to) === 'object') {
                    if (opt.rules[i].equal_to.value != '' && val!=jQuery(jQuery(this).get(0).form[opt.rules[i].equal_to.value]).val()) {
                        if (error_msg==='') jQuery(this).get(0).focus();
                        error_msg += '<span class="error">' + (typeof(opt.rules[i].equal_to.message)!='undefined' ? opt.rules[i].equal_to.message : opt.error_message_text ) + '</span>';
                        error = true;
                    }
                }
                if (opt.error_fields_class != '') jQuery(this).toggleClass(opt.error_fields_class, error);
            }
        }
    });
    if (error_msg!='' && opt.error_message_show) {
        var error_message_box = form.find(".result");
        if (error_message_box.length === 0) error_message_box = form.parent().find(".result");
        if (error_message_box.length === 0) {
            form.append('<div class="result"></div>');
            error_message_box = form.find(".result");
        }
        if (opt.error_message_class) error_message_box.toggleClass(opt.error_message_class, true);
        error_message_box.html(error_msg).fadeIn();
        setTimeout(function() { error_message_box.fadeOut(); }, opt.error_message_time);
    }
    return error_msg!='';
}


/*--------------------------------------------------------------
// Gallery
--------------------------------------------------------------*/

function holy_word_check_images_complete(cont) {
    var complete = true;
    cont.find('img').each(function() {
        if (!complete) return;
        if (!jQuery(this).get(0).complete) complete = false;
    });
    return complete;
}

function holy_word_init_isotope() {
    "use strict";

    var isotope_wrap = jQuery('.isotope-wrap:not(.joint)');

    if (isotope_wrap.length > 0) {
        var all_images_complete = true;
        // Check if all images in isotope wrapper are loaded
        isotope_wrap.each(function () {
            "use strict";
            all_images_complete = all_images_complete && holy_word_check_images_complete(jQuery(this));
        });
        // Wait for images loading
        if (!all_images_complete) { setTimeout(holy_word_init_isotope, 200); return; }
        // Isotope filters handler
        jQuery('.isotope-filters:not(.joint)').addClass('joint').on('click', 'a', function (e) {
            "use strict";
            jQuery(this).parents('.isotope-filters').find('a').removeClass('active');
            jQuery(this).addClass('active');
            var selector = jQuery(this).data('filter');
            jQuery(this).parents('.isotope-filters').siblings('.isotope-wrap').eq(0).isotope({
                filter: selector
            });
            e.preventDefault();
            return false;
        });
        // Init isotope script
        isotope_wrap.each(function () {
            "use strict";
            var isotope_container = jQuery(this);
            // Init isotope with timeout
            setTimeout(function () {
                isotope_container.addClass('joint').isotope({
                    itemSelector: '.isotope-item',
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                // Show elements
                isotope_container.find('.isotope-item').animate({opacity: 1}, 200, function () {
                    jQuery(this).addClass('show-item');
                });
            }, 500);
        });
    }
}


// Tabs
function holy_word_init_tab_ui() {
    "use strict";
    var mt_tabs = jQuery('.mt-tabs.no_jquery_ui:not(.joint)');
    if (mt_tabs.length > 0) {
        mt_tabs.each(function () {
            "use strict";
            var init = jQuery(this).data('active');
            if (isNaN(init)) init = 0;
            else init = Math.max(0, init);

            jQuery(this)
                .addClass('joint')
                .on('click', '.mt-tabs-titles li a', function(e) {
                    "use strict";
                    if (!jQuery(this).parent().hasClass('mt-tabs-active')) {
                        var id_act = jQuery(this).parent().siblings('.mt-tabs-active').find('a').attr('href');
                        var id = jQuery(this).attr('href');
                        jQuery(this).parent().addClass('mt-tabs-active').siblings().removeClass('mt-tabs-active');
                        jQuery(id_act).fadeOut(function() {
                            "use strict";
                            jQuery(id).fadeIn(function() {
                                "use strict";
                            });
                        });
                    }
                    e.preventDefault();
                    return false;
                });
            jQuery(this).find('.mt-tabs-titles li').eq(0).addClass('mt-tabs-active');
            jQuery(this).find('.mt-tabs-content').eq(0).fadeIn(function() { });

        });
    }
}

// Equal Height
function setEqualHeight(columns) {

    var tallestcolumn = 0;
    if(main_window.width() > 767) {
        columns.each(
            function () {
                jQuery(this).height('100%');
                currentHeight = jQuery(this).height();
                if (currentHeight > tallestcolumn) {
                    tallestcolumn = currentHeight;
                }
            }
        );
        columns.height(tallestcolumn);
    }
        columns.addClass('height-ok');

}




/*--------------------------------------------------------------
// Testimonials
--------------------------------------------------------------*/
function holy_word_testimonials() {
    "use strict";
    var testimonials_init = jQuery('.testimonials-init:not(.joint)');
    if (testimonials_init.length > 0) {
        testimonials_init.each(function () {
            "use strict";
            var id = jQuery(this).attr('id');
            if (id === undefined) {
                id = 'testimonials-'+Math.random();
                id = id.replace('.', '');
                jQuery(this).attr('id', id);
            }
            jQuery(this).parent('.fw-testimonials').addClass(id);
            jQuery('#'+id).addClass('joint').carouFredSel({
                swipe: {
                    onTouch: true,
                    options: { // A map of the configuration used for the touchSwipe-plugin.
                        threshold: 10 // block number shift - option for
                    }
                },
                next: jQuery('.'+id+' .fw-testimonials-arrows .next'),
                prev: jQuery('.'+id+' .fw-testimonials-arrows .prev'),
                pagination: jQuery('.'+id+' .fw-testimonials-pagination'),
                responsive: true,
                infinite: true,
                items: 1,
                auto: false,
                scroll: {
                    items: 1,
                    fx: 'cover-fade', // fade // crossfade // cover-fade // uncover-fade //'scroll' NEW: 'directscroll', 'cover', 'uncover'
                    duration: 800
                }
            });
        });
    }
}

/*--------------------------------------------------------------
// Fullscreen Slider
--------------------------------------------------------------*/

function holy_word_fullscreen_slider() {
    "use strict";
    var mt_slider = jQuery('.mt-slider .mt-slider-item.wrap-all-slides:not(.joint)');
    if (mt_slider.length > 0) {
        mt_slider.each(function () {
        "use strict";

            var id = jQuery(this).attr('id');
            if (id === undefined) {
                id = 'slider-'+Math.random();
                id = id.replace('.', '');
                jQuery(this).attr('id', id);
            }
            jQuery(this).parent('.mt-slider').addClass(id);

            jQuery('#'+id).addClass('joint').swipe({
                swipeRight:function(event, direction) {
                    jQuery('#'+id).data('superslides').animate('prev');
                },
                swipeLeft:function(event, direction) {
                    jQuery('#'+id).data('superslides').animate('next');
                },
                threshold: 10
            });

            jQuery.fn.superslides.fx = jQuery.extend({
                flip: function(orientation, complete) {
                    complete();
                }
            }, jQuery.fn.superslides.fx);

            if(jQuery(this).parents('.mt-slider').hasClass('width-height')){
                jQuery('#'+id).superslides({
                    animation: 'fade',
                    inherit_width_from: jQuery('.'+id),
                    inherit_height_from: jQuery('.'+id+'.width-height')
                });
            }
            else {
                jQuery('#' + id).superslides({
                    animation: 'fade',
                    inherit_width_from: jQuery('.' + id)
                });
            }
        });
    }
}


/*--------------------------------------------------------------
// Twitter
--------------------------------------------------------------*/
function holy_word_twitter() {
    "use strict";
    var mt_twitter_list = jQuery('.mt-twitter-list:not(.joint)');
    if (mt_twitter_list.length > 0) {
        mt_twitter_list.each(function () {
            "use strict";
            var id = jQuery(this).attr('id');
            if (id === undefined) {
                id = 'mt-twitter-'+Math.random();
                id = id.replace('.', '');
                jQuery(this).attr('id', id);
            }
            jQuery(this).parent('.mt-twitter').addClass(id);

            jQuery('#'+id).addClass('joint').carouFredSel({
                swipe: {
                    onTouch: true,
                    options: { // A map of the configuration used for the touchSwipe-plugin.
                        threshold: 10 // block number shift - option for
                    }
                    //onMouse : true
                },
                pagination: jQuery('.'+id+' .mt-twitter-pagination'),
                responsive: true,
                infinite: false,
                items: 1,
                auto: false,
                scroll: {
                    items : 1,
                    fx: 'directscroll',
                    duration: 600,
                    pauseOnHover : true
                }
            });
        });
    }
}


/*--------------------------------------------------------------
// Slide Sermons
--------------------------------------------------------------*/
function holy_word_sermons() {
    "use strict";
    var mt_sermons_item_list = jQuery('.mt-sermons-item-list:not(.joint)');
    if (mt_sermons_item_list.length > 0) {
        mt_sermons_item_list.each(function () {
            "use strict";
            var id = jQuery(this).attr('id');
            if (id === undefined) {
                id = 'mt-sermons-'+Math.random();
                id = id.replace('.', '');
                jQuery(this).attr('id', id);
            }
            jQuery(this).parent('.mt-sermons').addClass(id);

            jQuery('#'+id).addClass('joint').carouFredSel({
                swipe: {
                    onTouch: true,
                    options: { // A map of the configuration used for the touchSwipe-plugin.
                        threshold: 10 // block number shift - option for
                    }
                    //onMouse : true
                },
                next: jQuery('.'+id+' .mt-sermons-arrows .next'),
                prev: jQuery('.'+id+' .mt-sermons-arrows .prev'),
                pagination: jQuery('.'+id+' .mt-sermons-pagination'),
                responsive: true,
                infinite: false,
                items: 1,
                auto: false,
                scroll: {
                    items: 1,
                    fx: jQuery(this).parents('.mt-sermons').hasClass('style-default') ? "directscroll" : "cover-fade",
                    duration: 600
                }
            });
        });
    }
}


/*--------------------------------------------------------------
// Slide Items
--------------------------------------------------------------*/
function holy_word_slide_items() {
    "use strict";
    var mt_slide_item_list = jQuery('.mt-slide-item-list:not(.joint)');
    if (mt_slide_item_list.length > 0) {
        mt_slide_item_list.each(function () {
            "use strict";
            var id = jQuery(this).attr('id');
            if (id === undefined) {
                id = 'mt-slide-'+Math.random();
                id = id.replace('.', '');
                jQuery(this).attr('id', id);
            }
            jQuery(this).parent('.mt-slide').addClass(id);

            jQuery('#'+id).addClass('joint').carouFredSel({
                swipe: {
                    onTouch: true,
                    options : { // A map of the configuration used for the touchSwipe-plugin.
                        threshold: 10 // block number shift - option for
                    }
                },
                next: jQuery('.'+id+' .mt-slide-arrows .next'),
                prev: jQuery('.'+id+' .mt-slide-arrows .prev'),
                responsive: true,
                infinite: false,
                items: 1,
                auto: false,
                scroll: {
                    items : 1,
                    fx: 'crossfade',
                    easing: 'linear',
                    duration: 500
                }
            });
        });
    }
}