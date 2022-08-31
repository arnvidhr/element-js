﻿class Checklist extends Element {

	/// Private
	#_options;	// Control's options
	#_valid;	// Validity of options
	#_preservedSelection;	// if this.#_options.preserveSelection enabled

	/// Public
	items = [];	// Data items

	// false if to disable
	labels = {
		'selectAll': 'Select all',
		'selectNone': 'Select none',
		'invertSel': 'Invert selection',
	};

	get selectedItems() {
		return $.grep(this.items, function (item) {
			return item.control.prop('checked');
		});
	}

	/**
	 * CTOR
	 * @param {any} params
	 */
	constructor(params) {
		super({ 'tag': 'div', 'attrs': { 'class': 'el-checklist' } });

		this.#_options = $.extend(true, {

			// Mandatory parameters
			'valueMember': 'id',
			'nameMember': 'name',

			'onSelChange': $.noop,
			'preserveSelection': true,

			// false instead of label to disable
			'labels': this.labels,
		}, params);
		this.labels = this.#_options.labels;

		this.#_validate();
		this.#_init();
	}

	/**
	 * Check for validity of options
	 */
	#_validate() {
		this.#_valid = this.#_options.valueMember !== undefined &&
			this.#_options.nameMember !== undefined

		if (!this.#_valid) {
			console.warn('Controls.js/Checklist.#_validate(): in constructor params must be specified [valueMember] and [nameMember]!');
		}

		return this.#_valid;
	}

	/**
	 * Init
	 */
	#_init() {
		// No execution if options are invalid
		if (!this.#_valid)
			return;

		var _this = this;

		// Button bar
		this.buttonBar = this.add({
			'tag': 'div',
			'attrs': {
				'class': 'el-checklist-cmds'
			},
		});

		// Select all
		if (this.labels.selectAll) {
			this.cmdSelectAll = this.buttonBar.add({
				'tag': 'button',
				'attrs': {
					'class': 'el-checklist-cmd'
				},
				'text': this.labels.selectAll,
			});

			this.cmdSelectAll.jqThis.on('click', function () {
				_this.selectAll();
			});
		}
		// Select none
		if (this.labels.selectNone) {
			this.cmdSelectNone = this.buttonBar.add({
				'tag': 'button',
				'attrs': {
					'class': 'el-checklist-cmd'
				},
				'text': this.labels.selectNone,
			});

			this.cmdSelectNone.jqThis.on('click', function () {
				_this.selectNone();
			});
		}

		// Invert selection
		if (this.labels.invertSel) {
			this.cmdInvertSelection = this.buttonBar.add({
				'tag': 'button',
				'attrs': {
					'class': 'el-checklist-cmd'
				},
				'text': this.labels.invertSel,
			});

			this.cmdInvertSelection.jqThis.on('click', function () {
				_this.invertSelection();
			});
		}

		// Content
		this.content = this.add({
			'tag': 'div',
			'attrs': {
				'class': 'el-checklist-content',
			},
		});
	}

	/**
	 * Loading of items.
	 * Warning: Destroys previous items even in case of empty given params
	 * @param {any} data
	 */
	load(data) {

		// No execution if options are invalid
		if (!this.#_valid)
			return;

		var _this = this;

		if (this.#_options.preserveSelection) {
			this.#_preservedSelection = $.map(this.selectedItems, function (item) {
				return item[_this.#_options.valueMember];
			});
		} else {
			this.#_preservedSelection = [];
		}

		this.clear();
		if ($.isArray(data)) {
			for (const item of data) {

				// Making halful intialized ID patter, with current checklist instance no, and as well spcific option Element::instanceNo 
				// Which will be fully initialized during creation
				var idName = 'cl-opt' + this.instanceNo + 'A{instanceNo}';
				var checkbox = item.control = new Element({
					'tag': 'input',
					'attrs': {
						'type': 'checkbox',
						'id': idName,
					}
				});
				// Now taking fully initialized id, when instance number is known
				idName = checkbox.prop('id');

				// Setting change event
				checkbox.jqThis.on('change', function () {
					_this.selChange(item);
				});

				this.content.add({
					'tag': 'div',
					'attrs': {
						'class': 'el-checklist-option unseletable',
					},
					'children': [
						checkbox,
						{
							'tag': 'label',
							'attrs': {
								'for': idName
							},
							'text': item[this.#_options.nameMember],
						}
					],
				});

				this.items.push(item);
			}
		}

		if (this.#_preservedSelection.length > 0) {
			for (const item of this.items) {
				var id = item[this.#_options.valueMember];
				if (this.#_preservedSelection.includes(id)) {
					item.control.prop('checked', true);
				}
			}
		}

	}

	clear() {
		this.items = [];
		this.content.clear();
	}

	selectAll() {
		for (const item of this.items) {
			item.control.prop('checked', true);
		}
		this.selChange();
	}

	selectNone() {
		for (const item of this.items) {
			item.control.prop('checked', false);
		}
		this.selChange();
	}

	invertSelection() {
		for (const item of this.items) {
			var reverse = !item.control.prop('checked');
			item.control.prop('checked', reverse);
		}
		this.selChange();
	}

	selChange(item) {
		if ($.isFunction(this.#_options.onSelChange) &&
			this.#_options.onSelChange != $.noop) {

			this.#_options.onSelChange(item);
		}
	}
}