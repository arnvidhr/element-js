/**
 * Element.js is Web Front-End development from real OOP perspective, where we develop real OOP classes.
 * 
 * This software is opensource under Apache 2.00 licence.
 * Legitimate for non-commercial and commercial use.
 * 
 * Requires: jQuery.
 * 
 * Project URL: https://github.com/arnvidhr/element-js
 */

class Element {

	/*
	 * Every element enforced and auto generated id attribute mechanics.
	 * By default: disabled
	 */
	static ENFORCE_ID = false; // Do we need ids for every DOM element
	static DEFAULT_ID_TAG = 'E';
	static CONTROL_ID = '{control-id}';

	static DEFAULT_ELEMENT = 'div'; // In case if consturctor parameters are empty

	/*
	 * HTML self-closing elements
	 */
	static SELF_CLOSING_TAGS = [
		'area',
		'base',
		'br',
		'embed',
		'hr',
		'iframe',
		'img',
		'input',
		'link',
		'meta',
		'param',
		'source',
		'track'
	];

	/*
	 * Attributes 
	 */
	static ATTR_ID = 'id';
	static ATTR_NAME = 'name';
	static ATTR_CLASS = 'class';
	static ATTR_STYLE = 'style';
	static ATTR_VALUE = 'value';
	static ATTR_SIZE = 'size';

	static ATTR_REQUIRED = 'required';
	static ATTR_SELECTED = 'selected';
	static ATTR_DISABLED = 'disabled';
	static ATTR_CHECKED = 'checked';
	static ATTR_MULTIPLE = 'multiple';
	static ATTR_READONLY = 'readonly';

	/**
	 * Single HTML attributes need to add like this:
	 * 
	 * required: true
	 * 
	 * In case if it false, it won't be added. 
	 * This done to simplify engine's work as developer can specify condition during control's initialization. 
	 */
	static SINGLE_ATTRS = [
		Element.ATTR_REQUIRED,
		Element.ATTR_SELECTED,
		Element.ATTR_DISABLED,
		Element.ATTR_CHECKED,
		Element.ATTR_MULTIPLE,
		Element.ATTR_READONLY,
	];

	/**
	 * Private attributes
	 */
	#_params;
	#_tag;
	#_jqThis;

	/*
	 * Class properties
	 */
	// HTMl Element tag
	get tag() {
		return this.jqThis.prop("tagName");
	}
	set tag(val) {
		this.jqThis.prop("tagName", val);
	}

	get isSelfClosingTag() {
		if (this.tag !== undefined) {
			return $.inArray(this.tag.toLowerCase(), Element.SELF_CLOSING_TAGS) != -1;
		}
		return false;
	}

	get html() {
		return this.jqThis.html();
	}

	set html(val) {
		this.jqThis.html(val);
	}

	get text() {
		return this.jqThis.text();
	}
	set text(val) {
		this.jqThis.text(val);
	}

	get val() {
		return this.jqThis.val();
	}

	set val(val) {
		this.jqThis.val(val);
	}

	// Regular bounds, like CSS and so on
	get width() {
		return this.jqThis.width();
	}
	set width(val) {
		this.jqThis.width(val);
	}

	get height() {
		return this.jqThis.height();
	}
	set height(val) {
		this.jqThis.height(val);
	}

	/*
	 * jQuery representation of this HTML element
	 * Or its entry point for various use, if needed.
	 */
	get jqThis() {

		if (this.#_jqThis === undefined) {
			// Forming jQuery element creation string
			var ts = '<' + this.#_tag;
			if (this.isSelfClosingTag) {
				ts += ' />';
			} else {
				ts += '></' + this.#_tag + '>';
			}
			// jQuery element creation
			this.#_jqThis = $(ts);
		}
		return this.#_jqThis;
	}

	get className() {
		// @see https://stackoverflow.com/a/30560581
		return this.constructor.name;
	}

	/*
	 * Constructor
	 * 
	 * Accepts object with parameters. 
	 * We strongly recomend to add 'tag' attribute, which specify this element HTML tag. Elsewhere, what you developing at all? :-)
	 */
	constructor() {

		this.#_params = $.extend({
			// Html tag
			tag: Element.DEFAULT_ELEMENT,
			// Html tag attributes
			attrs: [],
			// Wanted child elements, if needed
			childs: [],
			// Parent Element class
			parent: undefined,
		}, arguments);

		this.#_init();
	}

	#_init() {
		var _this = this;

		// HTML element tag
		this.#_tag = this.#_params.tag;

		$.each(_this.#_params.attrs, function (key, value) {
			_this.attr(key, value);
		});
	}

	/*
	 * Set or get HTML element attribute
	 */
	attr(attr, value) {
		if (value === undefined)
			return this.jqThis.attr(attr);
		else
			this.jqThis.attr(attr, value);
	}

	/*
	 * Set or get HTML element property
	 */
	prop(prop, value) {
		if (value === undefined)
			return this.jqThis.prop(prop);
		else
			this.jqThis.attr(prop, value);
	}

	add() {

	}
}