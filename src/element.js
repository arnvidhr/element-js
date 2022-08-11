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
	static DEFAULT_ID_PREFIX = 'E';
	static CONTROL_ID = '{control-id}';

	static DEFAULT_ELEMENT = 'div'; // In case if consturctor parameters are empty

	// HTML self-closing elements
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

	// HTML Attributes
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

	/// Private attributes
	#_params;	// Constructor's received raw params
	#_tag;		// This HTML element tag
	#_jqThis;	// This class jQuery representation
	#_parent;	// Element class parent
	#_jqParent;	// Parent jQuery representation

	/// Public properties
	children = [];

	// HTMl Element tag
	get tag() {
		return this.jqThis.prop("tagName");
	}
	set tag(val) {
		this.jqThis.prop("tagName", val);
	}

	get isSelfClosingTag() {
		if (this.#_tag !== undefined) {
			return $.inArray(this.#_tag.toLowerCase(), Element.SELF_CLOSING_TAGS) != -1;
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

	// Parent element class
	get parent() {
		return this.#_parent;
	}
	set parent(val) {

		if (val instanceof Element) {
			//this.#_parent = this.#_params.parent;
			//this.#_parent.jqThis.append(this.jqThis);
			this.#_parent = val;
			val.jqThis.append(this.jqThis);

		} else if (val instanceof jQuery) {
			//this.#_jqParent = this.#_params.parent;
			//this.#_jqParent.append(this.jqThis);
			this.#_jqParent = val;
			val.append(this.jqThis);
		}
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

	// jQuery level parent
	get jqParent() {
		if (this.#_parent instanceof Element) {
			return this.parent.jqThis;
		} else {
			return this.#_jqParent;
		}
	}
	set jqParent(val) {
		this.#_jqParent = val;
	}

	// Current class name (with inheritance I think, not sure)
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
			// Wanted child elements, if needed @TODO: implement
			childs: [],
			// Parent Element class
			parent: undefined,
		}, arguments[0]);

		this.#_init();
	}

	#_init() {

		// HTML element tag fist. As it is crucial.
		this.#_tag = this.#_params.tag;

		for (const paraKey in this.#_params) {
			var val = this.#_params[paraKey];

			switch (paraKey) {

				case 'tag':
					// Already initialized
					break;

				case 'attrs':
					for (const key in val) {
						this.attr(key, val[key]);
					}
					break;

				case 'text':
					this.text = val;
					break;

				case 'html':
					this.html = val;
					break;

				case 'childs':
					this.add(val);
					break;

				case 'parent':
					this.parent = val;
					break;
			}
		}
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

	/*
	 * add array|object to this Element as its child
	 * 
	 * @recursive
	 */
	add(params) {

		var element;

		// Element instance
		if (params instanceof Element) {

			// Element
			element = params;
			// Assign this instance as parent to its child
			element.parent = this;
			// Adding to children collection
			this.children.push(element);
		}
		// Object, but not Element, probably params
		else if ($.isPlainObject(params)) {

			// Element (parent from params will be overriden)
			element = new Element(params);
			// Add
			this.add(element);
		}
		// Array
		else if ($.isArray(params)) {
			// Add each element
			for (const item of params) {
				this.add(item);
			}
		}

		// retVal
		if (element !== undefined)
			return element;
	}
}