var platform = require('platform');


var BROWSER_NAME = platform.name;
// var BROWSER_VERSION = platform.version;
var BROWSER_VERSION = platform.version.substr(0, 2);
console.log(platform.name);
console.log(BROWSER_VERSION)

function iterate_to_hide(browser) {
    if (browser.length > 0) {
        for (var i = 0; i < browser.length; i++) {
            browser[i].style.display = 'none';
        }
    }
}

function iterate_to_show(browser) {
    if (browser.length > 0) {
        for (var i = 0; i < browser.length; i++) {
            browser[i].style.display = 'block';
        }
    }
}

function iterate_data_without_rule(browser, atname, browser_v) {
    if (browser.length > 0) {
        var patt = /\(.*\)/g;
        for (var i = 0; i < browser.length; i++) {
            var tocheck = browser[i].getAttribute(atname);
            var newclass = browser[i].getAttribute(atname).replace(patt, "");
            var lastclass;
            if (browser[i].getAttribute("class")) {
                lastclass = browser[i].getAttribute("class");
            } else {
                lastclass = "";
            }
            if (patt.test(tocheck)) {

                var newclassdata = browser[i].getAttribute(atname).replace(patt, " ");
                var t = renderRegex_for_data(browser[i], atname);
                if (t.type === "greater" && t.version < browser_v) {
                    browser[i].setAttribute("class", lastclass + newclass);
                }
                if (t.type === "lower" && t.version > browser_v) {
                    browser[i].setAttribute("class", lastclass + newclass);
                }
                if (t.type === "equal" && t.version == browser_v) {
                    browser[i].setAttribute("class", lastclass + newclass);
                }
            } else {
                browser[i].setAttribute("class", lastclass + " " + newclass);
            }
        }
    }
}

function iterate_class_with_v(browser, browser_v) {
    if (browser.length > 0) {
        for (var i = 0; i < browser.length; i++) {
            var t = renderRegex(browser[i]);
            console.log(t.version);
            if (t.type === "greater" && t.version < browser_v) {
                browser[i].style.display = 'block';
                console.log("greater")
            } else if (t.type === "lower" && t.version > browser_v) {
                browser[i].style.display = 'block';
            } else if (t.type === "equal" && t.version == browser_v) {
                browser[i].style.display = 'block';
            } else {
                browser[i].style.display = 'none';
            }
        }
    }
}

function renderRegex(that) {
    var res = that.getAttribute("class").match(/\(.*\)/)[0];
    var length = res.length;
    var value = res.substr(2, length - 3);
    var typeraw = res.substr(1, 1);
    var type;
    switch (typeraw) {
        case ">":
            type = "greater";
            break;
        case "<":
            type = "lower";
            break;
        case "=":
            type = "equal";
            break;
    }
    return {
        version: value,
        type: type
    }

}

function renderRegex_for_data(that, attr) {
    var res = that.getAttribute(attr).match(/\(.*\)/)[0];
    var length = res.length;
    var value = res.substr(2, length - 3);
    var typeraw = res.substr(1, 1);
    var type;
    switch (typeraw) {
        case ">":
            type = "greater";
            break;
        case "<":
            type = "lower";
            break;
        case "=":
            type = "equal";
            break;
    }
    return {
        version: value,
        type: type
    }
}

/* Show if if with version in class */
var fire_fox_class_with_v = document.querySelectorAll('[class^="show-if-firefox("]');
var chrome_class_with_v = document.querySelectorAll('[class^="show-if-chrome("]');
var ie_class_with_v = document.querySelectorAll('[class^="show-if-ie("]');
var safary_class_with_v = document.querySelectorAll('[class^="show-if-safary("]');


/* typical show if */
var show_if_firefox = document.getElementsByClassName("show-if-firefox");
var show_if_chrome = document.getElementsByClassName("show-if-chrome");
var show_if_ie = document.getElementsByClassName("show-if-ie");
var show_if_safay = document.getElementsByClassName("show-if-safary");


/* typical hide if */
var hide_if_firefox = document.getElementsByClassName("hide-if-firefox");
var hide_if_chrome = document.getElementsByClassName("hide-if-chrome");
var hide_if_ie = document.getElementsByClassName("hide-if-ie");
var hide_if_safary = document.getElementsByClassName("hide-if-safary");

/* typical data change class */
var chrome_typical_data = document.querySelectorAll("*[data-if-chrome]");
var firefox_typical_data = document.querySelectorAll("*[data-if-firefox]");
var ie_typical_data = document.querySelectorAll("*[data-if-ie]");
var safary_typical_data = document.querySelectorAll("*[data-if-safary]");


/* if statments for browsers */
if (navigator.userAgent.includes("Chrome")) {
    iterate_to_show(show_if_chrome);
    iterate_data_without_rule(chrome_typical_data, "data-if-chrome", BROWSER_VERSION);
    iterate_to_hide(hide_if_chrome);
    iterate_class_with_v(chrome_class_with_v, BROWSER_VERSION);

}
if (navigator.userAgent.includes("Firefox")) {
    iterate_to_show(show_if_firefox);
    iterate_data_without_rule(firefox_typical_data, "data-if-firefox", BROWSER_VERSION);
    iterate_to_hide(hide_if_firefox);
    iterate_class_with_v(fire_fox_class_with_v, BROWSER_VERSION);
}
if (navigator.userAgent.includes("IE")) {
    iterate_to_show(show_if_ie);
    iterate_data_without_rule(ie_typical_data, "data-if-ie", BROWSER_VERSION);
    iterate_to_hide(hide_if_ie);
    iterate_class_with_v(ie_class_with_v, BROWSER_VERSION);
}
if (navigator.userAgent.includes("Safary")) {
    iterate_to_show(show_if_safary);
    iterate_data_without_rule(safary_typical_data, "data-if-safary", BROWSER_VERSION);
    iterate_to_hide(hide_if_safary);
    iterate_class_with_v(safary_class_with_v, BROWSER_VERSION);
}

module.exports = {
    BROWSER_VERSION: BROWSER_VERSION,
    BROWSER_NAME: BROWSER_NAME,
    renderRegex_for_data: renderRegex_for_data,
    iterate_to_show: iterate_to_show,
    iterate_to_hide: iterate_to_hide,
    iterate_data_without_rule: iterate_data_without_rule,
    iterate_class_with_v: iterate_class_with_v,
    renderRegex: renderRegex
}