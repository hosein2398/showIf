var showif = require('../showif');
var assert = require('assert');

describe('ShowIf test', function () {

    it('type of browser version should be number', function () {
        assert.equal('number', typeof +showif.BROWSER_VERSION);
    });

    it('type of browser name should be string', function () {
        assert.equal('string', typeof showif.BROWSER_NAME);
    });

    it('testing functionaly of renderRegex().version', function () {
        var element = document.createElement('div');
        element.setAttribute("class", "show-if-firefox(>56)");
        document.body.appendChild(element);
        assert.equal( +showif.renderRegex(element).version, 56);
    });

    it('testing functionaly of renderRegex().type', function () {
        var element = document.createElement('div');
        element.setAttribute("class", "show-if-firefox(>56)");
        document.body.appendChild(element);
        assert.equal( showif.renderRegex(element).type, 'greater');
    });

    it('testing functionaly of renderRegex().type', function () {
        var element = document.createElement('div');
        element.setAttribute("class", "show-if-firefox(=56)");
        document.body.appendChild(element);
        assert.equal( showif.renderRegex(element).type, 'equal');
    });

    it('testing functionaly of renderRegex().type', function () {
        var element = document.createElement('div');
        element.setAttribute("class", "show-if-firefox(<56)");
        document.body.appendChild(element);
        assert.equal( showif.renderRegex(element).type, 'lower');
    });

    it('testing functionaly of (renderRegex_for_data).type', function () {
        var element = document.createElement("div");
        element.setAttribute("data-if-chrome", "(>55) classname");
        assert.equal('string', typeof showif.renderRegex_for_data(element, 'data-if-chrome').type);
    });

    it('testing functionaly of (renderRegex_for_data).type', function () {
        var element = document.createElement("div");
        element.setAttribute("data-if-chrome", "(>55) classname");
        assert.equal('greater', showif.renderRegex_for_data(element, 'data-if-chrome').type);
    });

    it('testing functionaly of (renderRegex_for_data).type', function () {
        var element = document.createElement("div");
        element.setAttribute("data-if-chrome", "(<55) classname");
        assert.equal('lower', showif.renderRegex_for_data(element, 'data-if-chrome').type);
    });

    it('testing functionaly of (renderRegex_for_data).type', function () {
        var element = document.createElement("div");
        element.setAttribute("data-if-chrome", "(=55) classname");
        assert.equal('equal', showif.renderRegex_for_data(element, 'data-if-chrome').type);
    });

    it('testing functionaly of (renderRegex_for_data).version', function () {
        var element = document.createElement("div");
        element.setAttribute("data-if-chrome", "(>57) classname");
        assert.equal(57, showif.renderRegex_for_data(element, 'data-if-chrome').version);
    });

    it('testing functionaly of iterate_to_hide()', function () {
        var element = document.createElement("div");
        element.setAttribute("style", "display:block");
        document.body.appendChild(element);
        showif.iterate_to_hide(document.getElementsByTagName('div'));
        assert.equal('none', element.style.display);
    });

    it('testing functionaly of iterate_to_show()', function () {
        var element = document.createElement("div");
        element.setAttribute("style", "display:none");
        document.body.appendChild(element);
        showif.iterate_to_show(document.getElementsByTagName('div'));
        assert.equal('block', element.style.display);
    });

    it('testing functionaly of iterate_data_without_rule() showing the tag', function () {
        var element = document.createElement('div');
        element.setAttribute("data-if-chrome", "(>56) myclass");
        document.body.appendChild(element);
        showif.iterate_data_without_rule(document.querySelectorAll("*[data-if-chrome]") , 'data-if-chrome' , 60);
        assert.equal(' myclass', element.getAttribute('class'));
    });

    it('testing functionaly of iterate_data_without_rule() not showing the tag', function () {
        var element = document.createElement('div');
        element.setAttribute("data-if-chrome", "(<56) myclass");
        document.body.appendChild(element);
        showif.iterate_data_without_rule(document.querySelectorAll("*[data-if-chrome]") , 'data-if-chrome' , 60);
        assert.equal( null , element.getAttribute('class'));
    });

    it('testing functionaly of iterate_class_with_v() showing the tag', function () {
        var element = document.createElement('div');
        element.setAttribute("class", "show-if-chrome(>58)");
        document.body.appendChild(element);
        showif.iterate_class_with_v(document.querySelectorAll('[class^="show-if-chrome("]') , 60);
        assert.equal('block', element.style.display);
    });

    it('testing functionaly of iterate_class_with_v() not showing the tag', function () {
        var element = document.createElement('div');
        element.setAttribute("class", "show-if-chrome(<58)");
        document.body.appendChild(element);
        showif.iterate_class_with_v(document.querySelectorAll('[class^="show-if-chrome("]') , 60);
        assert.equal('none', element.style.display);
    });

    it('testing functionaly of iterate_class_with_v() not showing the tag (type 2)', function () {
        var element = document.createElement('div');
        element.setAttribute("class", "show-if-chrome(>58)");
        document.body.appendChild(element);
        showif.iterate_class_with_v(document.querySelectorAll('[class^="show-if-chrome("]') , 60);
        assert.equal('block', element.style.display);
    });


});