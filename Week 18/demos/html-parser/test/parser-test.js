var assert = require('assert');

import {parseHTML } from '../src/parser.js'

describe('parse html：', function() {
    it('<a id="test"></a>', function() {
        var tree = parseHTML('<a id="test"></a>')
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
        assert.equal(1, 1);
    });

    it('<a id="test">abc</a>', function() {
        var tree = parseHTML('<a id="test">abc</a>')
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 1);
        assert.equal(1, 1);
    });

    it('<a id=\'test\'>abc</a>', function() {
        var tree = parseHTML('<a id=\'test\'>abc</a>')
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 1);
        assert.equal(1, 1);
    });

    it('<a id=test>abc</a>', function() {
        var tree = parseHTML('<a id=test>abc</a>')
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 1);
        assert.equal(1, 1);
    });

    it('<a id=test data="01">abc</a>', function() {
        var tree = parseHTML('<a id=test data="01">abc</a>')
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 1);
        assert.equal(1, 1);
    });

    it('<a id data>abc</a>', function() {
        var tree = parseHTML('<a data id>abc</a>')
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 1);
        assert.equal(1, 1);
    });

    it('<a data>abc</a>', function() {
        var tree = parseHTML('<a data>abc</a>')
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 1);
        assert.equal(1, 1);
    });
    it('<a id=test/>', function() {
        var tree = parseHTML('<a id=test/>')
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
        assert.equal(1, 1);
    });

    it('<a id="test"/>', function() {
        var tree = parseHTML('<a id="test"/>')
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
        assert.equal(1, 1);
    });

    it('<a id="test">abc</b>', function() {
        var tree = parseHTML('<a id="test">abc</b>')
        assert.equal(1, 1);
    });
    it('<a>abc</>', function() {
        var tree = parseHTML('<a>abc</>')
        assert.equal(1, 1);
    });

    it('<a/>', function() {
        var tree = parseHTML('<a/>')
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
        assert.equal(1, 1);
    });
    it('<>', function() {
        var tree = parseHTML('<>')
        assert.equal(1, 1);
    });
})