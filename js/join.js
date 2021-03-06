// Reserve call
(function(){ "use strict";
    // Global variables storage
    if (typeof HOLYWORD_STORAGE == 'undefined') window.HOLYWORD_STORAGE = {};
})();

var HOLYWORD_STORAGE = {
    "ajax_url":"http:\/\/holy-word.my\/wp-admin\/admin-ajax.php",
    "ajax_nonce":"2ffdc10fe5",
    "menu_mode_responsive_width":"960",
    "popup_engine":"magnific",
    "email_mask":"^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$",
    "strings":{
        "ajax_error":"Invalid server answer!",
        "magnific_loading":"Loading image",
        "magnific_error":"Error loading image",
        "error_global":"Error data validation!",
        "name_empty":"The name can&#039;t be empty",
        "name_long":"Too long name",
        "email_empty":"Too short (or empty) email address",
        "email_long":"Too long email address",
        "email_not_valid":"Invalid email address",
        "text_empty":"The message text can&#039;t be empty",
        "text_long":"Too long message text",
        "send_complete":"Send Complete",
        "send_error":"Send Error"
    }
};

if (typeof MT_BASE_GLOBAL == 'undefined') var MT_BASE_GLOBAL = {};

/* Events data */
var tribe_js_config = {
    "permalink_settings": "\/%year%\/%monthnum%\/%day%\/%postname%\/",
    "events_post_type": "tribe_events",
    "events_base": "#"
};